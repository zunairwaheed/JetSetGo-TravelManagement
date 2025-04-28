import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    // avatar: {
    //     type: String,
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    testimonial: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("Testimonials", testimonialSchema);
