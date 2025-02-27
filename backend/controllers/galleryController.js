import Gallery from "../models/Gallery.js";

// Upload Image Controller
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Construct the image URL
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        // Save to MongoDB
        const newImage = new Gallery({ imgUrl: imageUrl });
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

// Get All Images Controller
export const getImages = async (req, res) => {
    try {
        const images = await Gallery.find();
        res.status(200).json({ success: true, data: images });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch images", error: error.message });
    }
};
