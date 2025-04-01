import { defaultEmail } from "../template/default";
import { user } from "../../models/user";
import { otpExpireTime } from "../../config/env.config";

/**
 * Sends an OTP email to the user.
 * @param user - The user object containing user details.
 * @param otp - The OTP to be sent to the user.
 */
export async function sendOtpMail(user: user, otp: string): Promise<void> {
  const subject = "Your OTP for Verification";
  const body = `
    <p>Dear ${user.name || "User"},</p>
    <p>Your OTP for verification is: <strong>${otp}</strong></p>
    <p>This OTP is valid for ${Math.ceil(
      otpExpireTime / 60
    )} minutes. Please do not share it with anyone.</p>
    <p>Thank you,</p>
    <p>The User Authentication Team</p>
  `;
  await defaultEmail(user.email, subject, body);
}

/**
 * Sends a verification email to the user after successful verification.
 * @param user - The user object containing user details.
 */
export async function sendVerificationMail(user: user): Promise<void> {
  const subject = "Account Verified Successfully";
  const body = `
    <p>Dear ${user.name || "User"},</p>
    <p>Your account has been successfully verified.</p>
    <p>You can now log in and access all features.</p>
    <p>Thank you,</p>
    <p>The User Authentication Team</p>
  `;
  await defaultEmail(user.email, subject, body);
}

/**
 * Sends a login notification email to the user.
 * @param user - The user object containing user details.
 */
export async function sendLoginNotificationMail(user: user): Promise<void> {
  const subject = "Login Notification";
  const body = `
    <p>Dear ${user.name || "User"},</p>
    <p>Your account was logged in at ${new Date().toLocaleString()}.</p>
    <p>If this was not you, please contact support immediately.</p>
    <p>Thank you,</p>
    <p>The User Authentication Team</p>
  `;
  await defaultEmail(user.email, subject, body);
}
