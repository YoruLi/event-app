import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface PaginationProps {
  pages: number;
  totalPages: number;
}
export default function Pagination({ pages, totalPages }: PaginationProps) {
  const isDisabledPreviousButton = pages <= 1;
  const isDisabledNextButton = pages >= totalPages;

  return (
    <footer className="flex justify-between lg:justify-start gap-2">
      <Button
        asChild={!isDisabledPreviousButton}
        variant={"outline"}
        disabled={isDisabledPreviousButton}
        aria-disabled={isDisabledPreviousButton}
        className="[&:not(:disabled)]:bg-blue-500  [&:not(:disabled)]:text-white "
      >
        <Link href={`?pages=${pages - 1}`} className="text-primary">
          Previous
        </Link>
      </Button>
      <Button
        asChild={!isDisabledNextButton}
        variant={"outline"}
        disabled={isDisabledNextButton}
        aria-disabled={isDisabledNextButton}
        className="[&:not(:disabled)]:bg-blue-500 [&:not(:disabled)]:text-white "
      >
        <Link href={`?pages=${pages + 1}`} className="text-primary">
          Next
        </Link>
      </Button>
    </footer>
  );
}
