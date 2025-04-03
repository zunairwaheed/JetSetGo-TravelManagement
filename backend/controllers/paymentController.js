import Stripe from "stripe";
import dotenv from "dotenv";
import Booking from "../models/Bookings.js";
import nodemailer from "nodemailer";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const createCheckoutSession = async (req, res) => {
    try {
        const { booking } = req.body;

        if (!booking || !booking._id) {
            throw new Error("Invalid booking data provided");
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            images: booking.image ? [booking.image] : [],
                            name: `Tour: ${booking.tourName.toUpperCase()}`,
                            description: `Booked by: ${booking.userName}\nPhone: ${booking.phone}\nEmail: ${booking.userEmail}`,
                        },
                        unit_amount: booking.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:5173/thankyou?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/settings`,
        });

        // Send Payment Confirmation Email
        const mailOptions = {
            from: `"JetSetGo Travels" <${process.env.EMAIL_USER}>`,
            to: booking.userEmail,
            subject: "Payment Confirmation - JetSetGo Travels",
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://res.cloudinary.com/dvoitkw0q/image/upload/v1742211370/gallery/1742211369048-logo-_2_c7ui9c.png" alt="JetSetGo Travels" style="max-width: 150px;">
        </div>
        
        <h2 style="color: #007BFF; text-align: center;">Your Booking is Confirmed! 🎉</h2>
        
        <p style="font-size: 16px; color: #333; text-align: center;">
            Hello <strong>${booking.userName}</strong>,<br> 
            Thank you for booking your trip with <strong>JetSetGo Travels</strong>! We are excited to have you onboard.
        </p>
        
        <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <h3 style="color: #007BFF; border-bottom: 2px solid #007BFF; padding-bottom: 5px;">Booking Details</h3>
            <p style="font-size: 16px; color: #555;">
                <strong>Tour Name:</strong> ${booking.tourName} <br>
                <strong>Guest(s):</strong> ${booking.guestSize} <br>
                <strong>Price:</strong> $${booking.price} <br>
                <strong>Phone Number:</strong> ${booking.phone} <br>
                <strong>Booking Date:</strong> ${new Date(booking.bookingAt).toLocaleDateString()} <br>
            </p>
        </div>
        
        <p style="font-size: 16px; color: #333; text-align: center; margin-top: 20px;">
            Your payment has been successfully processed. If you have any questions, feel free to reach out.
        </p>
        
        <div style="text-align: center; margin-top: 20px;">
            <a href="https://yourwebsite.com/my-bookings" 
               style="background-color: #007BFF; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; display: inline-block;">
               View My Booking
            </a>
        </div>

        <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
            If you need any assistance, contact us at 
            <a href="mailto:support@jetsetgo.com" style="color: #007BFF;">support@jetsetgo.com</a>.
        </p>
        
        <div style="text-align: center; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
            <p style="font-size: 14px; color: #777;">
                &copy; ${new Date().getFullYear()} JetSetGo Travels. All Rights Reserved.
            </p>
        </div>
    </div>`
        };

        await transporter.sendMail(mailOptions);
        
        // Update Booking with Stripe Session ID
        const updatedBooking = await Booking.findByIdAndUpdate(
            booking._id,
            { stripeSessionId: session.id },
            { new: true }
        );

        if (!updatedBooking) {
            throw new Error("Failed to update booking with Stripe session ID");
        }

        res.json({ id: session.id, url: session.url });
        
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: error.message || "Failed to create payment session" });
    }
};
