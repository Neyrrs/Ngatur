import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, secret);

    return NextResponse.json({
      message: "User verified",
      user: decoded, 
    });

  } catch (err) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}
