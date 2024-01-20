import CheckOut from "@/components/checkout";
import EventsCollection from "@/components/events-collection";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getEventById, getEventsByCategory } from "@/lib/actions/event.actions";

import Image from "next/image";

import React from "react";

import EventInfo from "./components/event-info";
import Loading from "./components/loading";

export default async function page({
  params: { id },
  searchParams: { category },
}: {
  params: { id: string };
  searchParams: { category: string };
}) {
  const { data } = await getEventsByCategory({
    categoryId: category,
    eventId: id,
    limit: 3,
  });
  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <EventInfo id={id} />
      </React.Suspense>

      <section className=" my-24 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>
        <React.Suspense fallback={"Loading"}>
          <EventsCollection data={data} pages={1} totalPages={1} />
        </React.Suspense>
      </section>
    </>
  );
}
