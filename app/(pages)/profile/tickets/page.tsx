import Tickets from "@/components/tickets";
import { auth } from "@clerk/nextjs";
import React from "react";

export default function TicketsPage({ searchParams }: { searchParams: { pages: string } }) {
  const { sessionClaims } = auth();
  const { userId } = sessionClaims?.userId as any;

  const pages = Number(searchParams.pages) || 1;

  return (
    <>
      <h3 className="-tracking-tight m-2 text-center lg:text-start">Your tickets</h3>

      <Tickets pages={pages} userId={userId} />
    </>
  );
}
