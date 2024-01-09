import Stripe from "stripe";
import Order from "../database/models/order.model";
import { executeSafely } from "../utils";
import { redirect } from "next/navigation";

interface createOrderSchema {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
}

type CheckoutOrderParams = {
  eventTitle: string;
  eventId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};
export const checkOutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  await executeSafely(async () => {
    // * get order price
    const price = order.isFree ? 0 : Number(order.price) * 100;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.buyerId,
        buyerId: order.eventId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/home`,
    });
    if (!session?.url) return;
    redirect(session.url);
  });
};
export const createOrder = async (order: createOrderSchema) => {
  return await executeSafely(async () => {
    const newOrder = await Order.create(order);

    return JSON.parse(JSON.stringify(newOrder));
  });
};
