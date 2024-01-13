"use client";
import React from "react";
import { Button } from "./ui/button";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Svg } from "./ui/svg";
import { svgs } from "@/data/svgs";

interface PaginationProps {
  pages: number;
  totalPages: number;
}
export default function Pagination({ pages, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  function createCurrentPage(pageNumber: number) {
    params.set("pages", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <footer className="flex items-center gap-4 w-full justify-center mt-10">
      <Button
        variant={"outline"}
        onClick={() => {
          router.replace(createCurrentPage(pages - 1));
        }}
        disabled={Number(pages) <= 1}
        className="[&:not(:disabled)]:bg-blue-500  [&:not(:disabled)]:text-white "
      >
        <Svg path={svgs.leftArrow.path} />
      </Button>

      <span className="text-xs italic">
        {pages} &nbsp;/&nbsp; {totalPages}
      </span>
      <Button
        variant={"outline"}
        onClick={() => {
          router.replace(createCurrentPage(pages + 1));
        }}
        disabled={Number(pages) >= totalPages}
        className="[&:not(:disabled)]:bg-blue-500 [&:not(:disabled)]:text-white "
      >
        <Svg path={svgs.rightArrow.path} />
      </Button>
    </footer>
  );
}
