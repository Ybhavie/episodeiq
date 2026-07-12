import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { name, pin } = await req.json();

    if (!name || !pin) {
      return NextResponse.json({ error: "Name and PIN are required" }, { status: 400 });
    }

    const { data: matches, error } = await supabaseAdmin
      .from("children")
      .select("id, name")
      .ilike("name", name.trim())
      .eq("pin", pin);

    if (error) throw error;

    if (!matches || matches.length === 0) {
      return NextResponse.json({ error: "Name or PIN is incorrect" }, { status: 401 });
    }

    return NextResponse.json({ childId: matches[0].id, name: matches[0].name });
  } catch (err) {
    console.error("POST /api/kid-login error:", err);
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
