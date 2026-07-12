import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { supabaseAdmin } from "@/lib/supabase";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { episodeId } = await req.json();
    if (!episodeId) {
      return NextResponse.json({ error: "Missing episodeId" }, { status: 400 });
    }

    const { data: episode, error } = await supabaseAdmin
      .from("episodes")
      .select("topic, script_json")
      .eq("id", episodeId)
      .single();

    if (error || !episode) {
      return NextResponse.json({ error: "Episode not found" }, { status: 404 });
    }

    const narration = (episode.script_json?.scenes ?? [])
      .map((s: { narration: string }) => s.narration)
      .join("\n");

    const prompt = `Based on this children's lesson script about "${episode.topic}", write exactly 3 multiple-choice quiz questions for a 9-12 year old.

Lesson script:
${narration}

Return ONLY valid JSON, no other text, in this exact format:
{
  "questions": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a quiz writer for children's education content. Always respond with valid JSON only.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 800,
    });

    const rawContent = completion.choices[0]?.message?.content ?? "";
    const cleaned = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();

    let quiz;
    try {
      quiz = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse quiz JSON:", rawContent);
      return NextResponse.json({ error: "Quiz generation failed. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ questions: quiz.questions ?? [] });
  } catch (err) {
    console.error("POST /api/quiz/generate error:", err);
    return NextResponse.json({ error: "Quiz generation failed. Please try again." }, { status: 500 });
  }
}
