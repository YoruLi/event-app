import { IEventSchema } from "@/lib/database/models/event.model";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function EventCard({
  event,
  detailsButton,
}: {
  event: IEventSchema;
  detailsButton: boolean;
}) {
  return (
    <>
      <article className="group relative mx-auto h-[280px] w-full rounded-2xl transition-all border border-black/10 backdrop-blur-md shadow-inner shadow-black/30 overflow-hidden  ">
        <div className="absolute bottom-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent rounded-2xl from-40% via-[#151836]/80 to-[#151836] pointer-events-none" />
        <Link
          href={`/events/${event._id}`}
          style={{
            backgroundImage: `url(${event.imageUrl})`,
          }}
          className="transition-scale absolute inset-0 
       h-full w-full z-0 
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
        />
        {detailsButton ? (
          <Button asChild className="absolute left-0 top-0" variant={"default"}>
            <Link href={`/orders?eventId=${event._id}`}>Details</Link>
          </Button>
        ) : null}
        <Badge className="absolute right-4 top-4 backdrop-blur-md shadow-inner text-card-foreground hover:bg-transparent shadow-black/30 border-white font-bold border cursor-pointer bg-transparent">
          {event.isFree ? "Free" : `$${event.price}`}
        </Badge>

        <section className="size-full grid items-end p-4 *:z-10">
          <div className="flex flex-col text-white gap-1">
            <time className="text-xs opacity-80">{formatDate(event.start)?.formattedDateTime}</time>
            <p className="first-letter:uppercase font-semibold">{event.name}</p>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-3">
                <Avatar className="!size-8">
                  <AvatarImage src={event.organizer.photo} alt="image" />
                  <AvatarFallback className="bg-violet-600/30 animate-pulse"></AvatarFallback>
                </Avatar>
                <p className="text-sm">{event.organizer.username}</p>
              </div>
              <div>
                <Badge className="self-end bg-transparent text-card-foreground border-white border cursor-pointer hover:bg-transparent backdrop-blur-md shadow-inner shadow-black/30">
                  {event.category[0].name}
                </Badge>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
