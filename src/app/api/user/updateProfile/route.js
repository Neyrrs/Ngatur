import { supabase } from "../../../../configs/supabase";
import { NextResponse } from "next/server";
import { readCookieToken } from "../../../../utils/readToken";
import jwt from "jsonwebtoken";

export async function PUT(req) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = await readCookieToken();

  const body = await req.json();
  let { username, password } = body;

  const updateData = {
    username,
  };

  if (password.trim() !== "") {
    updateData.passwrd = password;
  }

  try {
    const verify = jwt.verify(token, JWT_SECRET);

    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", verify?.id);

    if (error) {
      return NextResponse.json(
        { message: "Failed to update user data", error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: `Update profile success! user verified`,
        userId: verify,
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Update profile failed! Invalid or expired token.`,
        error: error.message,
      },
      { status: 401 }
    );
  }
}
