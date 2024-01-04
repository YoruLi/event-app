import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const cached = mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI was not provided");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "eventsApp",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
