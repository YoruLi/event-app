"use server";
import Stripe from "stripe";
import Order from "../database/models/order.model";
import { executeSafely } from "../utils";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../database/conn";

interface createOrderSchema {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: number;
}

type CheckoutOrderParams = {
  eventTitle: string;
  eventId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};
export const checkOutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(
    "sk_test_51NvBt3Btuy2P6uiYFeMZi3eW3SF0JhS6bQerZjGtSH2JSDYqaaAgF3ZOGiFn11bkNRa01ozeOq1ktcc2acI0gD2M00DIxVP8Mw"
  );

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
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/home`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/home`,
    });
    if (!session?.url) return;
    redirect(session.url);
  });
};
export const createOrder = async (order: createOrderSchema) => {
  return await executeSafely(async () => {
    await connectToDatabase();
    const newOrder = await Order.create({
      ...order,
      eventId: order.eventId,
      buyerId: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  });
};
