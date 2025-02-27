import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Gallery", gallerySchema);
