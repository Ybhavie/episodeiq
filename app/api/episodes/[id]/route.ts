import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: episode, error } = await supabaseAdmin
      .from("episodes")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !episode) {
      return NextResponse.json({ error: "Episode not found" }, { status: 404 });
    }

    return NextResponse.json({
      episode: {
        id: episode.id,
        childId: episode.child_id,
        topic: episode.topic,
        title: episode.script_json?.title ?? episode.topic,
        scenes: episode.script_json?.scenes ?? [],
        duration: episode.duration,
      },
    });
  } catch (err) {
    console.error("GET /api/episodes/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch episode" }, { status: 500 });
  }
}
