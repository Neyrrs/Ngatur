"use client";

import axios from "axios";
import { Lock, Package, User } from "lucide-react";
import { PrimaryButton } from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import DynamicIconInput from "@/components/fragments/inputs/DynamicIconInput";
import { successSwal, errorSwal } from "@/utils/sweetAlert";

interface registerData {
  username: string;
  password: string;
}

const Register = () => {
  const navigate = useRouter();
  const { register, handleSubmit } = useForm<registerData>();

  const onSubmit = async (data: registerData) => {
    try {
      const response = await axios.post("api/users/register", {
        username: data.username,
        password: data.password,
      });

      if (response.status === 201) {
        await successSwal("Register success!", "Redirecting to Login...");
        navigate.replace("/login");
      }
    } catch (error) {
      console.log("Error", error);
      errorSwal("Register Failed", error);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#EFEFEF] flex items-center justify-center">
      <div className="bg-white w-90 h-fit justify-center shadow-xl rounded-lg items-center px-10 py-10 gap-y-1 flex flex-col">
        <Package width={45} height={45} color="#A62C2C" />
        <h1 className="text-2xl font-medium">Ngatur</h1>
        <p className="mb-3 text-xs">Sign up to your account</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full h-full gap-2"
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
              {...register("password", {
                required: "Password must be at least 6 characters",
                minLength: 6,
              })}
              placeholder="Password"
              type="password"
            />
          </label>
          <PrimaryButton width="px-2" height="py-1" text="Register" />
          <p className="text-xs text-center">
            Already have an account?{" "}
            <Link href={"/login"} className="underline text-[#A62C2C]">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
