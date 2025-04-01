import mongoose from "mongoose";
import { mongoDbUri } from "./env.config";

export async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoDbUri);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}