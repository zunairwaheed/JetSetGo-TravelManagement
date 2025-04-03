import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        image: {
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
        price: {
            type: Number,
        },
        phone: {
            type: Number,
            required: true,
        },
        bookingFrom: {
            type: Date,
            required: true,
        },        
        // bookingTo: {
        //     type: Date,
        //     required: true,
        // },
        stripeSessionId: { 
            type: String, 
            unique: true, 
            sparse: true 
        },
        status: { 
            type: String, default: "pending" 
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingsSchema);