import { Schema, model, Types, Document } from "mongoose";

export interface IMedia extends Document {
  _id: Types.ObjectId;
  uploader: Types.ObjectId; // reference to User
  program: string; // program tag
  title: string;
  description?: string;
  url: string;
  publicId?: string; // Cloudinary public_id
  mimeType: string;
  size: number;
  likes: Types.ObjectId[]; // user ids
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new Schema<IMedia>(
  {
    uploader: { type: Schema.Types.ObjectId, ref: "User", required: true },
    program: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    url: { type: String, required: true },
    publicId: { type: String },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    commentsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Media = model<IMedia>("Media", mediaSchema);
