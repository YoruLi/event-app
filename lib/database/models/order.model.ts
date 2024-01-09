import { Schema, SchemaDefinition, model, models } from "mongoose";

const OrderSchema = new Schema<SchemaDefinition>({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  stripeId: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = models?.Order || model("Order", OrderSchema);

export default Order;
