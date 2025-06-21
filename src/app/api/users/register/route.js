import { supabase } from "../../../../configs/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([{ username: username, password: hashedPassword }]);

    if (error) {
      return NextResponse.json(
        {
          message: "Register failed, something wrong!",
          error: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Register successed, account has been save!",
        data: data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Register failed, something wrong!",
      error: error.message,
    });
  }
}
