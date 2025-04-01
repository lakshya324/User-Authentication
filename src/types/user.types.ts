import { UserRole } from "../config/env.config";

export interface Iuser {
    name?: string;
    email: string;
    phone?: string;
    password?: string;
    role: UserRole;
    isVerified: boolean;
    lastLogin?: Date;
}