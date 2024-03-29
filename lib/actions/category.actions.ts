"use server";
import { connectToDatabase } from "../database/conn";
import Category from "../database/models/category.model";
import { executeSafely } from "../utils";

export const createCategory = async ({ name }: { name: string }) => {
  return await executeSafely(async () => {
    await connectToDatabase();
    const category = await Category.create({ name });

    return JSON.parse(JSON.stringify(category));
  });
};

export const getAllCategories = async () => {
  return await executeSafely(async () => {
    await connectToDatabase();
    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  });
};

export const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};
