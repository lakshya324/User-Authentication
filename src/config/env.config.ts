import dotenv from "dotenv";

dotenv.config();

// Server Config
export const port = process.env.PORT || 5000;
export const mongoDbUri = process.env.MONGODB_URI!;
export const nodeEnv = process.env.NODE_ENV || "development";

// JWT Config
export const secretKey = process.env.SECRET_KEY!;
export const tokenExpireTime = process.env.TOKEN_EXPIRE_TIME || "7d";
export const saltRounds = +process.env.SALT_ROUNDS!;

// Rate Limiting Config
export const ipExpireTime = +process.env.IP_EXPIRE_TIME!; // in mins
export const ipRateLimit = +process.env.IP_RATE_LIMIT!;

// OpenAI Config
export const openAiApiKey = process.env.OPENAI_API_KEY!;
export const openAiMessageLimit = +process.env.OPENAI_MESSAGE_FETCH_LIMIT!;
export const openAiAssistantId = process.env.OPENAI_ASSISTANT_ID!;
export type openAiRoles = "user" | "assistant";

// Redis Config
export const redisConfig = {
  username: process.env.REDIS_USERNAME!,
  password: process.env.REDIS_PASSWORD!,
  host: process.env.REDIS_HOST!,
  port: +process.env.REDIS_PORT!,
};

// Email Config
export const transporter = {
    service: process.env.EMAIL_SERVICE!,
    auth: {
      user: process.env.EMAIL!,
      pass: process.env.PASSWORD!,
    },
  };
export const emails = {
    organization: process.env.ORGANIZATION_EMAIL!,
    server_notify: process.env.SERVER_NOTIFY_EMAIL!.split(","),
    // support: process.env.SUPPORT_EMAIL!,
    // noReply: process.env.NO_REPLY_EMAIL!,
  };