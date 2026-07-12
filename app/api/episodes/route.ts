import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const childId = req.nextUrl.searchParams.get("childId");
    if (!childId) {
      return NextResponse.json({ error: "Missing childId" }, { status: 400 });
    }

    const { data: episodes, error } = await supabaseAdmin
      .from("episodes")
      .select("id, topic, script_json, created_at")
      .eq("child_id", childId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const episodeIds = (episodes ?? []).map((e) => e.id);

    const { data: quizResults, error: quizError } = episodeIds.length
      ? await supabaseAdmin
          .from("quiz_results")
          .select("episode_id, score, completed_at")
          .in("episode_id", episodeIds)
          .order("completed_at", { ascending: false })
      : { data: [], error: null };

    if (quizError) throw quizError;

    const latestResultByEpisode = new Map<string, { score: number }>();
    for (const result of quizResults ?? []) {
      if (!latestResultByEpisode.has(result.episode_id)) {
        latestResultByEpisode.set(result.episode_id, { score: result.score });
      }
    }

    const merged = (episodes ?? []).map((ep) => {
      const result = latestResultByEpisode.get(ep.id);
      return {
        id: ep.id,
        topic: ep.topic,
        title: ep.script_json?.title ?? ep.topic,
        completed: !!result,
        score: result?.score ?? null,
        xpEarned: result ? result.score * 20 : 0,
      };
    });

    return NextResponse.json({ episodes: merged });
  } catch (err) {
    console.error("GET /api/episodes error:", err);
    return NextResponse.json({ error: "Failed to fetch episodes" }, { status: 500 });
  }
}
