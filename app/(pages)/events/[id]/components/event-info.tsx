import CheckOut from "@/components/checkout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Svg } from "@/components/ui/svg";
import { svgs } from "@/data/svgs";
import { getEventById } from "@/lib/actions/event.actions";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default async function EventInfo({ id }: { id: string }) {
  const event = await getEventById(id);

  const hasFinished = new Date(event.end) < new Date();
  return (
    <section className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <article className="group relative mx-auto h-[500px] w-full rounded-lg transition border bg-primary/5 border-black/10 overflow-hidden">
          {hasFinished ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <p className="text-red-500 font-bold text-sm animate-pulse pointer-events-none">
                Event has finished, the tickets are no longer available
              </p>
            </div>
          ) : (
            <>
              <Image
                src={event?.imageUrl}
                alt="Event image"
                fill
                className="absolute inset-0 h-full w-full z-0 opacity-90"
              />
              <CheckOut event={event} />
            </>
          )}
        </article>

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
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
              <div className="flex flex-wrap items-center gap-2 justify-between w-full">
                <div className="inline-flex gap-2 items-center">
                  <Svg path={svgs.calendar.path} className="fill-blue-600 size-6" />
                  <time className="text-xs opacity-80">
                    {formatDate(event.start)?.formattedDateTime}
                  </time>
                </div>
                <div className="inline-flex gap-2 items-center">
                  <Svg path={svgs.calendar.path} className="fill-blue-600 size-6" />
                  <time className="text-xs opacity-80">
                    {formatDate(event.end)?.formattedDateTime}
                  </time>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Svg path={svgs.ubication.path} className="fill-blue-600 size-6" />
              <p className="text-xs opacity-80">{event.location}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="opacity-80">Description:</label>
            <p className="leading-tight">{event.description}</p>
            {event.url ? (
              <p className=" truncate mt-4">
                URL:&nbsp;
                <a href={event.url} className="text-primary opacity-80 underline">
                  {event.url}
                </a>
              </p>
            ) : null}
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
  );
}
