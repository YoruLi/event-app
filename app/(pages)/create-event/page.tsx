import EventForm from "@/components/event-form";

import React from "react";

export default function CreateEventPage() {
  return (
    <>
      <h3 className="text-left md:text-center font-bold">Create a new event</h3>

      <div className="my-10">
        {/* form */}

        <EventForm />
      </div>
    </>
  );
}
