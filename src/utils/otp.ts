import { v4 as uuidv4 } from "uuid";
import redisClient from "../config/redis.config";
import { otpExpireTime, otpLength } from "../config/env.config";
import { createError } from "./error";
import { user } from "../models/user";
import { sendOtpMail, sendVerificationMail } from "../emails/mail/user.mail";

/**
 * Generates a new OTP.
 * @param length Length of the OTP to be generated.
 * @returns A string representing the generated OTP.
 */
export function createOtp(): string {
  return uuidv4().replace(/-/g, "").slice(0, otpLength);
}

/**
 * Creates an OTP, saves it in the Redis cache with an expiration time,
 * and sends it to the user's email address.
 *
 * @param user - The user object containing user details, including the `id`
 *               required to generate a unique OTP key.
 * @returns A promise that resolves to void.
 * @throws Will throw an error if an OTP already exists for the user or if
 *         there is an issue during the OTP creation, saving, or sending process.
 */
export async function createSaveAndSendOtp(user: user): Promise<void> {
  if (user.isVerified) createError("User already verified", 400);
  const key = `otp:${user.id}`;
  if (await redisClient.get(key))
    createError("An OTP already exists for this user", 400);
  const otp = createOtp();
  await redisClient.setEx(key, otpExpireTime, otp);
  await sendOtpMail(user, otp);
}

/**
 * Verifies the provided OTP for a user and marks the user as verified if the OTP is valid.
 *
 * This function retrieves the stored OTP for the user from the Redis cache and compares it
 * with the provided OTP. If the OTP matches, it deletes the OTP from the cache, updates the
 * user's verification status, saves the user, and sends a verification email. If the OTP is
 * invalid, it throws an error. Any unexpected errors during the process are caught and handled.
 *
 * @param user - The user object for whom the OTP verification is being performed.
 * @param otp - The OTP string provided by the user for verification.
 * @returns A promise that resolves when the OTP is successfully verified and the user is marked as verified.
 * @throws Will throw an error if the OTP is invalid or if there is an issue during the verification process.
 */
export async function verifyOtpAndMarkVerified(
  user: user,
  otp: string
): Promise<void> {
  const key = `otp:${user.id}`;
  const storedOtp = await redisClient.get(key);
  if (storedOtp && storedOtp === otp) {
    await redisClient.del(key);

    user.isVerified = true;
    await user.save();

    await sendVerificationMail(user);
    return;
  }
  createError("Invalid OTP", 401);
}
