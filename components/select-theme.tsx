"use client";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useTheme } from "@/hooks/use-theme";
import { Svg } from "./ui/svg";
import { svgs } from "@/data/svgs";

const THEMES = ["dark", "light", "serene"];
export default function SelectTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Select onValueChange={(value) => setTheme(value)} defaultValue={theme as string}>
        <SelectTrigger className="w-auto rounded-full border-none">
          <Svg path={svgs[theme!]?.path} className="size-5" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          {THEMES.map((theme, index) => (
            <SelectItem key={index} value={theme}>
              <div className="flex gap-2 *:size-4">
                <Svg path={svgs[theme!]?.path} className="size-5" />
                {theme}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
