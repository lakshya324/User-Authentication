import { StatusError } from "../types/types";

/**
 * This function is used to create an error with a status code.
 * @param message - error message
 * @param status - status code of the error
 * @returns never - throws Error with status code
 * @throws Error with status code
 * @example
 * createError("Error message", 404);
 * // Output: Error: Error message
 * // Status Code: 404
 */
export function createError(message: string, status: number) : never {
  const error = new Error(message) as StatusError;
  error.statusCode = status || 500;
  throw error;
}
