import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the correct uploads directory exists
const uploadDir = path.join("backend", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // ✅ Fix: Ensure files are stored in backend/uploads
    },
    filename: (req, file, cb) => {
        const cleanFileName = file.originalname.replace(/\s+/g, "-"); // Replace spaces with hyphens
        cb(null, `${Date.now()}-${cleanFileName}`);
    }
});

// File Filter (Optional)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

// Multer Upload
const upload = multer({ storage, fileFilter });

export default upload;
