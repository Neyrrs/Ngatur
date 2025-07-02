import { NextResponse } from "next/server";
import { readCookieToken } from "../../../utils/readToken";
import jwt from "jsonwebtoken";

export async function GET() {
  const token = await readCookieToken();
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token || !JWT_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return NextResponse.json({
      message: "User verified",
      user: decoded,
    });
  } catch (err) {
    return NextResponse.json(
      { message: `Invalid or expired token. Error: ${err}` },
      { status: 401 }
    );
  }
}
