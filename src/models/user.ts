import mongoose, { Schema, Document } from "mongoose";
import  { UserRole } from "../config/env.config";
import { Iuser } from "../types/user.types";

export interface user extends Document, Iuser {
  createdAt: Date;
  updatedAt: Date;

  //! Methods

  /**
   * Retrieves the data of the user.
   *
   * @param isUser - Optional flag to determine if the data should be tailored for a user.
   * @returns An object containing the user's data.
   */
  data(this: user, isUser?: boolean): object;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, unique: true, sparse: true, trim: true },
    password: { type: String, required: true, select: false, trim: true },
    role: { type: String, enum: UserRole, default: UserRole.User, trim: true },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

//! Methods
{
  UserSchema.methods.data = function (this: user, isUser?: boolean): object {
    const userData = this.toObject();
    delete userData.password;
    delete userData.createdAt;
    delete userData.updatedAt;
    delete userData.__v;
    if (!isUser) {
      delete userData.phone;
    }
    return userData;
  };
}

export const UserDB = mongoose.model<user>("User", UserSchema);
