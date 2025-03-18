import Stripe from "stripe";
import dotenv from "dotenv";
import Booking from "../models/Bookings.js";
// import nodemailer from "nodemailer"

// const 


dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
                            images: [booking.image],
                            name: `Tour: ${booking.tourName}`,
                            description: `Booked by: ${booking.userName}\nPhone: ${booking.phone}\nEmail: ${booking.userEmail}`,
                        },
                        unit_amount: booking.price * 100,
                    },
                    quantity: booking.guestSize,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:5173/thankyou?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/booking-failed`,
        });



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
        res.status(500).json({ error: error.message || "Failed to create payment session" });
    }
};
