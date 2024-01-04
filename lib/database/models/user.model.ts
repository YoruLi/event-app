import { Schema, SchemaDefinition, model, models } from "mongoose";

const UserSchema = new Schema<SchemaDefinition>({
  clerkId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: { type: String, required: true, unique: true },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const User = models.User || model("User", UserSchema);

export { User };
