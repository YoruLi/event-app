import { Document, Schema, SchemaDefinition, Types, model, models } from "mongoose";

export interface IEventSchema extends Document {
  _id: string;
  name: string;
  description?: string;
  start: Date;
  end: Date;
  createdAt: Date;
  location?: string;
  imageUrl: string;
  price?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
  url?: string;
}

const EventSchema = new Schema<SchemaDefinition>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    default: Date.now,
  },
  end: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  price: {
    type: String,
  },

  isFree: {
    type: Boolean,
    default: false,
  },
  category: {
    type: [Schema.Types.ObjectId],
    ref: "Category",
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  url: {
    type: String,
    required: false,
  },
});

const Event = models?.Event || model("Event", EventSchema);

export { Event };
