import Image from "next/image";
import React from "react";
import { useGetUser } from "@/hooks/useUsers";
import { UserCircle } from "lucide-react";

const ProfilePicture = () => {
  const { user } = useGetUser();

  const imageUrl = user?.profile;
  return (
    <>
      {imageUrl && imageUrl !== "" ? (
        <Image
          src={imageUrl}
          alt="preview"
          width={50}
          height={50}
          className="w-9 rounded-full h-9 object-cover"
        />
      ) : (
        <UserCircle size={35} className="text-primary" />
      )}
    </>
  );
};

export default ProfilePicture;
