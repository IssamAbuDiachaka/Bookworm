import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import mediaRoutes from "./media.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/media", mediaRoutes);

export default router;
