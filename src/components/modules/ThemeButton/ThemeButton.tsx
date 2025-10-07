"use client";

import { Button } from "components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeButton() {
  const { setTheme, theme, systemTheme } = useTheme();

  const currentTheme: string =
    (theme === "system" ? systemTheme : theme) || "light";

  const toggleTheme = () => {
    switch (currentTheme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
      default:
        setTheme("system");
    }
  };

  return (
    <Button
      className="cursor-pointer"
      onClick={toggleTheme}
      variant="outline"
      size="icon"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
