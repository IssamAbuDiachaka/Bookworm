import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";

const authRouter = Router();

// register new user /api/auth/register
authRouter.post("/register", registerUser);

// login user
// authRouter.post("/login", loginUser);



export default authRouter;