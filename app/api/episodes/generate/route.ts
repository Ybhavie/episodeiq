import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { supabaseAdmin } from "@/lib/supabase";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Curated list of icon names the model may pick from — must match the map in
// app/learn/[childId]/episode/[episodeId]/page.tsx exactly.
const ICON_NAMES = [
  "Flame", "Mountain", "Droplets", "Leaf", "Sun", "Moon", "Star", "Cloud", "CloudRain",
  "Wind", "Snowflake", "Rainbow", "TreePine", "Sprout", "Bug", "Fish", "Bird", "PawPrint",
  "Waves", "Zap", "Magnet", "Atom", "FlaskConical", "Thermometer", "Gauge", "Orbit",
  "Rocket", "Telescope", "Microscope", "Dna", "Battery", "Lightbulb", "Heart", "Brain",
  "Bone", "Eye", "Ear", "Apple", "Calculator", "Ruler", "Scale", "Globe", "Compass",
  "Map", "Clock", "Car", "Plane", "Umbrella", "Coffee", "BookOpen", "Sparkles",
].join(", ");

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

    // Build the Groq prompt — a direct explainer, not an in-world roleplay story.
    const prompt = `You are an expert children's education content creator, writing like the best teacher a kid ever had — direct, clear, and genuinely interesting.

Create a learning episode that teaches this topic to a child:
- Child's name: ${childName}
- Topic to teach: ${topic}
- Age group: 9-12 years old

Language requirement: ${languageInstruction}

Generate a structured 3-scene episode as JSON. The episode must:
1. Teach the topic "${topic}" accurately, clearly, and directly — real facts, real explanations, no fictional story or roleplay
2. Open with a hook question that makes the child curious (e.g. "Have you ever wondered why volcanoes erupt? Here's what's really happening.") — do NOT invent a fictional character or fantasy world discovering the topic
3. Explain the actual mechanism/reason step by step in scene 2, using a simple everyday comparison a 9-12 year old already understands (kettles, balloons, sponges, traffic — not made-up magic)
4. Use simple, confident language a 10-year-old can understand — like a great textbook, not a bedtime story
5. Be engaging and precise, never vague or whimsical
6. Follow the language requirement above for every piece of text in the JSON
7. For each scene, pick the single ICON from this exact list that most concretely pictures that scene's specific content (not a generic placeholder — pick the one that actually depicts the thing being discussed): ${ICON_NAMES}

Return ONLY valid JSON in this exact format, no other text:
{
  "title": "Direct, curiosity-driven title stating or asking about the topic (e.g. 'Why Do Volcanoes Erupt?')",
  "topic": "${topic}",
  "scenes": [
    {
      "id": 1,
      "title": "Scene 1 title — the hook question",
      "visualType": "intro",
      "narration": "2-3 sentences. Ask the hook question directly. Make the child genuinely curious about the real answer.",
      "keyPoints": ["One key fact", "Another key fact"],
      "icon": "IconNameFromTheList"
    },
    {
      "id": 2,
      "title": "Scene 2 title — the explanation",
      "visualType": "explanation",
      "narration": "3-4 sentences giving the real, accurate explanation step by step, using a simple everyday comparison.",
      "keyPoints": ["Key concept 1", "Key concept 2", "Key concept 3"],
      "icon": "IconNameFromTheList"
    },
    {
      "id": 3,
      "title": "Scene 3 title — the recap",
      "visualType": "summary",
      "narration": "2-3 sentences summarising the facts learned, in plain direct language. Preview the quiz.",
      "keyPoints": ["Summary point 1", "Summary point 2", "Summary point 3"],
      "icon": "IconNameFromTheList"
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