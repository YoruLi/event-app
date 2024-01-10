import CheckOut from "@/components/checkout";
import EventsCollection from "@/components/events-collection";

import EventsRelated from "@/components/events-related";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Svg } from "@/components/ui/svg";
import { svgs } from "@/data/svgs";
import { getEventById, getEventsByCategory } from "@/lib/actions/event.actions";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default async function page({ params: { id } }: { params: { id: string } }) {
  const event = await getEventById(id);
  const { data } = await getEventsByCategory({
    categoryId: event.category[0]._id,
    eventId: event._id,
    limit: 3,
  });

  return (
    <>
      <section className="flex justify-center bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl ">
          <div className="relative animate-fade-right  animate-ease-in-out animate-duration-[2000ms]">
            <Image
              src={event.imageUrl}
              alt="hero image"
              width={1000}
              height={1000}
              className="max-h-[480px] object-cover object-center relative rounded-2xl"
            />
            <div className="absolute bottom-0 top-0 z-10 h-full w-full  border bg-gradient-to-b from-transparent rounded-2xl from-40% via-background/80 to-background pointer-events-none" />

            <CheckOut event={event} />
          </div>

          <div className="flex w-full flex-col gap-8 px-5 md:px-10">
            <div className="flex flex-col gap-6">
              <h2 className="font-bold text-3xl first-letter:uppercase">{event.name}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3 *:px-6 *:py-2">
                  <Badge className="bg-blue-600">{event.isFree ? "Free" : `$${event.price}`}</Badge>
                  <Badge>{event.category[0].name}</Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 md:gap-3">
                <Svg path={svgs.calendar.path} className="fill-blue-600" width={32} height={32} />
                <div className="flex flex-col flex-wrap items-center">
                  <p>
                    {formatDate(event.start)?.formattedDate} -
                    {formatDate(event.start)?.formattedTime}
                  </p>
                  <p>
                    {formatDate(event.end)?.formattedDate} -{formatDate(event.end)?.formattedTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Svg path={svgs.ubication.path} className="fill-blue-600" width={32} height={32} />
                <p className="">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="  font-bold">Description:</p>
              <p className="leading-3">{event.description}</p>
              <p className=" truncate mt-4">
                URL:&nbsp;
                <a href={event.url} className="text-primary underline">
                  {event.url ? event.url : "Url was not provided"}
                </a>
              </p>
            </div>

            <div className="flex gap-3 items-center mt-auto justify-end">
              Organizer by:
              <Avatar className="!size-8">
                <AvatarImage src={event.organizer.photo} />
                <AvatarFallback className="bg-slate-200">DE</AvatarFallback>
              </Avatar>
              <p>{event.organizer.username}</p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>
        <React.Suspense fallback={"Loading"}>
          <EventsCollection data={data} pages={1} totalPages={1} />
        </React.Suspense>
      </section>
    </>
  );
}
