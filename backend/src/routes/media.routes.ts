// src/routes/media.routes.ts
import { Router } from "express";
import  authenticateJWT  from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { uploadMedia, getMediaByProgram } from "../controllers/media.controller";
import { handleUpload } from "../middlewares/upload.middleware";

const router = Router();

// Upload route: authenticated students & lecturers can upload
router.post(
  "/upload",
  authenticateJWT,
  authorizeRoles("student", "lecturer"),
  handleUpload("file"),
  uploadMedia
);

// List by program (authenticated)
router.get("/program/:program", authenticateJWT, getMediaByProgram);

export default router;
