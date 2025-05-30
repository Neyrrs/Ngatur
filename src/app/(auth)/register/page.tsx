"use client";

import React, { useState } from "react";
import axios from "axios";
import { Package } from "lucide-react";
import {FormInput, PrimaryButton} from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useRouter()

  const hanldeSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/user/register", {
        username: username,
        password: password,
      });

      if(response.status === 201)
      navigate.replace('/login')
    } catch (error) {
      console.error("Gagal Register:", error.response?.data || error.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#EFEFEF] flex items-center justify-center">
      <div className="bg-white w-90 h-fit justify-center shadow-xl rounded-lg items-center px-10 py-10 gap-y-1 flex flex-col">
        <Package width={45} height={45} color="#A62C2C" />
        <h1 className="text-2xl font-medium">Ngatur</h1>
        <p className="mb-3 text-xs">Sign up to your account</p>

        <form
          onSubmit={hanldeSubmit}
          className="flex flex-col w-full h-full gap-2"
        >
          <label htmlFor="username">
            Username
            <FormInput
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nama Lengkap"
              type="text"
            />
          </label>
          <label htmlFor="password" className="mb-2">
            Password
            <FormInput
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
          </label>
          <PrimaryButton width="px-2" height="py-1" text="Register" onClick={hanldeSubmit}/>
          <p className="text-xs text-center">Already have an account? <Link href={"/login"} className="underline text-[#A62C2C]">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
