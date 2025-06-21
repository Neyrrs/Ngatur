"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { Lock, Package, User } from "lucide-react";
import { PrimaryButton } from "@/components/ui";
import Link from "next/link";
import DynamicIconInput from "@/components/fragments/inputs/DynamicIconInput";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

interface loginData {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<loginData>();

  const onSubmit = async (data: loginData) => {
    try {
      const response = await axios.post("/api/users/login", {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: `Welcome ${data.username}`,
        }).then(() => {
          window.location.href = "/";
        });
      }

      if (response.status === 500) {
        throw new Error("Login Failed: Account not found");
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        icon: "error",
        text: "Incorrect username or password",
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="h-screen w-screen bg-[#EFEFEF] flex items-center justify-center">
      <div className="bg-white w-90 h-fit justify-center shadow-xl rounded-lg items-center px-10 py-10 gap-y-1 flex flex-col">
        <Package width={45} height={45} color="#A62C2C" />
        <h1 className="text-2xl font-medium">Ngatur</h1>
        <p className="mb-3 text-xs">Sign in to your account</p>

        <form
          className="flex flex-col w-full h-full gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="username">
            Username
            <DynamicIconInput
              icon={
                <User width={30} height={30} className="px-1" color="#A62C2C" />
              }
              {...register("username", {
                required: "Username must be at least 6 characters",
                minLength: 6,
              })}
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
              placeholder="Password"
              {...register("password", {
                required: "Username must be at least 6 characters",
                minLength: 6,
              })}
              type="password"
            />
          </label>
          <PrimaryButton
            width="px-2"
            height="py-1"
            text="Login"
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
