import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dvoitkw0q',
  api_key: '187525565483722',
  api_secret: '2bEfvxVkAD3zxMj_6nGXvCNLF0E' // Click 'View API Keys' above to copy your API secret
});


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: "http://localhost:5173",
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
app.use(cors(corsOptions));
app.use(cookieParser());
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "backend", "uploads")));

// Routes
app.use('/api/v1', routes);

// Start Server
app.listen(port, async () => {
  await connectDB();
  console.log(`Server listening on port ${port}`);
});
