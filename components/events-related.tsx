import { IEventSchema } from "@/lib/database/models/event.model";
import React from "react";
import EventCard from "./event-card";
import Pagination from "./pagination";
import { getEventsByCategory } from "@/lib/actions/event.actions";

export default async function EventsRelated({
  event,
  pages,
  totalPages,
}: {
  event: any;
  totalPages: any;
  pages: number;
}) {
  const { data } = await getEventsByCategory({
    categoryId: event.category[0]._id,
    eventId: event._id,
    limit: 3,
  });

  const delay = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  await delay(3000);
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-3">
          <ul
            className="grid gap-3 w-full"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
            }}
          >
            {data.map((event, index) => (
              <li
                key={event._id}
                className={`animate-fade animate-delay-700`}
                style={{
                  animationDelay: `${200 * index}ms`,
                }}
              >
                <EventCard event={event} />
              </li>
            ))}
          </ul>

          <Pagination pages={pages} totalPages={totalPages} />
        </div>
      ) : (
        <div className="flex min-h-[200px] w-full flex-col gap-3 rounded-[14px] border text-accent-foreground py-28 text-center">
          <code>No Events Related found</code>
        </div>
      )}
    </>
  );
}
