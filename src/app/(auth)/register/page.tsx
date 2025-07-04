"use client";

import axios from "axios";
import Link from "next/link";
import management from "@/assets/pictures/management2.jpg";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { successToast } from "@/utils/toast";
import { confirmDialog } from "@/components/ui/alert";

interface registerData {
  username: string;
  password: string;
}

const Register = () => {
  const navigate = useRouter();
  const { register, handleSubmit } = useForm<registerData>();

  const onSubmit = async (data: registerData) => {
    const result = await confirmDialog(
      "Sign up account?",
      "This action cannot be undone!"
    );

    if (result) {
      try {
        const response = await axios.post("api/users/register", {
          username: data.username,
          password: data.password,
        });

        if (response.status === 201) {
          successToast({ title: "Sign up success!" });
          navigate.replace("/login");
        }
      } catch (error) {
        if (error instanceof Error) {
          successToast({ title: "Failed to sign up!" });
        }
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-background flex items-center justify-center">
      <div className="bg-secondary w-fit h-90 justify-center shadow-xl flex flex-row-reverse rounded-lg gap-y-1">
        <div className="flex w-90 h-full flex-col justify-center px-10 gap-5 py-10">
          <h1 className="text-3xl font-medium">Register</h1>
          <form
            className="flex flex-col w-full h-full gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label htmlFor="username">Username</Label>
            <Input {...register("username")} placeholder="John Doe" />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              {...register("password")}
              placeholder="******"
              required
            />
            <Button variant={"default"}>Register</Button>
            <p className="text-xs text-center">
              Already have an account?{" "}
              <Link href={"/login"} className="underline text-primary">
                Sign in
              </Link>
            </p>
          </form>
        </div>
        <div className="h-full w-fit rounded-lg">
          <Image
            src={management}
            alt="loginImage"
            width={300}
            className="h-full object-cover object-center rounded-l-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
