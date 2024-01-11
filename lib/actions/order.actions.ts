"use server";
import Stripe from "stripe";
import Order from "../database/models/order.model";
import { executeSafely } from "../utils";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../database/conn";
import User from "../database/models/user.model";
import { Event } from "../database/models/event.model";
import mongoose from "mongoose";
import { CheckoutOrderParams, EventOrderInfoProps, OrderType, createOrderSchema } from "../types";

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

export const getTicketsUser = async ({
  userId,
  pages,
}: {
  userId: string;
  pages: number;
}): Promise<{ data: OrderType[]; totalPages: number }> => {
  return await executeSafely(async () => {
    await connectToDatabase();
    const offset = Number(pages - 1) * 10;
    const tickets = await Order.find({ buyerId: userId })
      .sort({ createdAt: "desc" })
      .skip(offset)
      .limit(10)
      .populate({
        path: "eventId",
        model: Event,
        select: "imageUrl",
        populate: {
          path: "organizer",
          model: User,
          select: "username photo",
        },
      });

    const totalPages = await Order.distinct("eventId._id").countDocuments({ buyerId: userId });
    return {
      data: JSON.parse(JSON.stringify(tickets)),
      totalPages: Math.ceil(totalPages / 10),
    };
  });
};

export const getEventOrderInfo = async ({
  eventId,
}: {
  eventId: string;
}): Promise<EventOrderInfoProps[]> => {
  return await executeSafely(async () => {
    await connectToDatabase();
    if (!eventId) {
      return;
    }

    const ordersInfo = await Order.aggregate([
      {
        $match: {
          eventId: new mongoose.Types.ObjectId(eventId), // Convert eventId to ObjectId
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $lookup: {
          from: "users",
          localField: "buyerId",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: "$event.name",
          eventId: "$event._id",
          buyer: "$buyer.username",
        },
      },
    ]);

    return JSON.parse(JSON.stringify(ordersInfo));
  });
};
