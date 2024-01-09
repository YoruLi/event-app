import { IEventSchema } from "@/lib/database/models/event.model";
import React from "react";
import EventCard from "./event-card";
import Pagination from "./pagination";

export default function EventsCollection({
  events,
  pages,
  totalPages,
}: {
  events: IEventSchema[];
  pages: number;
  totalPages: number;
}) {
  return (
    <>
      {events.length > 0 ? (
        <div className="flex flex-col gap-3">
          <ul
            className="grid gap-3 w-full"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
            }}
          >
            {events.map((event) => (
              <li key={event._id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>

          <Pagination pages={pages} totalPages={totalPages} />
        </div>
      ) : (
        <div className="flex min-h-[200px] w-full flex-col gap-3 rounded-[14px] border text-accent-foreground py-28 text-center">
          <code>No Events Found</code>
          <code>Come back later</code>
        </div>
      )}
    </>
  );
}
