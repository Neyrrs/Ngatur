"use client";

import React, { useEffect } from "react";
import { LogOutIcon, Package } from "lucide-react";
import Link from "next/link";
import useUsers from "@/hooks/useUsers";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import ProfilePicture from "@/components/ui/icons/ProfilePicture";


const NavigationBar = () => {
  const navigate = useRouter();
  const { user, loading } = useUsers();
  
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
          <Link href={"/profile"} className="flex gap-5 items-center h-full">
            <p className="text-lg font-medium">{user?.username} </p>
            <ProfilePicture />
          </Link>
          <LogOutIcon className="cursor-pointer" onClick={hanldeLogout} />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
