import { cloudinary } from "../configs/cloudinary";

export async function deleteCloudinaryImageByUrl(url) {
  try {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    const publicId = `profile_pictures/${filename.split(".")[0]}`;

    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Error deleting image from Cloudinary:", err.message);
  }
}
