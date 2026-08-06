import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { supabaseAdmin } from "@/lib/supabase";
import { generateSceneImage } from "@/lib/gemini";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface Scene {
  id: number;
  title: string;
  visualType: string;
  narration: string;
  keyPoints: string[];
  imageUrl?: string | null;
}

function buildImagePrompt(scene: Scene, world: string, characterName: string) {
  return `Flat-vector cartoon illustration for a children's educational app, ages 9-12. No text, letters, numbers, or words anywhere in the image — picture only.
Style: bright cheerful colors, simple rounded shapes, friendly storybook illustration.
Setting: ${world}.
Main character: ${characterName}.
Depict this moment: ${scene.narration}`;
}

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

    const languageInstruction =
      !language || language === "English"
        ? "Write the entire episode in simple, clear English."
        : `Write the entire episode — the title, every scene title, every narration, and every key point — in ${language}, using the native ${language} script (not English, and not transliterated). Keep the vocabulary simple enough for a fluent 9-12 year old ${language} speaker to understand. Only proper nouns without a natural ${language} equivalent may stay in English.`;

    // Build the Groq prompt
    const prompt = `You are an expert children's education content creator.

Create a personalised learning episode for a child with these details:
- Child's name: ${childName}
- Their character: ${characterName}
- Story world: ${world}
- Topic to teach: ${topic}
- Age group: 9-12 years old

Language requirement: ${languageInstruction}

Generate a structured 3-scene episode as JSON. The episode must:
1. Be set entirely in the ${world} universe
2. Feature ${characterName} as the main character
3. Teach the topic "${topic}" accurately and clearly
4. Use simple language a 10-year-old can understand
5. Be engaging, fun, and educational
6. Follow the language requirement above for every piece of text in the JSON

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

    // Generate one illustration per scene with Gemini, in parallel
    const scenes: Scene[] = scriptJson.scenes ?? [];
    const imageUrls = await Promise.all(
      scenes.map((scene) => generateSceneImage(buildImagePrompt(scene, world, characterName)))
    );
    scriptJson.scenes = scenes.map((scene, i) => ({ ...scene, imageUrl: imageUrls[i] }));
    scriptJson.language = language ?? "English";

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