import Gallery from "../models/Gallery.js";
<<<<<<< HEAD

// Upload Image Controller
=======
import cloudinary from "../utils/Cloudinary.js";
import fs from "fs";
import path from "path";

>>>>>>> cd83868 (Api's Integration)
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

<<<<<<< HEAD
        // Construct the image URL
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        // Save to MongoDB
        const newImage = new Gallery({ imgUrl: imageUrl });
=======
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "gallery",
            use_filename: true,
        });

        fs.unlinkSync(req.file.path);

        const newImage = new Gallery({ 
            imgUrl: result.secure_url,
            cloudinaryId: result.public_id
        });

>>>>>>> cd83868 (Api's Integration)
        await newImage.save();

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            data: newImage,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Image upload failed",
            error: error.message,
        });
    }
};

<<<<<<< HEAD
// Get All Images Controller
export const getImages = async (req, res) => {
    try {
        const images = await Gallery.find();
=======


export const getImages = async (req, res) => {
    try {
        const images = await Gallery.find({}, "imgUrl");
>>>>>>> cd83868 (Api's Integration)
        res.status(200).json({ success: true, data: images });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch images", error: error.message });
    }
};
<<<<<<< HEAD
=======

export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await Gallery.findById(id);
        if (!image) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }

        if (image.cloudinaryId) {
            const cloudinaryResponse = await cloudinary.uploader.destroy(image.cloudinaryId);
            if (cloudinaryResponse.result !== "ok") {
                return res.status(500).json({ success: false, message: "Failed to delete image from Cloudinary" });
            }
        }

        await Gallery.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting image", error: error.message });
    }
};

>>>>>>> cd83868 (Api's Integration)
