import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Check if password and confirmPassword match
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

        //hashing Password
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
    const email = req.body.email
    try {
        const user = await User.findOne({ email })
        //if user not exist
        if (!user) {
            return res.status(404).json({ success: false, message: "User not Found" })
        }

        //if user exist check and compare password
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: "Incorect Email or Password" });

        }
        const { password: _, role, ...rest } = user._doc;

        //create jwt token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
        );

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn,
        }).status(200).json({ token, data: { ...rest }, role })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Failed to Login" })
    }
};
