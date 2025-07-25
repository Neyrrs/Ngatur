"use client";

import React from "react";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useGetUser } from "@/hooks/useUsers";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProfilePicture from "@/components/ui/icons/ProfilePicture";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/fragments/loaders/Loader";
import ThemeButton from "@/components/ui/buttons/ThemeButton";
import { confirmDialog } from "@/components/ui/alert";
import { useIsMobile } from "@/lib/isMobile";
import AppIcon from "@/components/ui/icons/AppIcon";

const NavigationBar = () => {
  const navigate = useRouter();
  const { user, loading } = useGetUser();
  const isMobile = useIsMobile();

  if (loading) return <Loader />;

  const handleLogout = async () => {
    const result = await confirmDialog("Want to logout?", "You will be pass to login page.");

    if (result) {
      try {
        const res = await axios.get("api/user/logout");
        if (res.status === 200) console.log("logout berhasil");
        navigate.replace("/login");
      } catch (error) {
        console.error("Eror: ", error);
      }
    }
  };
  return (
    <div className="fixed top-0 w-screen z-20">
      <div className="flex bg-[#222831]/95 backdrop:blur-2xl z-50 text-white w-full h-15 items-center px-5 md:px-15 justify-between">
        <AppIcon />
        <div className="w-fit h-full md:flex justify-center items-center text-base gap-5 hidden">
          <Link href={"/moneyTrack"}>Money Tracker</Link>
          <Link href={"/taskTrack"}>Task Tracker</Link>
          <Link href={"/eventTrack"}>Event Tracker</Link>
        </div>
        <div className="flex gap-5 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none cursor-pointer">
              <ProfilePicture />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-fit px-3 cursor-pointer"
            >
              <DropdownMenuLabel className="flex justify-between w-35 items-center">
                <ProfilePicture />
                <p className="text-sm">{user?.username}</p>
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={"/profile"}
                    className="flex gap-5 items-center h-full justify-between w-full"
                  >
                    <p className="text-base font-normal">Profile</p>
                  </Link>
                </DropdownMenuItem>

                {isMobile && (
                  <>
                    <DropdownMenuItem>
                      <Link href={"/moneyTrack"} className="block md:hidden">
                        <p className="text-base font-normal">Money Tracker</p>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/taskTrack"} className="block md:hidden">
                        <p className="text-base font-normal">Task Tracker</p>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/eventTrack"} className="block md:hidden">
                        <p className="text-base font-normal">Event Tracker</p>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuItem onClick={handleLogout}>
                  <div className="flex justify-between items-center w-full">
                    <p className="">Logout</p>
                    <LogOutIcon />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeButton />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
