import EventForm from "@/components/event-form";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

export default async function page({ params: { id } }: { params: { id: string } }) {
  const { sessionClaims } = auth();
  const { userId } = sessionClaims?.userId as any;
  const event = await getEventById(id);
  return (
    <>
      <EventForm type="Update" userId={userId} eventDefaultValuesProp={event} eventId={id} />
    </>
  );
}
