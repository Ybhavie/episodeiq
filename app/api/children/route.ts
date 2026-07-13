import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

async function getOrCreateUser(clerkId: string) {
  const { data: existing, error: existingError } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();

  if (existingError) throw existingError;
  if (existing) return existing;

  const { data: newUser, error: newUserError } = await supabaseAdmin
    .from("users")
    .insert({ clerk_id: clerkId })
    .select()
    .single();

  if (newUserError) throw newUserError;
  return newUser;
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getOrCreateUser(userId);

    const { data: children, error } = await supabaseAdmin
      .from("children")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ children: children ?? [] });
  } catch (err) {
    console.error("GET /api/children error:", err);
    const detail = err instanceof Error ? err.message : JSON.stringify(err);
    return NextResponse.json({ error: `Failed to fetch children: ${detail}` }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getOrCreateUser(userId);
    const body = await req.json();

    const { name, age, grade, world, character_name, language, subjects, board } = body;
    if (!name || !age || !grade || !world || !character_name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { count, error: countError } = await supabaseAdmin
      .from("children")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (countError) throw countError;
    if ((count ?? 0) >= 3) {
      return NextResponse.json({ error: "Maximum 3 children allowed" }, { status: 403 });
    }

    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    const { data: child, error } = await supabaseAdmin
      .from("children")
      .insert({
        user_id: user.id,
        name,
        age: parseInt(age, 10),
        grade,
        world,
        character_name,
        language: language ?? "English",
        subjects: subjects ?? [],
        board: board ?? "NCERT",
        pin,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ child });
  } catch (err) {
    console.error("POST /api/children error:", err);
    const detail = err instanceof Error ? err.message : JSON.stringify(err);
    return NextResponse.json({ error: `Failed to create child: ${detail}` }, { status: 500 });
  }
}
