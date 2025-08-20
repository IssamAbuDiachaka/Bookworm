export type UserRole = "student" | "lecturer" | "admin";

export interface User {
  name: string;
  email: string;
  role: UserRole;
  program: string;
  avatar?: string;
  isVerified: boolean;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
}
