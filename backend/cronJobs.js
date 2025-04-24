import cron from "node-cron";
import Tour from "./models/Tour.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


// Connect to DB if not connected
const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB already connected for cron job.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

const deleteExpiredTours = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.error("MongoDB is not connected. Cannot delete expired tours.");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const result = await Tour.deleteMany({ date: { $lt: today } });
    } catch (error) {
        console.error("Error deleting expired tours:", error);
    }
};

connectDB().then(() => {
    cron.schedule("* * * * *", () => {
        deleteExpiredTours();
    }, {
        timezone: "Asia/Karachi",
    });
});
