import { pool } from "../../../../libs/postgreSql";

export async function POST(req) {
  try {
    const data = await req.json();
    const con = await pool.connect();

    if (!con) return;

    con.query(`Insert into users (username, password) values($1, $2)`, [
      data.username,
      data.password
    ]);
    con.release();
    console.log("berhasil!")

    return new Response(JSON.stringify({ message: "Data berhasil disimpan" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Request error: ", error);
  } finally {
  }
}


