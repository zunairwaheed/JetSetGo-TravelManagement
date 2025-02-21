import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match!",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use!",
            });
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username: username,
            email: email,
            password: hash,
        })
        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Successfully Created"
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: ("Failed to Create", err.message)
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 2. Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Incorrect email or password" });
        }

        // 3. Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
        );

        console.log("Generated Token:", token); // Debugging

        // 4. Set Cookie
        res.cookie("accessToken", token, {
            httpOnly: true, 
            secure: false, // Change to true in production with HTTPS
            sameSite: "Lax",
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });

        console.log("Cookie Set Successfully"); // Debugging

        // 5. Send Response
        const { password: _, ...userData } = user._doc;
        res.status(200).json({
            success: true,
            message: "Login successful",
            token, // Optional: remove if only using cookie
            data: userData,
            role: user.role,
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        return res.status(500).json({ success: false, message: "Failed to login" });
    }
};

