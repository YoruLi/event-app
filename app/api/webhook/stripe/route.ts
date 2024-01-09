import { NextResponse } from "next/server";
import stripe from "stripe";

async function POST(req: Request) {
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

    const order = {};

    // TODO create order
  }

  return NextResponse.json("", { status: 200 });
}