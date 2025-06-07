import { cookies } from "next/headers";
import { supabase } from "../../../../libs/supabase";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password);

    const tokenValue = jwt.sign({
      id: data[0].id,
      username: data[0].username,
      password: data[0].password,
    }, JWT_SECRET, {expiresIn: "1h"})

    const token = await cookies().set("token", tokenValue, {
         maxAge: 60 * 60, 
         httpOnly: true
    })

  if (data) {
    return new Response(
      JSON.stringify({ message: "Akun ditemukan, berhasil login", token: token }),
      {
        status: 202,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
