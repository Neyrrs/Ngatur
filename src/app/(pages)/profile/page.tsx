"use client";

import { FormInput, PrimaryButton } from "@/components/ui";
import { useEffect, useState } from "react";
import useUsers from "@/hooks/useUsers";
import AuthGuard from "@/components/auth/AuthGuard";
import DynamicIconInput from "@/components/fragments/inputs/DynamicIconInput";
import { Lock, User } from "lucide-react";
import { successSwal, confirmSwal } from "@/utils/sweetAlert";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";

interface userProfile {
  username: string;
  password: string;
}

const Profile = () => {
  const { user, loading } = useUsers();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register: registerAccount,
    reset: resetAccount,
    handleSubmit: handleSubmitAccount,
    formState: { errors: accountErrors },
  } = useForm<userProfile>();

  const {
    register: registerPhoto,
    reset: resetPhoto,
    handleSubmit: handleSubmitPhoto,
    watch,
  } = useForm();

  const photoFile = watch("file");

  useEffect(() => {
    if (user) {
      resetAccount({
        username: user?.username,
        password: "",
      });
      setPreviewImage(user?.profile)
    }
  }, [user]);

  useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const file = photoFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [photoFile]);

  const submitProfile = async (data: userProfile) => {
    try {
      const confirm = await confirmSwal("Update your profile?");
      if (!confirm) return;

      const response = await axios.put("/api/user/updateProfile", {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) await successSwal();
    } catch (error) {
      console.error(error);
    }
  };

  const submitProfilePicture = async (data) => {
    const file = data.file?.[0]; 
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); 

    try {
      const response = await axios.put(
        "/api/user/updateProfile/profilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        await successSwal("Success", "Photo updated");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="h-screen w-screen bg-[#EFEFEF] flex items-center justify-center">
        <div className="bg-white w-fit h-95 shadow-xl/30 flex flex-row rounded-xl">
          <form
            className="h-full gap-3 w-fit flex-col flex items-center justify-center px-10 py-10 border-r-2 border-[#222831]"
            onSubmit={handleSubmitPhoto(submitProfilePicture)}
            encType="multipart/form-data"
          >
            <div className="w-40 h-40 rounded-full border-[#222831] border-2 overflow-hidden">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="preview"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <h1 className="text-xl font-semibold">{user?.username}</h1>
            <input
              type="file"
              {...registerPhoto("file")}
              className="cursor-pointer border-2 border-[#A62C2C] transition-all duration-150 focus:shadow-sm focus:shadow-[#A62C2C] hover:shadow-sm hover:shadow-[#A62C2C] font-normal w-full focus:border-[#A62C2C] outline-none bg-white rounded-md px-3 py-2 text-sm"
              placeholder={"Insert yout new profile picture"}
            />

            <PrimaryButton height="py-1" text="Save Profile" />
          </form>

          <div className="flex flex-col gap-y-1 w-full h-full px-10 py-10">
            <h2 className="text-xl font-semibold mb-2">Your ID Card</h2>
            <form
              className="flex flex-col gap-y-2"
              onSubmit={handleSubmitAccount(submitProfile)}
              autoComplete="off"
            >
              <label>
                User ID
                <FormInput
                  autoComplete="off"
                  name="profile-id"
                  value={user?.id}
                  disabled
                />
              </label>
              <label>
                Username
                <DynamicIconInput
                  icon={
                    <User
                      width={30}
                      height={30}
                      className="px-1"
                      color="#A62C2C"
                    />
                  }
                  {...registerAccount("username", {
                    required: "Username must be at least 6 characters",
                    minLength: 6,
                  })}
                />
                {accountErrors.username && (
                  <p className="text-red-500 text-xs">
                    {accountErrors.username.message}
                  </p>
                )}
              </label>

              <label className="mb-2">
                New Password
                <DynamicIconInput
                  icon={
                    <Lock
                      width={30}
                      height={30}
                      className="px-1"
                      color="#A62C2C"
                    />
                  }
                  type="password"
                  autoComplete="new-password"
                  placeholder="Not changing the password? let it empty"
                  {...registerAccount("password")}
                />
              </label>

              <PrimaryButton text="Update" height="py-1" />
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Profile;
