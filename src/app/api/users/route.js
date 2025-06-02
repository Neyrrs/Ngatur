import { supabase } from "../../../libs/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("users").select("*");

  if (error)
    return new NextResponse.json({ message: error.message }, { status: 500 });
  return new NextResponse(data);
}

export async function POST(req) {
  const { data, error } = await supabase();
  try {
    const body = await req.json();
    const { username, password } = body
      .from("users")
      .insert([{ username, password }]);

    return new NextResponse({ data: data }, { status: 201 });
  } catch {
    return new Response.json({ message: error.message }, { status: 500 });
    // return new NextResponse.json({ error: error }, { status: 500 });
  }
}
