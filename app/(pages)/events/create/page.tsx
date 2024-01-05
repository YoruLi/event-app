import EventForm from "@/components/event-form";
import { auth } from "@clerk/nextjs";

import React from "react";

export default function CreateEventPage() {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <h3 className="text-left md:text-center font-bold">Create a new event</h3>

      <div className="my-10">
        {/* form */}

        <EventForm userId={userId} />
      </div>
    </>
  );
}
