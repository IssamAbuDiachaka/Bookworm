import { Router } from "express";
import { loginUser, refreshAccessToken, registerUser, resendVerificationEmail, verifyUser } from "../controllers/auth.controller";
import { resendVerificationLimiter } from "src/middlewares/rateLimit.middleware";

const authRouter = Router();

// register new user /api/auth/register
authRouter.post("/register", registerUser);
authRouter.get("/verify-email/:token",  verifyUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshAccessToken);
authRouter.post("/resend-verification", resendVerificationLimiter, resendVerificationEmail);



export default authRouter;