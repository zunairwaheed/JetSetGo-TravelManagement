import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteModal from "../Common/DeleteModal.jsx";
import { FiUser, FiBook, FiTrash, FiEdit, FiDollarSign, FiLock } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import ChangePassword from "../../pages/changePassword.jsx";

const Settings = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("profile");
    const [isBookingDeleteModalOpen, setIsBookingDeleteModalOpen] = useState(false);
    const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);
    const [accountToDelete, setAccountToDelete] = useState(null);
    const [bookingsPerPage, setBookingsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(bookings.length / bookingsPerPage);
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?._id;

    useEffect(() => {
        if (activeTab === "profile") handleViewProfile();
        if (activeTab === "bookings") handleViewBookings();
    }, [activeTab]);

    const handleViewProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, { credentials: "include" });
            if (!response.ok) throw new Error("Failed to fetch user data");
            const result = await response.json();
            setUser(result.data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleViewBookings = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/bookings/${userId}`, { credentials: "include" });
            if (!response.ok) throw new Error("No Bookings Found");
            const result = await response.json();
            setBookings(result.data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
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

            if (!response.ok) throw new Error("Failed to update profile");
            const updatedUser = await response.json();
            localStorage.setItem("user", JSON.stringify(updatedUser.data));
            toast.success("Profile updated successfully!");
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        } catch (err) {
            setError(err.message);
            toast.error("Error updating profile!");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!userId) return toast.error("User not found");

        // if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to delete user");

            localStorage.removeItem("user");
            navigate("/");
            setTimeout(() => window.location.reload(), 1000);
            toast.success("Account deleted successfully!");
        } catch (err) {
            setError(err.message);
            toast.error("Error deleting account!");
        } finally {
            setLoading(false);
            window.location.reload()
            setIsAccountDeleteModalOpen(false);
        }
    };

    const deleteBooking = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/bookings/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to delete booking");

            setBookings(bookings.filter((booking) => booking._id !== id));
            toast.success("Booking deleted successfully!");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
            setIsBookingDeleteModalOpen(false);
        }
    };

    const handlePayNow = async (booking) => {
        try {
            const response = await fetch(`${BASE_URL}/payments/pay`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ booking }),
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to create Stripe session");
            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const updateBookingsPerPage = () => {
            if (window.innerWidth < 640) setBookingsPerPage(4);
            else if (window.innerWidth < 1024) setBookingsPerPage(6);
            else setBookingsPerPage(8);
        };

        updateBookingsPerPage();
        window.addEventListener("resize", updateBookingsPerPage);
        return () => window.removeEventListener("resize", updateBookingsPerPage);
    }, []);


    return (
        <div className="flex min-h-screen my-10">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6 hidden md:block">
                <h2 className="text-2xl font-bold mb-6">Settings</h2>
                <ul>
                    <li className={`p-3 cursor-pointer flex items-center gap-2 ${activeTab === "profile" ? "bg-gray-700" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("profile")}>
                        <FiUser /> My Profile
                    </li>
                    <li className={`p-3 cursor-pointer flex items-center gap-2 ${activeTab === "bookings" ? "bg-gray-700" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("bookings")}>
                        <FiBook /> My Bookings
                    </li>
                    <li className={`p-3 cursor-pointer flex items-center gap-2 ${activeTab === "change-password" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        onClick={() => setActiveTab("change-password")}>
                        <FiLock /> Change Password
                    </li>
                    <li className="p-3 cursor-pointer flex items-center gap-2 hover:bg-red-600 text-red-300"
                        onClick={() => {
                            setAccountToDelete(userId); // Set userId before opening modal
                            setIsAccountDeleteModalOpen(true);
                        }}>
                        <FiTrash /> Delete Account
                    </li>

                </ul>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
                {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
                    </div>)
                }
                {error && <div className="text-red-500">{error}</div>}

                {activeTab === "profile" && user && (
                    <form onSubmit={handleUpdateProfile} className="bg-white p-6 shadow-md rounded">
                        <h3 className="text-xl font-bold mb-4">Update Profile</h3>
                        <input type="text" name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="w-full p-2 border rounded mb-2" />
                        <input type="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="w-full p-2 border rounded mb-2" />
                        <input type="text" name="role" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} className="w-full p-2 border rounded mb-2" />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
                            <FiEdit className="inline-block mr-2" /> Update Profile
                        </button>
                    </form>
                )}


                {activeTab === "bookings" && (
                    <div>
                        <h3 className="text-xl font-bold pb-2">My Bookings</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {currentBookings.map((booking) => (
                                <div key={booking._id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                                    <p><strong>Tour:</strong> {booking.tourName}</p>
                                    <p><strong>Contact:</strong> {booking.phone}</p>
                                    <p><strong>People:</strong> {booking.guestSize}</p>
                                    <p><strong>Price:</strong> {booking.price} $</p>
                                    <p><strong>Date From:</strong> {new Date(booking.bookingFrom).toLocaleDateString()}</p>
                                    {/* <p><strong>Date To:</strong> {new Date(booking.bookingTo).toLocaleDateString()}</p> */}
                                    <p><strong>Status:</strong>
                                        <span className={`font-semibold ${booking.status === "pending" ? "text-red-500" : "text-green-500"} pl-1`}>
                                            {booking.status}
                                        </span>
                                    </p>
                                    <div className="flex gap-2 pt-3">
                                        <button
                                            onClick={() => handlePayNow(booking)}
                                            disabled={booking.status === "paid"}
                                            className={`flex items-center p-2 rounded ${booking.status === "paid"
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-green-500 text-white"
                                                }`}
                                        >
                                            <FiDollarSign />
                                            <span className="ml-1">Pay Now</span>
                                        </button>
                                        <button
                                            onClick={() => { setBookingToDelete(booking._id); setIsBookingDeleteModalOpen(true); }}
                                            className="bg-red-500 text-white p-2 rounded"
                                        >
                                            <FiTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Buttons */}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-main text-white disabled:bg-gray-400 rounded"
                            >
                                Prev
                            </button>
                            <span className="px-4 py-2 text-black">{`Page ${currentPage} of ${totalPages}`}</span>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-main text-white disabled:bg-gray-400 rounded"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}



                {activeTab === "change-password" && <ChangePassword />}



                {/* Booking Delete Modal */}
                <DeleteModal
                    isOpen={isBookingDeleteModalOpen}
                    onClose={() => setIsBookingDeleteModalOpen(false)}
                    onConfirm={() => deleteBooking(bookingToDelete)}
                    itemName="this booking"
                />

                {/* Account Delete Modal */}
                <DeleteModal
                    isOpen={isAccountDeleteModalOpen}
                    onClose={() => setIsAccountDeleteModalOpen(false)}
                    onConfirm={handleDeleteAccount}
                    itemName="this account"
                />


            </div>
            {/* Bottom Navigation for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around p-3 md:hidden">
                <Link className={`p-3 cursor-pointer flex items-center gap-2 ${activeTab === "profile" ? "bg-gray-700" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("profile")}><FaUserCheck /></Link>
                <Link className={`p-3 cursor-pointer flex items-center gap-2 ${activeTab === "bookings" ? "bg-gray-700" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("bookings")}><SlCalender /></Link>
                <Link className={`p-3 cursor-pointer flex items-center gap-2 ${activeTab === "change-password" ? "bg-gray-700" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("change-password")}><FiLock /></Link>
                <Link className="p-3 cursor-pointer flex items-center gap-2 hover:bg-red-600 text-red-300"
                    onClick={() => {
                        setAccountToDelete(userId);
                        setIsAccountDeleteModalOpen(true);
                    }}><FiTrash /></Link>
            </div>
        </div>
    );
};

export default Settings;
