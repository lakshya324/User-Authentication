import { checkSchema } from "express-validator";
import { isEmailExist, isPhoneExist } from "../utils/user.validate";
import { UserRole } from "../config/env.config";
import * as UserDetails from "../../data/user.json";

// Name - Optional (String)
// Phone - Optional (String - 10 digits)
// Password - Optional (String)
// Role - Optional (String)
export const updateUser = checkSchema({
  //* User Name [optional]
  name: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Message should be a string",
    },
    trim: true,
    isLength: {
      errorMessage: `Name should be between ${UserDetails.textLengthLimits.name.minLength} and ${UserDetails.textLengthLimits.name.maxLength} chars long`,
      options: {
        min: UserDetails.textLengthLimits.name.minLength,
        max: UserDetails.textLengthLimits.name.maxLength,
      },
    },
  },
  //* User Phone [optional]
  phone: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Phone should be a string",
    },
    trim: true,
    matches: {
      options: new RegExp(UserDetails.validationPatterns.phone.pattern),
      errorMessage: UserDetails.validationPatterns.phone.message,
    },
    custom: {
      options: async (phone) => {
        if (await isPhoneExist(phone)) {
          return Promise.reject("Phone already exists");
        }
        return Promise.resolve();
      },
    },
  },
  //* User Passward [optional]
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
  //* User Role [optional]
  role: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Role should be a string",
    },
    trim: true,
    isIn: {
      options: [Object.values(UserRole)],
      errorMessage: `Role should be one of the following values: ${Object.values(
        UserRole
      ).join(", ")}`,
    },
  },
});

// Name - Optional (String)
// Email - Required (Email)
// Phone - Optional (String - 10 digits)
// Password - Required (String)
// Role - Optional (String)
export const createUser = checkSchema({
  //* User Name [optional]
  name: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Message should be a string",
    },
    trim: true,
    isLength: {
      errorMessage: `Name should be between ${UserDetails.textLengthLimits.name.minLength} and ${UserDetails.textLengthLimits.name.maxLength} chars long`,
      options: {
        min: UserDetails.textLengthLimits.name.minLength,
        max: UserDetails.textLengthLimits.name.maxLength,
      },
    },
  },
  //* User Email
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
  //* User Phone [optional]
  phone: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Phone should be a string",
    },
    trim: true,
    matches: {
      options: new RegExp(UserDetails.validationPatterns.phone.pattern),
      errorMessage: UserDetails.validationPatterns.phone.message,
    },
    custom: {
      options: async (phone) => {
        if (await isPhoneExist(phone)) {
          return Promise.reject("Phone already exists");
        }
        return Promise.resolve();
      },
    },
  },
  //* User Passward [optional]
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
  //* User Role [optional]
  role: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Role should be a string",
    },
    trim: true,
    isIn: {
      options: [Object.values(UserRole)],
      errorMessage: `Role should be one of the following values: ${Object.values(
        UserRole
      ).join(", ")}`,
    },
  },
});