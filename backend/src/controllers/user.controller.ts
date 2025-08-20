import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "@utils/uploadToCloudinary";

//  Get user profile
export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(req.user.id).select(
      "-password -verificationToken"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update user profile info
export const updateUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const { name, program } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (program) user.program = program;

    await user.save();

    return res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update avatar
export const updateUserAvatar = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const file = (req as any).file;
    if (!file || !file.buffer) {
      return res.status(400).json({ message: "No avatar uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Upload to Cloudinary
    const result = await uploadToCloudinary(file.buffer, "avatars");

    user.avatar = result.secure_url;
    await user.save();

    return res.json({ message: "Avatar updated", avatar: user.avatar });
  } catch (err) {
    console.error("Update avatar error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Change password
export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both old and new password are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
