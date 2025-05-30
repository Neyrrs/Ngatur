import React from "react";
import { Package } from "lucide-react";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <div className="fixed top-0 w-screen">
      <div className="flex bg-[#222831] text-white w-full h-15 items-center px-15 justify-between">
        <Link href={"/"} className="flex gap-2 items-center">
          <Package width={30} height={30} color="#A62C2C"/>
          <p className="text-2xl font-medium">Ngatur</p>
        </Link>
        <Link href={"/profile"} className="flex gap-5 items-center">
          <p className="text-lg font-medium">David </p>
          <div className="h-8 w-8 bg-white rounded-full"></div>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
