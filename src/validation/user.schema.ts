import { checkSchema } from "express-validator";
import { isEmailExist, isPhoneExist } from "../utils/user.validate";
import * as UserDetails from "../../data/user.json";

// Name - Optional (String)
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
          return Promise.reject("Phone number already exists");
        }
        return Promise.resolve();
      },
    },
  },
});
