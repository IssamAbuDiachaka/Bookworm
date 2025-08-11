import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;


export const generateAccessToken = (userId: string, role: string) => {
  if (!ACCESS_TOKEN_SECRET) throw new Error("JWT_SECRET not defined");
  return jwt.sign({ userId, role }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
  if (!REFRESH_TOKEN_SECRET) throw new Error("JWT_REFRESH_SECRET not defined");
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};