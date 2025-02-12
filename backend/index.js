import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true
}

// MongoDB Connection Function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if connection fails
  }
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/v1', routes);

// Start Server
app.listen(port, async () => {
  await connectDB(corsOptions);
  console.log(`Server listening on port ${port}`);
});
