import rateLimit, {Options} from "express-rate-limit";
import { Request } from "express";

export const createRateLimiter = (options?: Partial<Options>) => {
  return rateLimit({
    windowMs: options?.windowMs || 60 * 1000,
    max: options?.limit || 5,
    message: options?.message || { message: "Too many requests, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: options?.keyGenerator
  });
};

// Specific limiter for resend-verification
export const resendVerificationLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,                   // 3 attempts per 15 minutes
  message: { message: "Too many verification email requests. Please try again later." },
  keyGenerator: (req: Request) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown-ip";
    const email = (req.body?.email || "").toLowerCase().trim();
    return `${ip}-${email}`;
  }
});

