import { checkSchema } from "express-validator";
import * as UserDetails from "../../data/user.json";
import { isEmailExist } from "../utils/user.validate";
import { otpLength } from "../config/env.config";

export const signup = checkSchema({
    //* User Email [required]
    email: {
        in: ["body"],
        isString: {
            errorMessage: "Email should be a string",
        },
        trim: true,
        toLowerCase: true,
        matches: {
            options: new RegExp(UserDetails.validationPatterns.email.pattern),
            errorMessage: UserDetails.validationPatterns.email.message,
        },
        custom: {
            options: async (email) => {
                if (await isEmailExist(email)) {
                    return Promise.reject("Email already exists");
                }
                return Promise.resolve();
            },
        },
    },
    //* User Password [required]
    password: {
        in: ["body"],
        isString: {
          errorMessage: "Password should be a string",
        },
        trim: true,
        isLength: {
          errorMessage: `Password should be between ${UserDetails.textLengthLimits.password.minLength} and ${UserDetails.textLengthLimits.password.maxLength} chars long`,
          options: {
            min: UserDetails.textLengthLimits.password.minLength,
            max: UserDetails.textLengthLimits.password.maxLength,
          },
        },
      },
});

export const login = checkSchema({
    //* User Email [required]
    email: {
        in: ["body"],
        isString: {
            errorMessage: "Email should be a string",
        },
        trim: true,
        toLowerCase: true,
        matches: {
            options: new RegExp(UserDetails.validationPatterns.email.pattern),
            errorMessage: UserDetails.validationPatterns.email.message,
        },
        custom: {
            options: async (email) => {
                if (!await isEmailExist(email)) {
                    return Promise.reject("Email does not exist");
                }
                return Promise.resolve();
            },
        },
    },
    //* User Password [required]
    password: {
        in: ["body"],
        isString: {
          errorMessage: "Password should be a string",
        },
        trim: true,
        isLength: {
          errorMessage: `Password should be between ${UserDetails.textLengthLimits.password.minLength} and ${UserDetails.textLengthLimits.password.maxLength} chars long`,
          options: {
            min: UserDetails.textLengthLimits.password.minLength,
            max: UserDetails.textLengthLimits.password.maxLength,
          },
        },
      },
});
export const sendOtp = checkSchema({
    email: {
        in: ["body"],
        isString: {
            errorMessage: "Email should be a string",
        },
        trim: true,
        toLowerCase: true,
        matches: {
            options: new RegExp(UserDetails.validationPatterns.email.pattern),
            errorMessage: UserDetails.validationPatterns.email.message,
        },
        custom: {
            options: async (email) => {
                if (!(await isEmailExist(email))) {
                    return Promise.reject("Email does not exist");
                }
                return Promise.resolve();
            },
        },
    },
});

export const verifyOtp = checkSchema({
    email: {
        in: ["body"],
        isEmail: {
            errorMessage: "Invalid email format",
        },
        trim: true,
        toLowerCase: true,
        custom: {
            options: async (email) => {
                if (!(await isEmailExist(email))) {
                    return Promise.reject("Email does not exist");
                }
                return Promise.resolve();
            },
        },
    },
    otp: {
        in: ["body"],
        isString: {
            errorMessage: "OTP should be a string",
        },
        trim: true,
        notEmpty: {
            errorMessage: "OTP is required",
        },
        isAlphanumeric: {
            errorMessage: "OTP should be alphanumeric",
        },
        isLength: {
            errorMessage: `OTP should be exactly ${otpLength} characters long`,
            options: {
                min: otpLength,
                max: otpLength,
            },
        },
    },
});