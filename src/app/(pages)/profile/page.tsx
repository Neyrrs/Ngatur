"use client";

import { useEffect, useState } from "react";
import { useGetUser } from "@/hooks/useUsers";
import AuthGuard from "@/components/auth/AuthGuard";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IUpdateProfile, IUpdateProfilePicture } from "@/types/userType";
import { confirmDialog } from "@/components/ui/alert";
import { successToast } from "@/utils/toast";

const Profile = () => {
  const { user, loading, refetch } = useGetUser();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register: registerAccount,
    reset: resetAccount,
    handleSubmit: handleSubmitAccount,
  } = useForm<IUpdateProfile>();

  const {
    register: registerPhoto,
    handleSubmit: handleSubmitPhoto,
    watch,
  } = useForm<IUpdateProfilePicture>();

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

  const submitProfile = async (data: IUpdateProfile) => {
    try {
      const result = await confirmDialog(
        "Delete Item?",
        "This action cannot be undone!"
      );

      if (result) {
        const response = await axios.put("/api/user/updateProfile", {
          username: data.username,
          password: data.password,
        });

        if (response.status === 200) successToast({ title: "Profile updated" });
      }
    } catch {
      successToast({ title: "Fail to updated" });
    } finally {
      refetch();
    }
  };

  const submitProfilePicture = async (data: IUpdateProfilePicture) => {
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
        successToast({ title: "Profile updated" });
      }
    } catch {
      successToast({ title: "Failed to updated" });
    } finally {
      refetch();
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background text-foreground">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="h-screen w-screen bg-background text-foreground flex items-center justify-center md:px-0 px-5">
        <div className="bg-secondary text-foreground w-fit h-95 shadow-xl/30 flex flex-row rounded-xl border border-border">
          <form
            className="h-full gap-3 w-fit flex-col bg-primary text-primary-foreground rounded-l-md flex items-center justify-center px-5 md:px-10 py-10 border-r border-border"
            onSubmit={handleSubmitPhoto(submitProfilePicture)}
            encType="multipart/form-data"
          >
            <div className="w-35 h-35 md:w-40 md:h-40 rounded-full border border-secondary overflow-hidden">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="preview"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-primary-foreground">
                  No Image
                </div>
              )}
            </div>
            <h1 className="text-xl font-semibold">{user?.username}</h1>
            <Input
              type="file"
              {...registerPhoto("file")}
              placeholder="Choose file"
              className="text-primary-foreground border-border file:text-foreground"
            />
            <Button variant={"secondary"}>Submit</Button>
          </form>

          <div className="flex flex-col gap-y-2 w-full h-full rounded-r-md px-5 md:px-10 py-10 bg-background text-foreground">
            <h2 className="text-xl font-semibold mb-2">Your ID Card</h2>
            <form
              className="flex flex-col gap-y-2"
              onSubmit={handleSubmitAccount(submitProfile)}
              autoComplete="off"
            >
              <Label htmlFor="id">ID</Label>
              <Input value={user?.id} readOnly className="text-foreground" />

              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...registerAccount("username")}
                type="text"
              />

              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                {...registerAccount("password")}
                placeholder="******"
                type="password"
              />

              <Button variant={"default"}>Update</Button>
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Profile;
