import mongoose from "mongoose";
import { mongoDbUri } from "./env.config";

/**
 * Establishes a connection to a MongoDB database using Mongoose.
 * 
 * @async
 * @function
 * @throws Will terminate the process with an exit code of 1 if the connection fails.
 * @example
 * // Call this function to connect to MongoDB
 * await connectToMongoDB();
 */
export async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoDbUri);
    console.log("\x1b[32m%s\x1b[0m", "Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
