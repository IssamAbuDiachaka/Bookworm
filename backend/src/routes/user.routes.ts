import { Router } from "express";
import authenticateJWT from "src/middlewares/auth.middleware";
import { authorizeRoles } from "src/middlewares/role.middleware";
import { getUserProfile, uploadHandler } from "@controllers/user.controller";

const router = Router();

router.get("/profile", authenticateJWT, getUserProfile);

router.post("/upload", authenticateJWT, authorizeRoles("student", "lecturer"), uploadHandler);


router.get(
  "/admin-dashboard",
  authenticateJWT,
  authorizeRoles("admin"), // must be admin
  (req, res) => {
    res.json({ message: "Admin access granted — list all users here" });
  }
);

export default router;
