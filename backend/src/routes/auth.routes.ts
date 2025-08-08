import { Router } from "express";
import { loginUser, refreshAccessToken, registerUser } from "../controllers/auth.controller";

const authRouter = Router();

// register new user /api/auth/register
authRouter.post("/register", registerUser);


authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshAccessToken);



export default authRouter;