import { pool } from "../../../../libs/postgreSql";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const data = await req.json();
    const con = await pool.connect();

    if (!con) return;

    const searchAccount = await con.query(
      `select * from users where username = $1 and password = $2`,
      [data?.username, data?.password]
    );

    if (searchAccount.rows.length == 0) {
      throw new Error("Akun tidak ditemukan");
    }

    const jwtSecret = process.env.JWT_SECRET;
    const user = {
      id: searchAccount.rows[0].id,
      username: searchAccount.rows[0].username,
    };
    const token = jwt.sign(user, jwtSecret, {
      expiresIn: "1h",
    });

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });

    con.release();

    return new Response(JSON.stringify({ message: "Berhasil login" }), {
      status: 202,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
  }
}
