import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logout berhasil"}, {status: 200});

  const cookie = await cookies()
  cookie.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
