import multer from "multer";
import path from "path";
import fs from "fs";
<<<<<<< HEAD

// Ensure the correct uploads directory exists
const uploadDir = path.join("backend", "uploads");
=======
import crypto from "crypto"

export const uploadDir = "uploads";
>>>>>>> cd83868 (Api's Integration)
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

<<<<<<< HEAD
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
=======
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    // filename: (req, file, cb) => {
    //     cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
    // },
    filename: (req, file, cb) => {
        crypto.randomBytes(12, function (err, name) {
            const fn = name.toString("hex") + path.extname(file.originalname)
            cb(null, fn)
        })
    },
});

>>>>>>> cd83868 (Api's Integration)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

<<<<<<< HEAD
// Multer Upload
const upload = multer({ storage, fileFilter });
=======
const upload = multer({
    storage, fileFilter, limits: {
        fileSize: 10 * 1024 * 1024, // **10MB file size limit**
    }
});
>>>>>>> cd83868 (Api's Integration)

export default upload;
