"use server";

import { Event, IEventSchema } from "../database/models/event.model";
import { executeSafely } from "../utils";
import { connectToDatabase } from "../database/conn";
import Category from "../database/models/category.model";
import User from "../database/models/user.model";
import { getCategoryByName } from "./category.actions";
import { EventQuery } from "../types";
import { LIMIT } from "@/constants";
import { revalidatePath } from "next/cache";
import { ModifyResult } from "mongoose";

export const createEvent = async ({
  data,
  userId,
  categoryId,
}: {
  data: any;
  userId: string;
  categoryId?: string[];
}) => {
  return await executeSafely(async () => {
    const newEvent = await Event.create({
      ...data,
      organizer: userId,
      category: categoryId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  });
};

const populateEvent = async (query: EventQuery) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstname lastname username photo",
    })
    .populate({
      path: "category",
      model: Category,
      select: "_id name",
    });
};

export const getAllEvents = async ({
  category,
  query,
  pages,
}: {
  category: string;
  query: string;
  pages: number;
}): Promise<{ data: IEventSchema[]; totalPages: number }> => {
  return await executeSafely(async () => {
    await connectToDatabase();
    const searchQuery = query ? { name: { $regex: query, $options: "i" } } : {};
    const categoryByName = category ? await getCategoryByName(category) : null;
    const offset = (pages - 1) * LIMIT;
    const eventsQuery = Event.find({
      $and: [searchQuery, categoryByName ? { category: categoryByName._id } : {}],
    })
      .sort({ createdAt: "desc" })
      .skip(offset)
      .limit(LIMIT);

    const events = await populateEvent(eventsQuery);
    const totalPages = await Event.countDocuments({
      $and: [searchQuery, categoryByName ? { category: categoryByName._id } : {}],
    });

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(totalPages / LIMIT),
    };
  });
};

export const getEventById = async (eventId: string): Promise<IEventSchema> => {
  return await executeSafely(async () => {
    await connectToDatabase();

    const event = await populateEvent(Event.findById(eventId));

    if (!event) {
      throw new Error("Event not found");
    }

    return JSON.parse(JSON.stringify(event));
  });
};

export const getEventsByCategory = async ({
  eventId,
  categoryId,
  limit = 3,
}: {
  eventId: string;
  categoryId: string;
  limit: number;
}): Promise<{ data: IEventSchema[] }> => {
  return await executeSafely(async () => {
    await connectToDatabase();

    const eventsQ = Event.find({
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    })
      .sort({ createAt: "desc" })
      .limit(limit);

    const events = await populateEvent(eventsQ);

    return { data: JSON.parse(JSON.stringify(events)) };
  });
};

export const getEventByUser = async ({
  organizer,
  pages,
}: {
  organizer: string;
  pages: number;
}) => {
  return await executeSafely(async () => {
    await connectToDatabase();
    const offset = (pages - 1) * LIMIT;
    const eventsByUser = await populateEvent(
      Event.find({ organizer: organizer }).sort({ createdAt: "desc" }).skip(offset).limit(10)
    );
    const totalPages = await Event.countDocuments({ organizer: organizer });

    return {
      data: JSON.parse(JSON.stringify(eventsByUser)),
      totalPages: Math.ceil(totalPages / LIMIT),
    };
  });
};

export const updateEventById = async ({
  event,
  userId,
  path,
}: {
  event: any;
  userId: string;
  path: string;
}) => {
  return await executeSafely(async () => {
    await connectToDatabase();

    const updatedEvent = await Event.findByIdAndUpdate(event._id, { ...event }, { new: true });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedEvent));
  });
};

export const deleteEventFn = async (eventId: string) => await Event.findByIdAndDelete(eventId);

export const deleteAction = async (
  eventId: string,
  path: string,
  deleteFn: (eventId: string) => Promise<ModifyResult<any>>
) => {
  return await executeSafely(async () => {
    await connectToDatabase();
    await deleteFn(eventId);

    revalidatePath(path);
  });
};
