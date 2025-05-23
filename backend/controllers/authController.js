import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const protect = async (req, res, next) => {
    console.log("Cookies Received:", req.cookies);  // ✅ Check received cookies

    let token = req.cookies.accessToken;
    console.log("Extracted Token:", token);  // ✅ Check if token is extracted

    if (!token) {
        console.log("❌ No token found in cookies!");
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded Token:", decoded);  // ✅ Verify token is decoded

        req.user = await User.findById(decoded.id).select("-password");
        console.log("User Authenticated:", req.user);  // ✅ Verify user is found

        next();
    } catch (error) {
        console.error("❌ JWT Verification Failed:", error);
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
};



export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use!" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({ username, email, password: hash });
        await newUser.save();

        res.status(200).json({ success: true, message: "Successfully Created" });

    } catch (err) {
        res.status(500).json({ message: err.message || "Failed to create user" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
        );

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });

        const { password: _, ...userData } = user._doc;
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: userData,
            role: user.role,
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        return res.status(500).json({ message: "Failed to login" });
    }
};
