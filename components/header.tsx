import Image from "next/image";
import React from "react";

import DE from "@/public/imgs/DE.png";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="shadow-sm shadow-black/[7%] min-h-[54px] h-full px-4  flex justify-between items-center  ">
      <Link
        href={"/"}
        className="animate-fade animate-delay-300 text-3xl animate-once text-transparent italic font-paytone bg-transparent bg-gradient-to-r  from-violet-700 to-blue-700 bg-blend-multiply bg-clip-text"
      >
        DE
      </Link>

      <div className="*:animate-fade *:animate-delay-300 *animate-once">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
