import { Badge } from "@/components/ui/badge";
import { Github, Instagram, Linkedin, Package } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/profile" },
    { name: "Money Tracker", href: "/money-tracker" },
    { name: "Task Tracker", href: "/task-tracker" },
    { name: "Events Tracker", href: "/events-tracker" },
  ];
  return (
    <div className="w-full h-full col-start-1 flex flex-col gap-5">
      <Link href={"/"} className="flex gap-2 items-center w-fit">
        <Package size={40} color="#471396" />
        <h1 className="text-3xl font-medium text-white">Ngatur</h1>
      </Link>
      <p className="text-white w-3/4 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod halou
        kashi amn wheju{" "}
      </p>
      <div className="flex flex-col gap-2 border-t-2 text-primary-foreground dark:text-secondary-foreground border-primary py-2">
        <h2 className="font-semibold">Get to know me more</h2>
        <div className="flex gap-2 flex-wrap w-1/2">
          <Badge className="text-primary-foreground">
            <Github /> Neyrrs
          </Badge>
          <Badge className="text-primary-foreground">
            <Instagram /> Dwonvy
          </Badge>
          <Badge className="w-20 text-primary-foreground">
            <Linkedin /> Linkedin
          </Badge>
        </div>
      </div>
      <div className="flex flex-col justify-end h-full py-5 gap-2">
        <div className="flex flex-col gap-1 text-white font-thin text-xl">
          {navLinks.map((item) => (
            <Link href={item.href} key={item.name} className="hover:underline w-fit">
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
