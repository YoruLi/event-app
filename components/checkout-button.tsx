"use client";
import React from "react";
import { Button } from "./ui/button";
import { IEventSchema } from "@/lib/database/models/event.model";
import { checkOutOrder } from "@/lib/actions/order.actions";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckOutButton({ event }: { event: IEventSchema }) {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  React.useEffect(() => {}, []);

  const checkoutOrder = async () => {
    const order = {
      ...event,
      eventTitle: event.name,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    await checkOutOrder(order as any);
  };
  return (
    <form action={checkoutOrder} method="POST">
      <Button variant={"link"} className="text-xs rounded-full">
        Buy Ticket
      </Button>
    </form>
  );
}
