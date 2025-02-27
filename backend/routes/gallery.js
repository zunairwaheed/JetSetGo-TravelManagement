import express from "express";
import upload from "../utils/multerConfig.js";
import { uploadImage, getImages } from "../controllers/galleryController.js";

const router = express.Router();

// Upload Image Route
router.post("/upload", upload.single("image"), uploadImage);

// Get All Images Route
router.get("/", getImages);

export default router;
