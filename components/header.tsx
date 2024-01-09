import Image from "next/image";
import React from "react";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import SelectTheme from "./select-theme";

export default function Header() {
  return (
    <header className="shadow-sm shadow-border min-h-[54px] h-full px-4  flex justify-between items-center  ">
      <Link
        href={"/"}
        className="animate-fade animate-delay-300 text-3xl animate-once text-transparent italic font-paytone bg-transparent bg-gradient-to-r  from-violet-700 to-blue-700 bg-blend-multiply bg-clip-text"
      >
        DE
      </Link>

      <div className="*:animate-fade *:animate-delay-300 *animate-once flex">
        <SelectTheme />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
