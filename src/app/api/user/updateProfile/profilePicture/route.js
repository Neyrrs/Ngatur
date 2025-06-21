import jwt from "jsonwebtoken";
import { readCookieToken } from "@/utils/readToken";
import { supabase } from "../../../../../configs/supabase";
import { cloudinary } from "../../../../../configs/cloudinary";
import { NextResponse } from "next/server";
import { deleteCloudinaryImageByUrl } from "../../../../../utils/destroyCloudinary";

export async function PUT(req) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    const token = await readCookieToken();
    const verify = jwt.verify(token, JWT_SECRET);

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json(
        { message: "No file uploaded." },
        { status: 400 }
      );
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("profile")
      .eq("id", verify.id)
      .single();

    if (userError) {
      return NextResponse.json(
        { message: "User not found", error: userError.message },
        { status: 404 }
      );
    }

    await deleteCloudinaryImageByUrl(userData?.profile);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "profile_pictures" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    const cloudinaryUrl = uploadResult.secure_url;

    const { data, error } = await supabase
      .from("users")
      .update({ profile: cloudinaryUrl })
      .eq("id", verify.id);

    if (error) {
      return NextResponse.json(
        { message: "Failed to update user profile", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Profile picture updated successfully",
        profileUrl: cloudinaryUrl,
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unexpected error", error: error.message },
      { status: 500 }
    );
  }
}
