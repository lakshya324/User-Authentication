import jwt, { JwtPayload } from "jsonwebtoken";
import { secretKey, tokenExpireTime } from "../config/env.config";
import { StatusError } from "../types/types";
import ms from "ms";
import { createError } from "./error";

/**
 * Generates a JWT token for the given user ID.
 *
 * @param id - The unique identifier of the user for whom the token is being generated.
 * @returns A string representing the generated JWT token prefixed with "Bearer ".
 * @throws Will throw an error if token generation fails.
 */
export function generateJwtToken(id: string): string {
    try {
        return "Bearer " + jwt.sign({ id }, secretKey, { expiresIn: tokenExpireTime as ms.StringValue });
    } catch (err) {
        createError("Error generating token", 500);
    }
}

/**
 * Verifies a JWT token from the provided authorization header.
 *
 * @param header - The authorization header containing the JWT token.
 *                 Typically in the format "Bearer <token>".
 * @returns The decoded JWT payload if the token is valid.
 * @throws {Error} If the header is undefined or the token is invalid.
 * @throws {StatusError} If the token verification fails, with a status code of 401.
 */
export function verifyJwtToken(header: string | undefined): JwtPayload {
    try {
        if (!header) {
            throw new Error("Not authenticated.");
        }

        const token = header.split(" ").pop();
        const decodedToken = jwt.verify(token || "", secretKey) as JwtPayload;

        if (!decodedToken) {
            throw new Error("Not authenticated.");
        }

        return decodedToken;
    } catch (err) {
        const error = new Error("Not authenticated.") as StatusError;
        error.statusCode = 401;
        throw error;
    }
}
