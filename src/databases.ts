import { connectToMongoDB } from "./config/db.config";
import redisClient from "./config/redis.config";

const databases = async () => {
    await connectToMongoDB();
    console.log("\x1b[32m%s\x1b[0m", "Connected to MongoDB");
    await redisClient.connect();
    console.log("\x1b[32m%s\x1b[0m", "Connected to Redis");
};

export default databases;
