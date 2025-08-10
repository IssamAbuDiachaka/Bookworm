import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import mediaRoutes from "./media.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/media", mediaRoutes);


// router.use("/research", researchRoutes);
// router.use("/tuition", tuitionRoutes);

export default router;