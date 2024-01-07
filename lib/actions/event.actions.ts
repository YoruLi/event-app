"use server";
import mongoose from "mongoose";
import { Event } from "../database/models/event.model";
import { executeSafely } from "../utils";
const ObjectId = mongoose.Types.ObjectId;

export const createEvent = async ({
  data,
  organizerId,
  categoryId,
}: {
  data: any;
  organizerId: string;
  categoryId?: string[];
}) => {
  return await executeSafely(async () => {
    const newEvent = await Event.create({
      ...data,
      organizer: organizerId,
      category: categoryId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  });
};
