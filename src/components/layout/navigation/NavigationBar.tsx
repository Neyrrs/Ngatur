"use client";

import React from "react";
import { LogOutIcon, Package } from "lucide-react";
import Link from "next/link";
import useUsers from "@/hooks/useUsers";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const NavigationBar = () => {
  const { user, loading } = useUsers();
  const navigate = useRouter();

  if (loading) return <div>Loading</div>;

  const hanldeLogout = async () => {
    Swal.fire({
      icon: "question",
      title: "You sure want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.get("api/user/logout");
          if (res.status === 200) console.log("logout berhasil");
          navigate.replace("/login");
        } catch (error) {
          console.error("Eror: ", error);
        }
      }
    });
  };
  return (
    <div className="fixed top-0 w-screen">
      <div className="flex bg-[#222831] text-white w-full h-15 items-center px-15 justify-between">
        <Link href={"/"} className="flex gap-2 items-center">
          <Package width={30} height={30} color="#A62C2C" />
          <p className="text-2xl font-medium">Ngatur</p>
        </Link>
        <div className="flex gap-5 items-center">
          <Link href={"/profile"} className="flex gap-5 items-center">
            <p className="text-lg font-medium">{user?.username} </p>
            <div className="h-8 w-8 bg-white rounded-full"></div>
          </Link>
          <LogOutIcon className="cursor-pointer" onClick={hanldeLogout} />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
