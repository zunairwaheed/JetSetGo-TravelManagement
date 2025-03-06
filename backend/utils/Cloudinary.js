import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

<<<<<<< HEAD
dotenv.config(); // Ensure environment variables are loaded
=======
dotenv.config();
>>>>>>> cd83868 (Api's Integration)

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
<<<<<<< HEAD
    secure: true, // Ensure HTTPS upload
=======
    secure: true,
>>>>>>> cd83868 (Api's Integration)
});

export default cloudinary;
