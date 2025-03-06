import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    avatar: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    testimonial: {
        type: String,
        require: true
    },
}, { timestamps: true });

export default mongoose.model("Testimonials", testimonialSchema);
