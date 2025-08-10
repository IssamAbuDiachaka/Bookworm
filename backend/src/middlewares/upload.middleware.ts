import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { error } from 'console';

const storage = multer.memoryStorage(); // store in RAM, not disk. stream to Cloudinary immediately; 

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

// whitelist of mime types (images, pdfs, docs); add more as needed
const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    new Error("Unsupported file type")
  }
};

export const uploadSingle = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter
}).single("file"); // expecting field name "file"

export const handleUpload =
  (fieldName = "file") =>
  (req: Request, res: Response, next: NextFunction) => {
    const handler = multer({ storage, limits: { fileSize: MAX_FILE_SIZE_BYTES }, fileFilter }).single(fieldName);
    handler(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        // Multer-specific errors
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(400).json({ message: err.message || "File upload error" });
      }
      next();
    });
  };