// src/routes/index.ts
import { Router } from "express";
import authRoutes from "./auth.routes";
// import other route files as created

const router = Router();

router.use("/auth", authRoutes);
// router.use("/user", userRoutes); // future
// router.use("/media", mediaRoutes); // future

export default router;
