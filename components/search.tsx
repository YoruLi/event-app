"use client";
import React from "react";
import { Input } from "./ui/input";
import { Svg } from "./ui/svg";
import { svgs } from "@/data/svgs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleSearch = React.useCallback(
    (term: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (term) newSearchParams.set("query", term);
      else newSearchParams.delete("query");

      replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [searchParams, pathname, replace]
  );

  return (
    <div className="relative flex items-center ">
      <Input
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className="input-field relative px-10 bg-input hover:bg-input-hover"
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
