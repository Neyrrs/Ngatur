"use client";

import React, { useState } from "react";
import axios from "axios";
import { Lock, Package, User } from "lucide-react";
import { PrimaryButton } from "@/components/ui";
import Link from "next/link";
import DynamicIconInput from "@/components/fragments/inputs/DynamicIconInput";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/login", {
        username: username,
        password: password,
      });

      if (response.status === 202) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Gagal login:", error.response?.data || error.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#EFEFEF] flex items-center justify-center">
      <div className="bg-white w-90 h-fit justify-center shadow-xl rounded-lg items-center px-10 py-10 gap-y-1 flex flex-col">
        <Package width={45} height={45} color="#A62C2C" />
        <h1 className="text-2xl font-medium">Ngatur</h1>
        <p className="mb-3 text-xs">Sign in to your account</p>

        <form
          className="flex flex-col w-full h-full gap-2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">
            Username
            <DynamicIconInput
              icon={
                <User width={30} height={30} className="px-1" color="#A62C2C" />
              }
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              type="text"
            />
          </label>
          <label htmlFor="password" className="mb-2">
            Password
            <DynamicIconInput
              icon={
                <Lock width={30} height={30} className="px-1" color="#A62C2C" />
              }
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              value={password}
              type="password"
            />
          </label>
          <PrimaryButton
            width="px-2"
            height="py-1"
            text="Login"
            onClick={handleSubmit}
          />
          <p className="text-xs text-center">
            Don`t have an account?{" "}
            <Link href={"/register"} className="underline text-[#A62C2C]">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
