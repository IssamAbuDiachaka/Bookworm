import cloudinary from '../config/cloudinary.js';
import { UploadApiResponse } from 'cloudinary';

const uploadToCloudinary = (buffer: Buffer, folder = "bookworm_media"): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("No result from Cloudinary"));
        resolve(result);
      }
    );

    // stream the buffer
    const streamifier = require("streamifier");
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default uploadToCloudinary;
