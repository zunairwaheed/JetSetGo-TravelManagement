import express from "express"
import { changePassword, deleteUser, getAllUser, getSingleUser, getUserCount, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { protect } from "../controllers/authController.js";

const router = express.Router()

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getSingleUser);
router.get("/", verifyAdmin, getAllUser);
router.get("/search/getUserCount", getUserCount)
router.put("/change-password/:id", changePassword)

export default router