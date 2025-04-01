import dotenv from "dotenv";

dotenv.config();

// Server Config
export const port = process.env.PORT || 4000;
export const mongoDbUri = process.env.MONGODB_URI!;
export const nodeEnv = process.env.NODE_ENV || "development";

// JWT Config
export const secretKey = process.env.SECRET_KEY!;
export const tokenExpireTime = process.env.TOKEN_EXPIRE_TIME || "7d";
export const saltRounds = +process.env.SALT_ROUNDS!;

// Rate Limiting Config
export const ipExpireTime = +process.env.IP_EXPIRE_TIME!; // in mins
export const ipRateLimit = +process.env.IP_RATE_LIMIT!;

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

// User Config
export enum UserRole {
  User = "user",
  Admin = "admin",
}

// OTP Config
export const otpExpireTime = +process.env.OTP_EXPIRE_TIME! * 60; // in mins [convert to seconds]
export const otpLength = +process.env.OTP_LENGTH!; // in mins

// Pagination Config
export const pageLimit = process.env.PAGE_LIMIT ? +process.env.PAGE_LIMIT : 10;
