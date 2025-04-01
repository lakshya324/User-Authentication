import express from "express";
import * as controller from "../controllers/auth";
import * as validationSchema from "../validation/auth.schema";

const router = express.Router();

//* Signup [POST /auth/signup]
router.post(
    "/signup",
    validationSchema.auth,
    controller.signup
);

//* Verify OTP [POST /auth/otp/verify]
router.post(
    "/otp/verify",
    validationSchema.verifyOtp,
    controller.verifyOtp
);

//* Login [POST /auth/login]
router.post(
    "/login",
    validationSchema.auth,
    controller.login
);

//* Send OTP [POST /auth/otp/send]
router.post(
    "/otp/send",
    validationSchema.sendOtp,
    controller.sendOtp
);

export default router;
