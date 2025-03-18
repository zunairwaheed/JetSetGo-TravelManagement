import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Booking from "../models/Bookings.js";

export const updateUser = async (req, res) => {
    const id = req.params.id
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({
            success: true,
            message: "Successfully Updated",
            data: updatedUser,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to Created",
        });
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await Booking.deleteMany({ userId: id });
        await User.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Successfully Deleted",
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to Delete",
        });
    }
}

export const getSingleUser= async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        res.status(200).json({
            success: true,
            message: "Successfully",
            data: user,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({})

        res.status(200).json({
            success: true,
            message: "Successfull",
            data: users,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
}

export const getUserCount = async (req, res) => {
    try {
        const userCount = await User.estimatedDocumentCount()

        res.status(200).json({
            success: true,
            message: "Successfull",
            data: userCount,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Failed To Fetch",
        });
    }
}

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.params.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update password", error: error.message });
    }
};
