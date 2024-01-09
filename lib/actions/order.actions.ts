import Order from "../database/models/order.model";
import { executeSafely } from "../utils";

interface createOrderSchema {
  stripeId: string;
  buyerId: string;
  totalAmount: string;
}
export const createOrder = async (order: createOrderSchema) => {
  return await executeSafely(async () => {
    const newOrder = await Order.create(order);

    return JSON.parse(JSON.stringify(newOrder));
  });
};
