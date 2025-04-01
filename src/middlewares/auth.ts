import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/types";
import { user, UserDB } from "../models/user";
import { createError } from "../utils/error";
import { UserRole } from "../config/env.config";
import { verifyJwtToken } from "../utils/jwt";
import { isValidObjectId } from "mongoose";

/**
 * Middleware to authenticate and authorize users based on their JWT token.
 *
 * @param onlyAdmin - A boolean flag indicating whether the middleware should restrict access to admin users only. Defaults to `false`.
 * @returns An Express middleware function that validates the user's JWT token, checks their verification status, and optionally enforces admin-only access.
 *
 * @throws {Error} 400 - If the request does not contain a valid Authorization header or the token is invalid.
 * @throws {Error} 404 - If the user associated with the token is not found in the database.
 * @throws {Error} 403 - If the user is not verified or if `onlyAdmin` is `true` and the user is not an admin.
 *
 * @example
 * // Apply the middleware to a route, allowing access to all verified users:
 * app.use('/api/resource', authMiddleware());
 *
 * @example
 * // Apply the middleware to a route, restricting access to admin users only:
 * app.use('/api/admin', authMiddleware(true));
 */
export function authMiddleware(onlyAdmin: boolean = false) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = verifyJwtToken(req.get("Authorization"));

      let user: user | null;
      if (id) {
        if (!isValidObjectId(id)) createError("Invalid user ID", 400);
        user = await UserDB.findById(id).select("+password");
        if (!user) createError("User not found", 404);
      } else createError("Bad Request", 400);
      if (!user.isVerified)
        createError("User is not verified, please contact support", 403);
      if (onlyAdmin && user.role !== UserRole.Admin)
        createError("Unauthorized", 403);
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };
}
