import jwt, { SignOptions } from "jsonwebtoken";

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("JWT_SECRET and JWT_REFRESH_SECRET must be defined");
}

const accessOptions: SignOptions = { expiresIn: "15m", algorithm: "HS256" };
const refreshOptions: SignOptions = { expiresIn: "7d", algorithm: "HS256" };

export const generateAccessToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, JWT_SECRET, accessOptions);
};

export const generateRefreshToken = (userId: string, tokenVersion: number) => {
  return jwt.sign({ userId, tokenVersion }, JWT_REFRESH_SECRET, refreshOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};
