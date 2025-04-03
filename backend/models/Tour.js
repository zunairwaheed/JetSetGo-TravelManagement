import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
        unique: true,
    },
    country: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    charges: {
        type: Number,
        required: true,
    },
    maxGroupSize: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Tour", tourSchema);
