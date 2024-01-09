import React from "react";
import CheckOutButton from "./checkout-button";
import { IEventSchema } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function CheckOut({ event }: { event: IEventSchema }) {
  const hasFinished = new Date(event.end) < new Date();

  return (
    <div className="absolute right-2 bottom-2 z-20">
      {hasFinished ? (
        <p className="text-red-400 text-sm animate-pulse pointer-events-none">
          Event has finished, the tickets are no longer available
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild variant={"link"} className="text-xs rounded-full">
              <Link href={"/sign-in"}>Get Ticket</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <CheckOutButton />
          </SignedIn>
        </>
      )}
    </div>
  );
}
