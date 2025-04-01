import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../config/env.config';
import { Iuser } from '../types/user.types';

export interface user extends Document, Iuser {
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: UserRole, default: UserRole.User },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const UserDB = mongoose.model<user>('User', UserSchema);
