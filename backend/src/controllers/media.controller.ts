// src/controllers/media.controller.ts
import { Request, Response } from "express";
import uploadToCloudinary from "@utils/uploadToCloudinary";
import { Media } from "../models/media.model";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { Types } from "mongoose";

export const uploadMedia = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // multer places file buffer on req.file
    const file = (req as any).file; // typed as any because multer doesn't have express typings here
    if (!file || !file.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // optional metadata from body
    const { title = file.originalname, description = "", program } = req.body;
    if (!program) {
      return res.status(400).json({ message: "Program is required" });
    }

    // upload buffer to cloudinary
    const result = await uploadToCloudinary(file.buffer, `bookworm/${program}`);

    // Build media doc
    const mediaDoc = await Media.create({
      uploader: new Types.ObjectId(req.user.id),
      program,
      title,
      description,
      url: result.secure_url,
      publicId: result.public_id,
      mimeType: file.mimetype,
      size: file.size
    });

    return res.status(201).json({
      message: "Upload successful",
      media: {
        _id: mediaDoc._id,
        url: mediaDoc.url,
        title: mediaDoc.title,
        program: mediaDoc.program,
        mimeType: mediaDoc.mimeType,
        size: mediaDoc.size
      }
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Upload failed", error: (err as Error).message });
  }
};

// fetch media by program with simple pagination
export const getMediaByProgram = async (req: Request, res: Response) => {
  try {
    const { program } = req.params;
    const page = Math.max(parseInt(String(req.query.page || "1")), 1);
    const limit = Math.min(parseInt(String(req.query.limit || "20")), 100);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Media.find({ program }).sort({ createdAt: -1 }).skip(skip).limit(limit).select("-__v"),
      Media.countDocuments({ program })
    ]);

    return res.json({
      page,
      limit,
      total,
      items
    });
  } catch (err) {
    console.error("Get media error:", err);
    return res.status(500).json({ message: "Failed to fetch media" });
  }
};
