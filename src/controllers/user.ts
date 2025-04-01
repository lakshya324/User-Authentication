import { NextFunction, Response } from "express";
import { AuthRequest, ResponsePayload } from "../types/types";
import { validationResult } from "express-validator";
import { UpdateExistingUser } from "../utils/user";
import { createError } from "../utils/error";
import { user, UserDB } from "../models/user";
import { userBody } from "../types/payload.types";

export async function getUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user!;

    const payload: ResponsePayload<userBody> = {
      success: true,
      message: "User details fetched successfully",
      timestamp: new Date().toISOString(),
      data: {
        user: user.data(true),
      },
    };
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      createError(`Validation Error! ${errors.array()[0].msg}`, 422);

    const user = req.user!;

    const { name, phone } = req.body;
    const updatedUser = await UpdateExistingUser(user.id, {
      name,
      phone,
    } as user);

    const payload: ResponsePayload<userBody> = {
      success: true,
      message: "User updated successfully",
      timestamp: new Date().toISOString(),
      data: {
        user: updatedUser.data(true),
      },
    };

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    if (!user) createError("User not found", 404);

    const deletedUser = await UserDB.findByIdAndDelete(user.id);
    if (!deletedUser) createError("Failed to delete user", 400);

    const payload: ResponsePayload<userBody> = {
      success: true,
      message: "User deleted successfully",
      timestamp: new Date().toISOString(),
      data: {
        user: deletedUser.data(true),
      },
    };
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}
