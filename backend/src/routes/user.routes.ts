import { Router } from "express";
import authenticateJWT from "../middlewares/auth.middleware";
import { handleUpload } from "../middlewares/upload.middleware";
import {
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
  changePassword,
} from "../controllers/user.controller";

// user crud operations via /api/user
const userRouter = Router();

userRouter.get("/profile", authenticateJWT, getUserProfile);
userRouter.put("/profile", authenticateJWT, updateUserProfile);
userRouter.put(
  "/avatar",
  authenticateJWT,
  handleUpload("avatar"),
  updateUserAvatar
);
userRouter.put("/password", authenticateJWT, changePassword);

export default userRouter;
