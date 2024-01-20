import { getTicketsUser } from "@/lib/actions/order.actions";

import React from "react";
import Ticket from "./ticket";
import Pagination from "./pagination";

export default async function Tickets({ userId, pages }: { userId: string; pages: number }) {
  const { data: ordersEvent, totalPages } = await getTicketsUser({ userId, pages });

  return ordersEvent.length > 0 ? (
    <div className="flex flex-col gap-3">
      <ul
        className="grid gap-4 w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
        }}
      >
        {ordersEvent.map((event, index) => (
          <li
            key={event._id}
            className={`animate-fade animate-delay-700`}
            style={{
              animationDelay: `${200 * index}ms`,
            }}
          >
            <Ticket key={event._id} event={event} />
          </li>
        ))}
      </ul>
      <Pagination pages={pages} totalPages={totalPages} />
    </div>
  ) : (
    <div className="flex w-full flex-col gap-3 text-accent-foreground py-28 text-center">
      <code>No tickets available</code>
    </div>
  );
}
