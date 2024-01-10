import Tickets from "@/components/tickets";
import { auth } from "@clerk/nextjs";
import React from "react";
import { unknown } from "zod";

export default function TicketsPage() {
  const { sessionClaims } = auth();
  const { userId } = sessionClaims?.userId as any;

  return (
    <>
      <h3 className="-tracking-tight m-2 text-center lg:text-start">Your tickets</h3>
      <section
        className="grid gap-3 w-full place-content-center"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
        }}
      >
        <div>
          <Tickets userId={userId} />
        </div>
      </section>
    </>
  );
}
