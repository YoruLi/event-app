"use client";

import React, { MouseEvent } from "react";
import Image from "next/image";
import { OrderType } from "@/lib/actions/order.actions";
export default function Ticket({ event }: { event: OrderType }) {
  const ticket = React.useRef<HTMLDivElement | null>(null);

  const handleMoveTicker = (e: MouseEvent) => {
    const tickerRef = ticket.current;
    if (tickerRef) {
      const { width, height, x, y } = tickerRef.getBoundingClientRect();
      const halfX = width / 2;
      const halfY = height / 2;

      const offsetX = e.clientX - x;
      const offsetY = e.clientY - y;
      const skewX = ((offsetX - halfX) / halfX) * 15;
      const skewY = ((offsetY - halfY) / halfY) * 15;
      tickerRef.style.transform = `rotateX(${skewX}deg) rotateY(${skewY}deg)`;
      tickerRef.style.scale = "1.05";
    }
  };

  const handleLeave = () => {
    const tickerRef = ticket.current;
    if (tickerRef) {
      tickerRef.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;
      tickerRef.style.scale = "1";
    }
  };

  return (
    <div
      ref={ticket}
      onMouseMove={(e) => handleMoveTicker(e)}
      onMouseLeave={() => handleLeave()}
      key={event._id}
      className="relative flex mx-auto justify-between rounded-lg max-w-[24rem] h-40 shadow-lg bg-contain border-2 border-border transition-all "
    >
      <p className="bg-transparent bg-gradient-to-r px-2 font-paytone text-transparent from-violet-700 to-blue-700 bg-blend-multiply bg-clip-text font-bold text-2xl">
        Daily Events
      </p>

      <div className="absolute left-0 bottom-0 px-3 py-2 z-10">
        <p className="text-xs text-primary font-medium">
          Organized by:&nbsp;
          <span>{event?.eventId?.organizer?.username}</span>
        </p>
      </div>
      <div className="relative">
        <Image
          src={event.eventId.imageUrl}
          alt="image"
          width={110}
          height={100}
          className="relative w-full h-full z-0 rounded-r-lg"
        />
      </div>

      <div className="absolute inset-0 grid place-content-center animate-fade animate-delay-300 text-7xl animate-once text-transparent italic bg-transparent bg-gradient-to-r from-violet-700 from-45%  via-blue-600 font-paytone to-blue-600 bg-blend-multiply bg-clip-text">
        DE
      </div>
    </div>
  );
}
