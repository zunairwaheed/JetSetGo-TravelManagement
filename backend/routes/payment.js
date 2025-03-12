import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent API
router.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        if (!amount) {
            return res.status(400).send({ error: "Amount is required" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: currency || "usd",  // ✅ Allows dynamic currency but defaults to USD
            payment_method_types: ["card"],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Stripe Payment Error:", error);
        res.status(500).send({ error: error.message });
    }
});

export default router;
