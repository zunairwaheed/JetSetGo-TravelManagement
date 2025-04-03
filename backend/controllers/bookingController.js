import Booking from "../models/Bookings.js";
import Tour from "../models/Tour.js";

export const updateBookingStatus = async (req, res) => {
    try {
        const { sessionId } = req.body;
        if (!sessionId) return res.status(400).json({ error: "Session ID is required" });


        const booking = await Booking.findOne({ stripeSessionId: sessionId });

        if (!booking) {
            console.error("Booking not found for sessionId:", sessionId);
            return res.status(404).json({ error: "Booking not found" });
        }

        booking.status = "paid";
        await booking.save();

        res.status(200).json({ message: "Booking status updated successfully" });

    } catch (error) {
        res.status(500).json({ error: "Failed to update booking status" });
    }
};



export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await Booking.deleteMany({ userId: id });
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User and related bookings deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// // Validate the date range
// if (new Date(dateFrom) >= new Date(dateTo)) {
//     return res.status(400).json({ success: false, message: "Invalid date range. 'From' date must be earlier than 'To' date." });
// }
export const createBooking = async (req, res) => {
    try {
        const { tourId, guestSize, dateFrom, dateTo } = req.body;
        

        // Find the tour
        const tour = await Tour.findById(tourId);
        if (!tour) {
            return res.status(404).json({ success: false, message: "Tour not found" });
        }

        // Check if there are enough available seats
        if (tour.maxGroupSize < guestSize) {
            return res.status(400).json({ success: false, message: "Not enough available seats" });
        }

        // Prepare booking data
        const newBookingData = { ...req.body };
        if (!newBookingData.stripeSessionId) {
            delete newBookingData.stripeSessionId;
        }

        // Create new booking
        const newBooking = new Booking(newBookingData);
        const savedBooking = await newBooking.save();

        // Decrease available seats
        tour.maxGroupSize -= guestSize;
        await tour.save();

        res.status(200).json({ success: true, message: "Your tour is booked!", data: savedBooking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};



export const getBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const userBookings = await Booking.find({ userId: id });

        if (userBookings.length > 0) {
            return res.status(200).json({
                success: true,
                message: "User bookings retrieved successfully",
                data: userBookings,
            });
        }

        const singleBooking = await Booking.findById(id);
        if (singleBooking) {
            return res.status(200).json({
                success: true,
                message: "Booking retrieved successfully",
                data: singleBooking,
            });
        }

        return res.status(404).json({ success: false, message: "No bookings found" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.find();
        res.status(200).json({ success: true, message: "Successful", data: books });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Delete a booking by ID
export const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        res.status(200).json({ success: true, message: "Booking deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const getBookingCount = async (req, res) => {
    try {
        const bookingCount = await Booking.estimatedDocumentCount()

        res.status(200).json({
            success: true,
            message: "Successfull",
            data: bookingCount,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Failed To Fetch",
        });
    }
}