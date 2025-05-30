// // app/api/user/user/route.ts
// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// export async function GET() {
//   const cookieStore = cookies();
//   const token = cookieStore.get("token")?.value;

//   const secret = process.env.JWT_SECRET;

//   if (!token || !secret) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // Verifikasi token dan ambil payload-nya
//     const decoded = jwt.verify(token, secret);

//     // Kirim data dari payload token ke frontend
//     return NextResponse.json({
//       message: "User verified",
//       user: decoded, // Ini bisa berupa { id, name, email, dll tergantung isi token saat dibuat
//     });

//   } catch (err) {
//     return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
//   }
// }
