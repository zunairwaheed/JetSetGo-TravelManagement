import User from "../models/Tour.js";

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