"use client";

import { useEffect, useState } from "react";
import useUsers from "@/hooks/useUsers";
import AuthGuard from "@/components/auth/AuthGuard";
import { successSwal, confirmSwal } from "@/utils/sweetAlert";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface userProfile {
  id: number;
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
  } = useForm<userProfile>();

  const {
    register: registerPhoto,
    handleSubmit: handleSubmitPhoto,
    watch,
  } = useForm();

  const photoFile = watch("file");

  useEffect(() => {
    if (user) {
      resetAccount({
        id: user?.id,
        username: user?.username,
        password: "",
      });
      setPreviewImage(user?.profile);
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
            className="h-full gap-3 w-fit flex-col bg-white rounded-l-md flex items-center justify-center px-10 py-10 border-r-2 border-[#222831]"
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
            <h1 className="text-xl font-semibold text-black">
              {user?.username}
            </h1>
            <Input
              type="file"
              {...registerPhoto("file")}
              placeholder="Choose file"
              className="border-primary"
            />
            <Button > Submit</Button>
          </form>

          <div className="flex flex-col gap-y-1 w-full h-full rounded-r-md px-10 py-10">
            <h2 className="text-xl font-semibold mb-2">Your ID Card</h2>
            <form
              className="flex flex-col gap-y-2 "
              onSubmit={handleSubmitAccount(submitProfile)}
              autoComplete="off"
            >
              <label>
                User ID
                <Input value={user?.id} readOnly />
              </label>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...registerAccount("username")}
                type="username"
              />
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                {...registerAccount("password")}
                placeholder="******"
                type="password"
              />

              <Button>Update</Button>
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Profile;
