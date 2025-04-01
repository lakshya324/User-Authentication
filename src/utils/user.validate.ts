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

/**
 * This function is used to check if the phone number is already taken.
 * @param phone - phone number to be checked
 * @returns boolean
 * @throws Error if any error occurs while fetching data from the database
 * @example
 * isPhoneExist("1234567890")
 * // returns true
 * @example
 * isPhoneExist("0987654321")
 * // returns false
 */
export async function isPhoneExist(phone: string): Promise<boolean> {
  try {
    return (await UserDB.findOne({ phone })) ? true : false;
  } catch (err) {
    createError("Error fetching data from the database", 500);
  }
}