import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded
dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true, // Ensure HTTPS upload
    secure: true,
});

export default cloudinary;
