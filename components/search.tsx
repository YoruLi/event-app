import React from "react";
import { Input } from "./ui/input";
import { Svg } from "./ui/svg";
import { svgs } from "@/data/svgs";

export default function Search({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative flex items-center  ">
      <Input
        placeholder={placeholder}
        className="relative border-0 bg-gray-200 rounded-full px-10 outline-offset-0 focus:bg-gray-300/80 transition-colors placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Svg
        path={svgs.search.path}
        viewBox={svgs.search.viewBox}
        height={18}
        width={18}
        className="absolute ml-4 pointer-events-none fill-gray-400"
      />
    </div>
  );
}
