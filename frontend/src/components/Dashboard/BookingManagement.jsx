import React, { useState } from "react";
import { BASE_URL } from "../../utils/config";
import toast from "react-hot-toast";
import DeleteModal from "../Common/DeleteModal.jsx";

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [userId, setUserId] = useState("");
    const [bookingId, setBookingId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAllBookings, setShowAllBookings] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const fetchAllBookings = async () => {
        if (showAllBookings) {
            setShowAllBookings(false);
            setBookings([]);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/bookings`, { credentials: "include" });
            if (!response.ok) throw new Error("Failed to fetch bookings");
            const result = await response.json();
            setBookings(result.data);
            setShowAllBookings(true);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchBookingsByUserId = async () => {
        if (!userId) return toast.warning("Please enter a User ID");
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/bookings/${userId}`, { credentials: "include" });
            if (!response.ok) throw new Error("No bookings found");
            const result = await response.json();
            setBookings(result.data);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchBookingById = async () => {
        if (!bookingId) return toast.warning("Please enter a Booking ID");
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, { credentials: "include" });
            if (!response.ok) throw new Error("Booking not found");
            const result = await response.json();
            setBookings([result.data]);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (booking) => {
        setSelectedBooking(booking);
        setModalOpen(true);
    };

    const deleteBooking = async () => {
        if (!selectedBooking) return;

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/bookings/${selectedBooking._id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to delete booking");

            setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== selectedBooking._id));
            toast.error("Booking deleted successfully!");
        } catch (err) {
            setError(err.message);
            toast.error("Failed to delete booking");
        } finally {
            setLoading(false);
            setModalOpen(false);
            setSelectedBooking(null);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-5">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-start">Booking Management</h1>
            {error && <p className="text-red-500">{error}</p>}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="p-2 border rounded w-full md:w-96"
                />
                <button onClick={fetchBookingsByUserId} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full md:w-auto">
                    Get User Bookings
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter Booking ID"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="p-2 border rounded w-full md:w-96"
                />
                <button onClick={fetchBookingById} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full md:w-auto">
                    Get Booking
                </button>
            </div>

            <button onClick={fetchAllBookings} className="bg-gray-500 text-white p-2 rounded w-full md:w-56 mb-4 hover:bg-gray-600">
                {showAllBookings ? "Hide All Bookings" : "View All Bookings"}
            </button>

            {bookings.length > 0 && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h2 className="text-xl font-semibold mb-2">Bookings</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bookings.map((booking) => (
                            <li key={booking._id} className="p-4 bg-white shadow-md rounded">
                                <p><strong>Tour:</strong> {booking.tourName}</p>
                                <p><strong>User:</strong> {booking.userName} ({booking.userEmail})</p>
                                <p><strong>Guests:</strong> {booking.guestSize} | <strong>Phone:</strong> {booking.phone}</p>
                                <p><strong>Booking Date:</strong> {new Date(booking.bookingAt).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                                <button
                                    onClick={() => handleDeleteClick(booking)}
                                    className="mt-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 w-full"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <DeleteModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={deleteBooking}
                itemName={selectedBooking?.tourName || "this booking"}
            />
        </div>
    );
};

export default BookingManagement;
