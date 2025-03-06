import express from "express";
import upload from "../utils/multerConfig.js";
<<<<<<< HEAD
import { uploadImage, getImages } from "../controllers/galleryController.js";

const router = express.Router();

// Upload Image Route
router.post("/upload", upload.single("image"), uploadImage);

// Get All Images Route
router.get("/", getImages);
=======
import { uploadImage, getImages, deleteImage } from "../controllers/galleryController.js";

const router = express.Router();

router.post("/upload", upload.single("galleryImage"), uploadImage);
router.get("/", getImages);
router.delete("/delete/:id", deleteImage);
>>>>>>> cd83868 (Api's Integration)

export default router;
