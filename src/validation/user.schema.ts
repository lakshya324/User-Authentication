import { checkSchema } from "express-validator";
import { isEmailExist } from "../utils/email";
import * as UserDetails from "../../data/user.json";

// Name - Optional (String)
// Email - Required (Email)
// Phone - Optional (String - 10 digits)
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
  },
});
