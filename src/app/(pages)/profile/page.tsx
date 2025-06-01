"use client";

import { FormInput, PrimaryButton } from "@/components/ui";
import React, { useState, useEffect } from "react";
import useUsers from "@/hooks/useUsers";
import AuthGuard from "@/components/auth/AuthGuard";
import DynamicIconInput from "@/components/fragments/inputs/DynamicIconInput";
import { Lock, IdCard, User } from "lucide-react";

const Profile = () => {
  const { user, loading } = useUsers();
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user?.username || "");
      setId(user?.id || "");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username tidak boleh kosong.");
      return;
    }

    if (password && password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setError("");
    console.log("Data yang dikirim:", { username, password });

    setPassword("");
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
        <div className="bg-white w-fit h-95 shadow-xl/30  flex flex-row rounded-xl">
          <div className="h-full gap-3 w-fit flex-col flex items-center px-10 py-10 border-r-2 border-[#222831]">
            <div className="w-40 h-40 bg-white rounded-full border-[#222831] border-2"></div>
            <h1 className="text-xl font-semibold">{user?.username}</h1>
            <FormInput type="file" />
            <PrimaryButton height="py-1" text="Save Profile" />
          </div>
          <div className="flex flex-col gap-y-1 w-full h-full px-10 py-10">
            <h2 className="text-xl font-semibold mb-2">Your ID Card </h2>
            <form
              className="flex flex-col gap-y-2"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <label>
                User ID
                <FormInput
                  autoComplete="off"
                  name="profile-id"
                  value={id}
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
                  autoComplete="off"
                  name="profile-username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                  value={username}
                />
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
                  name="new-password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  value={password}
                  placeholder="Not changing the password? let it empty"
                />
              </label>

              <PrimaryButton text="Update" height="py-1" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Profile;
