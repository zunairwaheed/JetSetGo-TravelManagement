import React from 'react'
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import useFetchAllTours from "../hooks/useFetchAllTours.js";
import useFetch from "../hooks/useFetch.js";

const URL = `${BASE_URL}/tours`;
const USER_URL = `${BASE_URL}/users`;
const DELETE_USER_URL = `${BASE_URL}/users`;

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [userId, setUserId] = useState("");
    const [bookingId, setBookingId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAllBookings, setShowAllBookings] = useState(false);

    // Fetch all bookings (toggle functionality)
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
        } finally {
            setLoading(false);
        }
    };

    // Fetch bookings by user ID
    const fetchBookingsByUserId = async () => {
        if (!userId) return alert("Please enter a User ID");
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/bookings/${userId}`, { credentials: "include" });
            if (!response.ok) throw new Error("No bookings found");
            const result = await response.json();
            setBookings(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch single booking by booking ID
    const fetchBookingById = async () => {
        if (!bookingId) return alert("Please enter a Booking ID");
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, { credentials: "include" });
            if (!response.ok) throw new Error("Booking not found");
            const result = await response.json();
            setBookings([result.data]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete booking
    const deleteBooking = async (id) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/bookings/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to delete booking");

            // Remove deleted booking from state
            setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-5">
            <h1 className="text-2xl font-bold mb-4">Booking Management</h1>
            {error && <p className="text-red-500">{error}</p>}
            {loading && <p>Loading...</p>}

            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <button onClick={fetchBookingsByUserId} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Get User Bookings</button>
            </div>

            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter Booking ID"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <button onClick={fetchBookingById} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Get Booking</button>
            </div>

            <button onClick={fetchAllBookings} className="bg-gray-500 text-white p-2 rounded w-full mb-4 hover:bg-gray-600">
                {showAllBookings ? "Hide All Bookings" : "View All Bookings"}
            </button>

            {/* Show bookings if available */}
            {bookings.length > 0 && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h2 className="text-xl font-semibold mb-2">Bookings</h2>
                    <ul className="list-disc pl-4">
                        {bookings.map((booking) => (
                            <li key={booking._id} className="mb-2">
                                <strong>Tour:</strong> {booking.tourName} <br />
                                <strong>User:</strong> {booking.userName} ({booking.userEmail}) <br />
                                <strong>Guests:</strong> {booking.guestSize} | <strong>Phone:</strong> {booking.phone} <br />
                                <strong>Booking Date:</strong> {new Date(booking.bookingAt).toLocaleDateString()}
                                <br />
                                <button
                                    onClick={() => deleteBooking(booking._id)}
                                    className="mt-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BookingManagement