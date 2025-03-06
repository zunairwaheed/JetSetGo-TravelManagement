import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    profilePic: {
        type: String,
        default: "login.jpeg",
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);