import Booking from "../models/Bookings.js";

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

// export const createBooking = async (req, res) => {
//     const newBooking = new Booking(req.body);

//     try {
//         const savedBooking = await newBooking.save();
//         res.status(200).json({ success: true, message: "Your tour is Booked", data: savedBooking });
//     } catch (err) {
//         console.error("Booking Creation Error:", err);
//         res.status(500).json({ success: false, message: err.message });
//     }
// };

export const createBooking = async (req, res) => {
    try {
        const newBookingData = { ...req.body };
        if (!newBookingData.stripeSessionId) {
            delete newBookingData.stripeSessionId;
        }

        const newBooking = new Booking(newBookingData);
        const savedBooking = await newBooking.save();

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