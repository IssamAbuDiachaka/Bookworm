import rateLimit, { Options} from "express-rate-limit";
// import { ipKeyGenerator } from "express-rate-limit/helpers";
import { Request } from "express";


// manual ip settin to avoid issues importin from express-rate-limit
// This function generates a safe IP key for rate limiting purposes.
function safeIpKeyGenerator(req: Request): string {
    let ip = req.ip || "";
    // Normalize IPv6-mapped IPv4 addresses
    if (ip.startsWith("::ffff:")) {
      ip = ip.substring(7);
    }
    // If IPv6 loopback (::1), map to IPv4 loopback
    if (ip === "::1") {
      ip = "127.0.0.1";
    }
    return ip;
  }

export const createRateLimiter = (options?: Partial<Options>) => {
  return rateLimit({
    windowMs: options?.windowMs || 60 * 1000,
    max: options?.max || 5,
    message: options?.message || { message: "Too many requests, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: options?.keyGenerator
  });
};

export const resendVerificationLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,                   // 3 attempts per 15 minutes
  message: { message: "Too many verification email requests. Please try again later." },
  keyGenerator: (req: Request) => {
    const ip = safeIpKeyGenerator(req); 
    const email = (req.body?.email || "").toLowerCase().trim();
    return `${ip}-${email}`;
  }
});
