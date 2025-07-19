import { useIsMobile } from "@/lib/isMobile";
import { Package } from "lucide-react";
import Link from "next/link";
import React from "react";

const AppIcon = () => {
  const isMobile =  useIsMobile();
  return (
    <>
      <Link href={"/"} className="flex gap-2 items-center w-fit">
        <Package size={isMobile ? 30 : 40} color="#471396" />
        <h1 className="text-xl md:text-3xl font-medium text-white">Ngatur</h1>
      </Link>
    </>
  );
};

export default AppIcon;
