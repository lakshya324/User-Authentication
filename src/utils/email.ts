import { UserDB } from "../models/user";
import { createError } from "./error";

/**
 * This function is used to check if the email is already taken.
 * @param email - email to be checked
 * @returns boolean
 * @throws Error if any error occurs while fetching data from the database
 * @example
 * verifyEmail("existing@gmail.com")
 * // returns true
 * @example
 * verifyEmail("new@gmail.com")
 * // returns false
 */
export async function isEmailExist(email: string): Promise<boolean> {
  try {
    return (await UserDB.findOne({ email })) ? true : false;
  } catch (err) {
    createError("Error fetching data from the database", 500);
  }
}
