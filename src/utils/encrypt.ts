import bcrypt from "bcrypt";
import { saltRounds } from "../config/env.config";

/**
 * This function is used to hash the password.
 * @param password - password to be hashed
 * @returns string - hashed password
 * @example
 * encodePassword("password")
 * // returns "hashedPassword"
 */
export async function encodePassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

/**
 * This function is used to compare the password with the hashed password.
 * @param password - password to be compared
 * @param hashedPassword - hashed password to be compared
 * @returns boolean - true if the password matches the hashed password, false otherwise
 * @example
 * comparePasswords("password", "hashedPassword")
 * // returns true
 * @example
 * comparePasswords("password", "wrongHashedPassword")
 * // returns false
 * @example
 * comparePasswords("wrongPassword", "hashedPassword")
 * // returns false
 * @example
 * comparePasswords("wrongPassword", "wrongHashedPassword")
 * // returns false
 */
export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
