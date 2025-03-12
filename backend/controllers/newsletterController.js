import nodemailer from "nodemailer";

export const subscribeNewsletter = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const mailOptions = {
            from: `"JetSetGo Travels" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Newsletter Subscription Confirmation",
            html: `<h2>Thank you for subscribing!</h2><p>You are now subscribed to our newsletter.</p>`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Subscription successful! Confirmation email sent." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
