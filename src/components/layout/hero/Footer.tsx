import { Badge } from "@/components/ui/badge";
import AppIcon from "@/components/ui/icons/AppIcon";
import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/profile" },
    { name: "Money Tracker", href: "/moneyTrack" },
    { name: "Task Tracker", href: "/taskTrack" },
    { name: "Events Tracker", href: "/eventTrack" },
  ];

  return (
    <div className="w-full h-full col-start-1 flex flex-col gap-5">
     <AppIcon />
      <p className="text-white w-3/4 text-xs md:text-base">
        All-in-one app to manage your tasks, money, and events—efficiently.
      </p>
      <div className="flex flex-col gap-2 border-t-2 text-primary-foreground dark:text-secondary-foreground border-primary py-2">
        <h2 className="font-semibold text-sm md:text-base">Get to know me more</h2>
        <div className="flex gap-2 md:flex-wrap w-1/2 text-sm md:text-base">
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
      <div className="flex flex-col justify-end h-full pb-5 md:py-5 gap-2">
        <div className="flex flex-col gap-1 text-white font-thin text-xl">
          {navLinks.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="hover:underline w-fit text-sm md:text-base"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
