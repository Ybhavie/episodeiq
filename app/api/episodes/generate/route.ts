import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { supabaseAdmin } from "@/lib/supabase";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { topic, childId, world, characterName, language, childName } =
      await req.json();

    if (!topic || !childId || !world || !characterName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build the Groq prompt
    const prompt = `You are an expert children's education content creator.

Create a personalised learning episode for a child with these details:
- Child's name: ${childName}
- Their character: ${characterName}
- Story world: ${world}
- Topic to teach: ${topic}
- Language style: ${language} (write in simple English but reference ${language} cultural context if relevant)
- Age group: 9-12 years old

Generate a structured 3-scene episode as JSON. The episode must:
1. Be set entirely in the ${world} universe
2. Feature ${characterName} as the main character
3. Teach the topic "${topic}" accurately and clearly
4. Use simple language a 10-year-old can understand
5. Be engaging, fun, and educational

Return ONLY valid JSON in this exact format, no other text:
{
  "title": "Episode title (creative, world-themed)",
  "topic": "${topic}",
  "scenes": [
    {
      "id": 1,
      "title": "Scene 1 title",
      "visualType": "intro",
      "narration": "2-3 sentences of narration. ${characterName} discovers the problem/question in the ${world} setting. Make it exciting and hook the child.",
      "keyPoints": ["One key fact", "Another key fact"]
    },
    {
      "id": 2,
      "title": "Scene 2 title",
      "visualType": "explanation",
      "narration": "3-4 sentences explaining the main concept clearly. Use an analogy from the ${world} world. Break it down simply.",
      "keyPoints": ["Key concept 1", "Key concept 2", "Key concept 3"]
    },
    {
      "id": 3,
      "title": "Scene 3 title",
      "visualType": "summary",
      "narration": "2-3 sentences summarising what was learned. ${characterName} celebrates understanding. Preview the quiz.",
      "keyPoints": ["Summary point 1", "Summary point 2", "Summary point 3"]
    }
  ]
}`;

    // Call Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an expert children's education content creator. Always respond with valid JSON only. No markdown, no explanation, just the JSON object.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const rawContent = completion.choices[0]?.message?.content ?? "";

    // Parse JSON safely
    let scriptJson;
    try {
      const cleaned = rawContent
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      scriptJson = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse Groq response:", rawContent);
      return NextResponse.json(
        { error: "AI response parsing failed. Please try again." },
        { status: 500 }
      );
    }

    // Save episode to Supabase
    const { data: episode, error: dbError } = await supabaseAdmin
      .from("episodes")
      .insert({
        child_id: childId,
        topic,
        script_json: scriptJson,
        video_url: null,
        duration: 240,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to save episode" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      episode: {
        id: episode.id,
        title: scriptJson.title,
        topic: scriptJson.topic,
        scenes: scriptJson.scenes,
      },
    });
  } catch (err) {
    console.error("Episode generation error:", err);
    return NextResponse.json(
      { error: "Episode generation failed. Please try again." },
      { status: 500 }
    );
  }
}