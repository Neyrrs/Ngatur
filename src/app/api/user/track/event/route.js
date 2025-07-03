import { NextResponse } from "next/server";
import { supabase } from "../../../../../configs/supabase";
import { readCookieToken } from "../../../../../utils/readToken";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  const body = await req.json();
  const { name, type, location, date } = body;

  // const token = await readCookieToken();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJFendhbklibnUiLCJwcm9maWxlIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGh2bm55MnYyL2ltYWdlL3VwbG9hZC92MTc1MDUwNDQ3MC9wcm9maWxlX3BpY3R1cmVzL2E1eHBkZmZjZWJ5cGhxa3B6aG15LmpwZyIsImlhdCI6MTc1MTQ5ODcyMywiZXhwIjoxNzUxNTg1MTIzfQ.TM-xyKHBgMG9cNHzJz8y7qHxWrik8ksSTIMvPYvuBLg";
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token || !JWT_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const verify = jwt.verify(token, JWT_SECRET);

  try {
    const { error } = await supabase.from("event").insert([
      {
        userId: verify?.id,
        name: name,
        type: type,
        location: location,
        date: date,
      },
    ]);

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          message: "Insert failed, something went wrong!",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Insert success, recap inserted!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Insert failed, something went wrong!" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  const token = await readCookieToken();
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token || !JWT_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const verify = jwt.verify(token, JWT_SECRET);

  try {
    if (verify) {
      const { data } = await supabase
        .from("event")
        .select("*")
        .eq("userId", verify?.id);
      // .gte("date", `2025-06-01`)
      // .lte("date", `2025-06-30`);

      return NextResponse.json(
        { data: data, message: "Insert success, recap inserted!" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Insert failed, something went wrong!" },
      { status: 500 }
    );
  }
};
