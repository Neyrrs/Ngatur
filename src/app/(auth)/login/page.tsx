"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import management from "@/assets/pictures/management2.jpg";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { successToast } from "@/utils/toast";
import { useRouter } from "next/navigation";

interface loginData {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<loginData>();
  const navigate = useRouter();

  const onSubmit = async (data: loginData) => {
    try {
      const response = await axios.post("/api/users/login", {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        successToast({ title: "Sign in success!" });
      }

      if (response.status === 500) {
        throw new Error("Sign in Failed: Account not found");
      }
      setTimeout(() => {
        navigate.replace("/");
      }, 1500);
    } catch {
      successToast({ title: "Sign in failed!" });
    }
  };

  return (
    <div className="h-screen w-screen bg-background flex items-center justify-center">
      <div className="bg-secondary w-90 md:w-fit h-90 justify-center shadow-xl flex rounded-lg gap-y-1">
        <div className="flex w-full md:w-90 h-full flex-col justify-center px-10 gap-5 py-10">
          <h1 className="text-2xl md:text-3xl font-medium">Login</h1>
          <form
            className="flex flex-col w-full h-full gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label htmlFor="username" className="text-sm md:text-base">
              Username
            </Label>
            <Input
              {...register("username")}
              id="username"
              placeholder="John Doe"
              className="text-sm md:text-base"
              required
            />
            <Label htmlFor="password" className="text-sm md:text-base">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="******"
              {...register("password")}
              className="text-sm md:text-base"
              required
            />
            <Button variant={"default"} className="text-sm md:text-base">
              Login
            </Button>
            <p className="text-xs md:text-sm text-center">
              Don’t have an account?{" "}
              <Link href={"/register"} className="underline text-primary">
                Sign up
              </Link>
            </p>
          </form>
        </div>
        <div className="h-full w-fit rounded-lg md:block hidden">
          <Image
            src={management}
            alt="loginImage"
            width={300}
            className="h-full object-cover object-center rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
