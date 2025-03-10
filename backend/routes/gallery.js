import express from "express";
import upload from "../utils/multerConfig.js";
import { uploadImage, getImages, deleteImage } from "../controllers/galleryController.js";

const router = express.Router();

// Upload Image Route
router.post("/upload", upload.single("galleryImage"), uploadImage);

// Get All Images Route
router.get("/", getImages);

router.delete("/delete/:id", deleteImage);

export default router;
