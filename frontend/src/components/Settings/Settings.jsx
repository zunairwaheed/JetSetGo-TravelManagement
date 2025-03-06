import React, { useState } from "react";
import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?._id;

    // Fetch user data
    const handleViewProfile = async () => {
        if (user) {
            setUser();
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, {
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to fetch user data");
            const result = await response.json();
            setUser(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch user bookings
    const handleViewBookings = async () => {
        if (bookings.length > 0) {
            // If bookings are already shown, hide them
            setBookings([]);
            return;
        }

        if (!userId) return alert("Please enter a User ID");
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/bookings/${userId}`,
            { credentials: "include" });
            if (!response.ok) throw new Error("No bookings found");
            const result = await response.json();
            setBookings(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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


    // Handle form input change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Update user data
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to update user");
            const updatedUser = await response.json();
            localStorage.setItem("user", JSON.stringify(updatedUser.data));
            alert("Profile updated successfully!");
            window.location.reload();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete user account
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your account?")) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to delete user");

            localStorage.removeItem("user");
            alert("Account deleted successfully!");
            navigate("/");
            window.location.reload();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>

            {error && <p className="text-red-500">{error}</p>}
            {loading && <p>Loading...</p>}

            {/* View Profile Button */}
            <button onClick={handleViewProfile} className="bg-gray-500 text-white p-2 rounded w-full mb-4 hover:bg-gray-600 transition">
                {user ? "Hide Profile" : "View My Profile"}
            </button>

            {/* Show user details if available */}
            {user && (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        placeholder="Role"
                        className="w-full p-2 border rounded"
                    />

                    {/* Update Profile Button */}
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition">
                        Update Profile
                    </button>
                </form>
            )}

            {/* View Bookings Button */}
            <button
                onClick={handleViewBookings}
                className="bg-green-500 text-white p-2 rounded w-full mt-4 hover:bg-green-600 transition"
            >
                {bookings.length > 0 ? "Hide My Bookings" : "View My Bookings"}
            </button>


            {/* Show user bookings */}
            {bookings.length > 0 && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h2 className="text-xl font-semibold mb-2">My Bookings</h2>
                    <ul className="space-y-4">
                        {bookings.map((booking) => (
                            <li key={booking._id} className="p-4 border rounded bg-white shadow">
                                <p><strong>Id:</strong> {booking._id}</p>
                                <p><strong>Tour:</strong> {booking.tourName}</p>
                                <p><strong>User:</strong> {booking.userName} ({booking.userEmail})</p>
                                <p><strong>Guests:</strong> {booking.guestSize}</p>
                                <p><strong>Phone:</strong> {booking.phone}</p>
                                <p><strong>Booking Date:</strong> {new Date(booking.bookingAt).toLocaleDateString()}</p>
                                <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
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


            {/* Delete Account Button */}
            <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded w-full mt-4 hover:bg-red-600 transition">
                Delete Account
            </button>
        </div>
    );
};

export default Settings;
