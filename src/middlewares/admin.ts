import { Response, NextFunction } from "express";
import { createError } from "../utils/error";
import { AuthRequest } from "../types/types";
import { UserRole } from "../config/env.config";

export function isAdminMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    if (!user) createError("User not found", 404);
    if (user.role !== UserRole.Admin) createError("Unauthorized", 403);
    next();
  } catch (err) {
    next(err);
  }
}
