import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { episodeId, childId, answers, score, total } = await req.json();

    if (!episodeId || !childId || !Array.isArray(answers) || typeof score !== "number") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error: quizError } = await supabaseAdmin.from("quiz_results").insert({
      episode_id: episodeId,
      child_id: childId,
      score,
      answers_json: answers,
    });

    if (quizError) throw quizError;

    const xpEarned = score * 20;

    const { data: child, error: childFetchError } = await supabaseAdmin
      .from("children")
      .select("xp")
      .eq("id", childId)
      .single();

    if (childFetchError) throw childFetchError;

    const { data: updatedChild, error: xpError } = await supabaseAdmin
      .from("children")
      .update({ xp: (child?.xp ?? 0) + xpEarned })
      .eq("id", childId)
      .select("xp")
      .single();

    if (xpError) throw xpError;

    return NextResponse.json({
      xpEarned,
      totalXp: updatedChild.xp,
      score,
      total,
    });
  } catch (err) {
    console.error("POST /api/quiz/submit error:", err);
    return NextResponse.json({ error: "Failed to submit quiz" }, { status: 500 });
  }
}
