import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount)) {
            return res.status(400).json({ message: "Valid amount is required" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ message: "Payment processing failed", error });
    }
};
