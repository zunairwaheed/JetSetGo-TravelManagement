import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true,
    },
<<<<<<< HEAD
=======
    cloudinaryId: {
        type: String,
        required: true,
    },
>>>>>>> cd83868 (Api's Integration)
}, { timestamps: true });

export default mongoose.model("Gallery", gallerySchema);
