"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import management from "@/assets/pictures/management.jpg";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

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
    } catch {
      Swal.fire({
        title: "Login Failed",
        icon: "error",
        text: "Incorrect username or password",
      });
    }
  };

  return (
    <div className="h-screen w-screen bg-background flex items-center justify-center">
      <div className="bg-secondary w-fit h-90 justify-center shadow-xl flex rounded-lg gap-y-1">
        <div className="flex w-90 h-full flex-col justify-center px-10 gap-5 py-10">
          <h1 className="text-3xl font-medium">Login</h1>
          <form
            className="flex flex-col w-full h-full gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label htmlFor="username">Username</Label>
            <Input {...register("username")} id="username" placeholder="John Doe" required />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              {...register("password")}
              placeholder="******"
              required
            />
            <Button variant={"default"}> Login</Button>
            <p className="text-xs text-center">
              Don`t have an account?{" "}
              <Link href={"/register"} className="underline text-primary">
                Sign up
              </Link>
            </p>
          </form>
        </div>
        <div className="h-full w-fit rounded-lg">
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
