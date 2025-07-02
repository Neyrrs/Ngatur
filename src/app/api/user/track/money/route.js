import { NextResponse } from "next/server";
import { supabase } from "../../../../../configs/supabase";
import { readCookieToken } from "../../../../../utils/readToken";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  const body = await req.json();
  const { amount, status, date } = body();

  const token = await readCookieToken();
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token || !JWT_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const verify = jwt.verify(token, JWT_SECRET);

  try {
    const { data, error } = await supabase.from("money").insert([
      {
        userId: verify?.id,
        amount: amount,
        status: status,
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
      { data: data.data, message: "Insert success, recap inserted!" },
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
  //   const body = await req.json();
  //   const { year, month } = body();

  //   const token = await readCookieToken();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJFendhbklibnUiLCJwcm9maWxlIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGh2bm55MnYyL2ltYWdlL3VwbG9hZC92MTc1MDUwNDQ3MC9wcm9maWxlX3BpY3R1cmVzL2E1eHBkZmZjZWJ5cGhxa3B6aG15LmpwZyIsImlhdCI6MTc1MTQ2ODU0MiwiZXhwIjoxNzUxNTU0OTQyfQ.0qac_nNTO2T51ygFyhCpTIpiEYDQ2l6zz-Ll1M-1uok";
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token || !JWT_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const verify = jwt.verify(token, JWT_SECRET);

  try {
    if (verify) {
      const { data } = await supabase
        .from("money")
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
