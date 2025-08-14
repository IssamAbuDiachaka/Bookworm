import { Router } from "express";
import { loginUser, refreshAccessToken, registerUser, resendVerificationEmail, verifyUser } from "../controllers/auth.controller";
import { resendVerificationLimiter } from "src/middlewares/rateLimit.middleware";

const authRouter = Router();

// register new user /api/auth/register
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshAccessToken);
authRouter.get("/verify/:token", verifyUser);
authRouter.post("/resend-verification", resendVerificationLimiter, resendVerificationEmail);



export default authRouter;