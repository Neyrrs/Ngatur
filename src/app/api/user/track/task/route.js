import { NextResponse } from "next/server";
import { supabase } from "../../../../../configs/supabase";
import { readCookieToken } from "../../../../../utils/readToken";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  const body = await req.json();
  const { name, type, status, date, description } = body;

  const token = await readCookieToken();
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token || !JWT_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const verify = jwt.verify(token, JWT_SECRET);

  try {
    const { error } = await supabase.from("task").insert([
      {
        userId: verify?.id,
        name: name,
        type: type,
        status: status,
        date: date,
        description: description,
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

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const token = await readCookieToken();
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token || !JWT_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const verify = jwt.verify(token, JWT_SECRET);

  try {
    if (verify) {
      const baseQuery = supabase
        .from("task")
        .select("*")
        .eq("userId", verify?.id);

      if (startDate && endDate) {
        baseQuery.gte("date", startDate).lte("date", endDate);
      }

      const { data } = await baseQuery;

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
