import { Request } from "express";
import { user } from "../models/user";

export interface AuthRequest extends Request {
  user?: user;
}

export interface ResponsePayload<T> {
  success: boolean;
  message: string;
  timestamp: string;
  data?: T;
}

export interface StatusError extends Error {
  statusCode?: number;
}
