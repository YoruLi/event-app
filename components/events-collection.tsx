import { IEventSchema } from "@/lib/database/models/event.model";
import React from "react";
import EventCard from "./event-card";
import Pagination from "./pagination";

export default async function EventsCollection({
  data: events,
  pages,
  totalPages,
  userId,
}: {
  pages: number;
  data: IEventSchema[];
  totalPages: number;
  userId?: string;
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
            {events.map((event, index) => {
              const hide = event.organizer._id === userId;
              return (
                <li
                  key={event._id}
                  className={`animate-fade animate-delay-700`}
                  style={{
                    animationDelay: `${200 * index}ms`,
                  }}
                >
                  <EventCard event={event} detailsButton={hide} />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 ? <Pagination pages={pages} totalPages={totalPages} /> : null}
        </div>
      ) : (
        <div className="flex w-full flex-col gap-3  text-accent-foreground py-28 text-center">
          <code>No Events Found</code>
          <h3 className="animate-fade animate-delay-300 text-5xl animate-once text-transparent italic font-paytone bg-transparent bg-gradient-to-r  from-violet-700 to-blue-700 bg-blend-multiply bg-clip-text">
            DE
          </h3>
        </div>
      )}
    </>
  );
}
