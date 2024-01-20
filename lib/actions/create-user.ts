"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/conn";
import { Event } from "../database/models/event.model";
import User from "../database/models/user.model";
import { executeSafely } from "../utils";
import Order from "../database/models/order.model";
import { IUser, UpdateUserParams } from "../types";

export const createUser = async (user: IUser) => {
  return await executeSafely(async () => {
    await connectToDatabase();
    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  });
};

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  return await executeSafely(async () => {
    await connectToDatabase();
    const updatedUser = await User.findByIdAndUpdate({ clerkId }, user, { new: true });
    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  });
};

export const deleteUser = async (clerkId: string) => {
  return await executeSafely(async () => {
    await connectToDatabase();
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) throw new Error("User not found");

    Promise.all([
      Event.deleteMany({ _id: { $in: userToDelete.eventId } }),
      Order.updateMany({ _id: { $in: userToDelete.orders } }, { $set: { buyer: null } }),
    ]);
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  });
};
