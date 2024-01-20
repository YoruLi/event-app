import React from "react";
import CheckOutButton from "./checkout-button";
import { IEventSchema } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function CheckOut({ event }: { event: IEventSchema }) {
  return (
    <>
      <div className="absolute right-2 bottom-2 z-20">
        <SignedOut>
          <Button asChild variant={"link"} className="text-xs rounded-full">
            <Link href={"/sign-in"}>Get Ticket</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <CheckOutButton event={event} />
        </SignedIn>
      </div>
    </>
  );
}
