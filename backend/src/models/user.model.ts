import mongoose, { Schema, Document, Types } from "mongoose";

// User roles
export enum UserRole {
  STUDENT = "student",
  LECTURER = "lecturer",
  ADMIN = "admin",
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  program: string;
  avatar?: string;
  location?: {
    city?: string;
    country?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
  };
  isVerified?: boolean;
  verificationToken?: string | null;
  verificationTokenExpires?: Date | null;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STUDENT,
    },
    program: { type: String, required: true },
    avatar: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    verificationTokenExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
