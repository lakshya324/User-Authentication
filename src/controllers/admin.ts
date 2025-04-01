import { NextFunction, Response } from "express";
import { user, UserDB } from "../models/user";
import { pageLimit } from "../config/env.config";
import { createError } from "../utils/error";
import { AuthRequest, ResponsePayload } from "../types/types";
import { adminBody } from "../types/payload.types";
import { isValidObjectId } from "mongoose";
import { validationResult } from "express-validator";
import { createNewUser, UpdateExistingUser } from "../utils/user";

export async function getUsers(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = pageLimit;
    const skip = (page - 1) * limit;
    if (page < 1) createError("Invalid page number", 400);

    const totalUsers = await UserDB.countDocuments();

    const totalPages = Math.ceil(totalUsers / limit);
    if (page > totalPages) createError("Page not found", 404);

    const users = await UserDB.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const payload: ResponsePayload<adminBody> = {
      success: true,
      message: "Users fetched successfully",
      timestamp: new Date().toISOString(),
      data: {
        users: users.filter((user) => user).map((user) => user.data(true)),
        pagination: {
          totalUsers,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
    };
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) createError("Invalid user ID", 400);
    const user = await UserDB.findById(id);
    if (!user) createError("User not found", 404);

    const payload: ResponsePayload<adminBody> = {
      success: true,
      message: "User fetched successfully",
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

export async function createUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      createError(`Validation Error! ${errors.array()[0].msg}`, 422);

    const { name, email, phone, password, role } = req.body;
    const newUser = await createNewUser({
      name,
      email,
      phone,
      password,
      role,
    } as user);
    const payload: ResponsePayload<adminBody> = {
      success: true,
      message: "User created successfully",
      timestamp: new Date().toISOString(),
      data: {
        user: newUser.data(true),
      },
    };
    res.status(201).json(payload);
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

    const { id } = req.params;
    const { name, email, phone, password, role } = req.body;
    const updatedUser = await UpdateExistingUser(id, {
      name,
      email,
      phone,
      password,
      role,
    } as user);

    const payload: ResponsePayload<adminBody> = {
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
    const { id } = req.params;
    if (!isValidObjectId(id)) createError("Invalid user ID", 400);
    const deletedUser = await UserDB.findByIdAndDelete(id);
    if (!deletedUser) createError("Failed to delete user", 400);

    const payload: ResponsePayload<adminBody> = {
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
