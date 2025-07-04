import { NextResponse } from "next/server";
import { supabase } from "../../../../../../configs/supabase";
import { readCookieToken } from "../../../../../../utils/readToken";
import jwt from "jsonwebtoken";

export const GET = async () => {
  const token = await readCookieToken();
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token || !JWT_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const verify = jwt.verify(token, JWT_SECRET);

  try {
    const now = new Date();

    const pad = (n) => String(n).padStart(2, "0");

    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )}`;
    const firstDayMonth = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-01`;
    const firstDayYear = `${now.getFullYear()}-01-01`;

    if (verify) {
      const { data: daily } = await supabase
        .from("money")
        .select("*")
        .eq("userId", verify?.id)
        .eq("date", today);

      const { data: monthly } = await supabase
        .from("money")
        .select("*")
        .eq("userId", verify?.id)
        .gte("date", firstDayMonth);

      const { data: yearly } = await supabase
        .from("money")
        .select("*")
        .eq("userId", verify?.id)
        .gte("date", firstDayYear);

      return NextResponse.json(
        {
          data: {
            daily: {
              data: daily,
              count: daily.length,
            },
            monthly: {
              data: monthly,
              count: monthly.length,
            },
            yearly: {
              data: yearly,
              count: yearly.length,
            },
          },
          message: "Read success, recap showed!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Read failed, something went wrong!" },
      { status: 500 }
    );
  }
};
