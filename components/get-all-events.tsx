import EventsCollection from "@/components/events-collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import React from "react";

export default async function GetAllEvents({
  query,
  category,
  pages,
}: {
  pages: number;
  query: string;
  category: string;
}) {
  const { data: events, totalPages } = await getAllEvents({
    query,
    category,
    pages,
  });

  return <EventsCollection data={events} pages={pages} totalPages={totalPages} />;
}
