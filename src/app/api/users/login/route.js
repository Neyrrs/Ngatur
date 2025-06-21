import { cookies } from "next/headers";
import { supabase } from "../../../../configs/supabase";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, username, password, profile")
      .eq("username", username)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: "Username not found" }, { status: 401 });
    }

    const isPasswordMatch = await bcrypt.compare(password, data.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Password is incorrect" }, { status: 401 });
    }

    const tokenValue = jwt.sign(
      {
        id: data.id,
        username: data.username,
        profile: data.profile,
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    cookies().set("token", tokenValue, {
      httpOnly: true,
      maxAge: 60 * 60 * 2,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return NextResponse.json(
      {
        message: "Login success",
        data: {
          id: data.id,
          username: data.username,
          profile: data.profile,
        },
      },
      { status: 200 }
    );

  } catch (err) {
    return NextResponse.json(
      { message: "Login failed", error: err.message },
      { status: 500 }
    );
  }
}
