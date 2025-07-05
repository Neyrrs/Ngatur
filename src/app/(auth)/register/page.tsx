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
      <div className="bg-secondary w-90 md:w-fit h-90 justify-center shadow-xl flex rounded-lg gap-y-1">
        <div className="flex w-full md:w-90 h-full flex-col justify-center px-10 gap-5 py-10">
          <h1 className="text-2xl md:text-3xl font-medium">Register</h1>
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
              {...register("password")}
              placeholder="******"
              className="text-sm md:text-base"
              required
            />

            <Button variant={"default"} className="text-sm md:text-base">
              Register
            </Button>

            <p className="text-xs md:text-sm text-center">
              Already have an account?{" "}
              <Link href={"/login"} className="underline text-primary">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* Image */}
        <div className="h-full w-fit rounded-lg md:block hidden">
          <Image
            src={management}
            alt="registerImage"
            width={300}
            className="h-full object-cover object-center rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
