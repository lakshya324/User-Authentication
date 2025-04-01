import express, { Router, Request, Response, NextFunction } from "express";
import { AuthRequest, ResponsePayload, StatusError } from "./types/types";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import { createError } from "./utils/error";

const router: Router = express.Router();

//! Log Middleware
router.use((req: AuthRequest, res: Response, next: NextFunction) => {
  console.log("\x1b[33m%s\x1b[0m", `API > ${req.method} ${req.url}`);
  next();
});

//! Routes

//* Auth Routes
router.use("/auth", authRoutes);

//* User Routes
router.use("/user", userRoutes);

//! 404 Middleware
router.use((req: Request, res: Response, next: NextFunction) => {
  next(createError("Not Found", 404));
});

//! Error Handling Middleware
router.use(
  (error: StatusError, req: AuthRequest, res: Response, next: NextFunction) => {
    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    const payload: ResponsePayload<null> = {
      success: false,
      message: message,
      timestamp: new Date().toISOString(),
    };
    res.status(status).json(payload);
  }
);

export default router;
