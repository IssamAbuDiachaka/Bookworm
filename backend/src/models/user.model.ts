import { Schema, model, Document, Types } from "mongoose";

// User roles
export enum UserRole {
  STUDENT = "student",
  LECTURER = "lecturer",
  ADMIN = "admin"
}


export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  program: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STUDENT,
    },
    program: { type: String, required: true },
    avatar: { type: String, default: "" }
  },
  {
    timestamps: true 
  }
);

export const User = model<IUser>("User", userSchema);