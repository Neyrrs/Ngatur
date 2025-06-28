"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Button
        size={"sm"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Moon /> : <Sun />}
        {theme === "dark" ? "Dark" : "Light"}
      </Button>
    </div>
  );
};

export default ThemeButton;
