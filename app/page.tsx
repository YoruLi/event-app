"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import gridImage from "@/public/imgs/g.jpg";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const bgColors = ["violet-600", "violet-800"] as const;

export default function Home() {
  const [activeColor, updateActiveColor] = React.useState<(typeof bgColors)[number]>(bgColors[0]);
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      const current = bgColors.indexOf(activeColor);
      const next = (current + 1) % bgColors.length;
      updateActiveColor(bgColors[next]);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [activeColor]);

  return (
    <>
      <div
        className={cn(
          `fixed inset-0 transition-colors delay-100 duration-700 opacity-50 object-cover w-full h-screen`,
          {
            [`bg-${activeColor}`]: bgColors.includes(activeColor),
          }
        )}
      />
      <div className={cn("grid place-items-center h-screen bg-[#141322] ")}>
        <h1 className="lg:text-7xl text-6xl font-bold font-paytone animate-heading z-20 text-balance text-center bg-clip-text  text-white  ">
          <span
            className={cn("transition-colors delay-100 duration-700", {
              [`text-${activeColor}`]: bgColors.includes(activeColor),
            })}
          >
            Daily Events
          </span>
          &nbsp; app
        </h1>
        <p></p>
        <div className="bg-transparent bg-gradient-to-b from-black/40 via-black/70 to-black/90 fixed inset-0 w-screen h-screen " />
        <Image
          src={gridImage.src}
          className="absolute inset-0 mix-blend-darken bg-black bg-blend-screen opacity-30 "
          fill
          alt="grid image"
        />
        <div className="text-center my-auto animate-auth-button max-w-sm  w-full flex flex-col gap-4 *:rounded *:py-2 *:transition-colors ">
          <SignedOut>
            <Button
              className={cn(`delay-100 duration-700 *:size-full `, {
                [`bg-${activeColor}`]: bgColors.includes(activeColor),
              })}
            >
              <Link href={"/sign-in"}>Sign In</Link>
            </Button>
          </SignedOut>
          <SignedOut>
            <Button className="bg-transparent border-violet-600 hover:border-violet-500 border *:size-full">
              <Link href={"/sign-up"}>Sign Up</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button className="bg-transparent border-violet-600 hover:border-violet-500 border *:size-full">
              <Link href={"/home"}>Go Home</Link>
            </Button>
          </SignedIn>
        </div>
      </div>
    </>
  );
}
