import { createClient } from "redis";
import { redisConfig } from "./env.config";

const client = createClient({
  username: redisConfig.username,
  password: redisConfig.password,
  socket: {
    host: redisConfig.host,
    port: redisConfig.port,
  },
});

client.on("error", (err) => console.log("Redis Client Error:", err));

export default client;
