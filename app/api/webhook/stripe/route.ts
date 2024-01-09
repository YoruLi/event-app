import { createOrder } from "@/lib/actions/order.actions";
import { NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const stripeSignature = req.headers.get("stripe-signature") as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json({ message: "Webhook error", error }, { status: 500 });
  }

  if (event.type === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || "",
      buyerId: metadata?.buyerId || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      createdAt: Date.now(),
    };

    // * create order
    const newOrder = await createOrder(order);

    return NextResponse.json({ message: "OK", order: newOrder });
  }

  return NextResponse.json("", { status: 200 });
}
