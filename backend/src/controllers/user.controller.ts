import { Request, Response } from 'express';
import {User} from '../models/user.model';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';
import { AuthenticatedRequest } from "../middlewares/auth.middleware";


export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const uploadHandler = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const userId = req.user?.id;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    //  Upload using utility
    const avatarUrl = await uploadToCloudinary(file.buffer, 'avatars');

    //  Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Avatar uploaded successfully',
      avatar: user.avatar,
    });
  } catch (err) {
    console.error('Upload avatar error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
