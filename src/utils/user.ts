import { isValidObjectId } from "mongoose";
import { user, UserDB } from "../models/user";
import { isEmailExist } from "./email";
import { encodePassword } from "./encrypt";
import { createError } from "./error";

/**
 * Asynchronously creates a new user in the database.
 *
 * @param user - The user object containing user details to be created.
 * @returns A promise that resolves to the newly created user object.
 * @throws Will throw an error if user creation fails or if there is an issue during the process.
 *
 * @remarks
 * - If a password is provided in the user object, it will be encoded before saving.
 * - The function currently has commented-out logic for checking if the email already exists.
 * - Errors are handled by throwing custom errors with appropriate status codes.
 */
export async function createNewUser(user: user) {
  try {
    // if (user.email && await isEmailExist(user.email))
    //   createError("Email already exists", 400);
    if (user.password) user.password = await encodePassword(user.password);
    const newUser = await UserDB.create(user);
    if (!newUser) createError("Failed to create user", 400);
    return newUser;
  } catch (error) {
    createError("Error creating user", 500);
  }
}

/**
 * Updates an existing user in the database with the provided data.
 *
 * @param id - The unique identifier of the user to update.
 * @param userData - A partial object containing the user properties to update.
 *                    If `password` is provided, it will be hashed before updating.
 * @returns A promise that resolves to the updated user object.
 *
 * @throws Will throw an error if the provided `id` is invalid.
 * @throws Will throw an error if the user cannot be updated.
 * @throws Will throw an error if there is an issue during the update process.
 */
export async function UpdateExistingUser(
  id: string,
  userData: Partial<user>
): Promise<user> {
  try {
    if (!isValidObjectId(id)) createError("Invalid user ID", 400);
    if (userData.password)
      userData.password = await encodePassword(userData.password);
    const updatedUser = await UserDB.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!updatedUser) createError("Failed to update user", 400);
    return updatedUser;
  } catch (error) {
    createError("Error updating user", 500);
  }
}