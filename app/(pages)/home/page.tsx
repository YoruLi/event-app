import EventsCollection from "@/components/events-collection";
import Search from "@/components/search";
import SelecCategory from "@/components/select-category";
import { getAllEvents } from "@/lib/actions/event.actions";
import React from "react";
type SearchParamProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function HomePage({ searchParams }: SearchParamProps) {
  const q = (searchParams?.query as string) || "";

  const pages = Number(searchParams?.pages) || 1;
  const category = (searchParams?.category as string) || "";
  const events = await getAllEvents({
    query: q,
    category,
    pages,
  });

  return (
    <div>
      <section className="flex gap-2">
        <Search placeholder="What are you searching for?" />
        <SelecCategory />
      </section>

      <section id="events" className=" my-8 flex flex-col gap-8 md:gap-12">
        <EventsCollection events={events?.data} pages={pages} totalPages={events.totalPages} />
      </section>
    </div>
  );
}
