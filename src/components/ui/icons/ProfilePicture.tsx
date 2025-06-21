import Image from "next/image";
import React from "react";
import useUser from "@/hooks/useUsers";
import management from "@/assets/pictures/management.jpg";

const ProfilePicture = () => {
  const { user } = useUser();

  const imageUrl = user?.profile || management;
  return (
    <>
      <Image
        src={imageUrl}
        alt="preview"
        width={50}
        height={50}
        className="w-9 rounded-full h-9 object-cover"
      />
    </>
  );
};

export default ProfilePicture;
