import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Public — used by kid-facing pages, which authenticate via PIN, not Clerk.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: child, error } = await supabaseAdmin
      .from("children")
      .select("id, name, age, grade, world, character_name, language, subjects, xp, streak, board")
      .eq("id", id)
      .single();

    if (error || !child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    return NextResponse.json({ child });
  } catch (err) {
    console.error("GET /api/children/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch child" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const { data: user } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("clerk_id", userId)
      .single();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { data: child } = await supabaseAdmin
      .from("children")
      .select("id, user_id")
      .eq("id", id)
      .single();

    if (!child || child.user_id !== user.id) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const { error } = await supabaseAdmin
      .from("children")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/children/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}