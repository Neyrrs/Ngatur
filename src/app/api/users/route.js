import { pool } from "../../../libs/postgreSql";

export async function GET() {
  try {
    const con = await pool.connect();
    const resultQuery = await con.query("select id, username from users");

    con.release();
    if (resultQuery < 0) return new Error("Gagal mengambil data akun");

    return new Response(
      JSON.stringify({message: "Data berhasil diambil!", data: resultQuery.rows}),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({message: `Gagal mengambil data: ${error}`}), {
        status: 500
    })
  }
}
