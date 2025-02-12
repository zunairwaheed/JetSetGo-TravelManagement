import Bookings from "../models/Bookings.js"

export const createBooking = async (req, res) => {
    const newBooking = new Bookings(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({ success: true, message: "Your tour is Booked", data: savedBooking })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Bookings.findById(id);

        res.status(200).json({ success: true, message: "Successful", data: book })
    }
    catch (err) {
        res.status(404).json({ success: false, message: "Not Found" })
    }
}

export const getAllBooking = async (req, res) => {

    try {
        const books = await Bookings.find()

        res.status(200).json({ success: true, message: "Successful", data: books })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
} 
