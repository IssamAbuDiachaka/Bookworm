import { Router } from "express";
import  authenticateJWT  from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/profile",
  authenticateJWT, // must be logged in
  (req, res) => {
    res.json({ message: "This is your profile", user: req.user });
  }
);

router.get(
  "/admin-dashboard",
  authenticateJWT,
  authorizeRoles("admin"), // must be admin
  (req, res) => {
    res.json({ message: "Welcome, admin!" });
  }
);

export default router;
