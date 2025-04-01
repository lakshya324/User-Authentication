import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { user, UserDB } from "../models/user";
import { createError } from "../utils/error";
import { encodePassword, comparePasswords } from "../utils/encrypt";
import { generateJwtToken } from "../utils/jwt";
import redisClient from "../config/redis.config";
import {
  defaultEmail,
  defaultEmailToOrganization,
} from "../emails/template/default";
import { v4 as uuidv4 } from "uuid";
import { createNewUser } from "../utils/user";
import { createSaveAndSendOtp, verifyOtpAndMarkVerified } from "../utils/otp";
import { ResponsePayload } from "../types/types";
import { loginBody } from "../types/payload.types";
import { sendLoginNotificationMail } from "../emails/mail/user.mail";

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      createError(`Validation Error! ${errors.array()[0].msg}`, 422);

    const { email, password } = req.body;
    const newUser = await createNewUser({
      email,
      password,
      isVerified: false,
    } as user);

    await createSaveAndSendOtp(newUser);

    const payload: ResponsePayload<null> = {
      success: true,
      message:
        "Account created successfully. Please verify your email using the OTP sent.",
      timestamp: new Date().toISOString(),
    };

    res.status(201).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function verifyOtp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      createError(`Validation Error! ${errors.array()[0].msg}`, 422);

    const { email, otp } = req.body;
    const user = await UserDB.findOne({ email });
    if (!user) createError("User not found", 404);

    await verifyOtpAndMarkVerified(user, otp);

    const payload: ResponsePayload<null> = {
      success: true,
      message: "Account verified successfully.",
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      createError(`Validation Error! ${errors.array()[0].msg}`, 422);

    const { email, password } = req.body;

    const user = await UserDB.findOne({ email }).select("+password");
    if (!user) createError("Invalid email or password", 401);

    if (!user.isVerified)
      createError(
        "Account not verified. Please verify your email using the OTP sent.",
        403
      );

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) createError("Invalid email or password", 401);

    user.lastLogin = new Date();
    await user.save();

    const token = generateJwtToken(user.id);

    await sendLoginNotificationMail(user);

    const payload: ResponsePayload<loginBody> = {
      success: true,
      message: "Login successful",
      timestamp: new Date().toISOString(),
      data: { user: user.data(true), token },
    };

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function sendOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;

    const user = await UserDB.findOne({ email });
    if (!user) createError("User not found", 404);

    await createSaveAndSendOtp(user);

    const payload : ResponsePayload<null> = {
      success: true,
      message: "OTP sent successfully.",
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}
