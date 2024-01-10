import { getTicketsUser } from "@/lib/actions/order.actions";

import React from "react";
import Ticket from "./ticket";

export default async function Tickets({ userId }: { userId: string }) {
  const events = await getTicketsUser({ userId });

  return events.map((event) => {
    return <Ticket key={event._id} event={event} />;
  });
}
