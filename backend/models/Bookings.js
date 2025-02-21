import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        userEmail: {
            type: String,
        },
        tourName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        guestSize: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        bookingAt: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingsSchema);