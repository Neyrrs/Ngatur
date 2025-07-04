import { NextResponse } from "next/server";
import { supabase } from "../../../../../../configs/supabase";
import { readCookieToken } from "../../../../../../utils/readToken";
import jwt from "jsonwebtoken";

export const DELETE = async (req, { params }) => {
  const id = params.id;
  const token = await readCookieToken();
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token || !JWT_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const verify = jwt.verify(token, JWT_SECRET);

  try {
    if (verify) {
      const { error } = await supabase.from("event").delete().eq("id", id);

      if (error) {
        return NextResponse.json(
          {
            error: error.message,
            message: "Delete failed, something went wrong!",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "Delete success, recap Deleted!" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Delete failed, something went wrong!" },
      { status: 500 }
    );
  }
};
