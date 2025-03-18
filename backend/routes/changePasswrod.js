import express from "express";
import { changePassword } from "../controllers/userController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.put("/", protect, changePassword);

export default router;
