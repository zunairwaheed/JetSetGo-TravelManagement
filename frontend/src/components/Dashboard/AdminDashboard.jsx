import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import useFetchAllTours from "../hooks/useFetchAllTours.js";
import useFetch from "../hooks/useFetch.js";


const URL = `${BASE_URL}/tours`;
const USER_URL = `${BASE_URL}/users`;
const DELETE_USER_URL = `${BASE_URL}/users`;

export function AdminTourManagement() {
    const { data: tours, error, loading } = useFetchAllTours(URL);
    const [selectedTour, setSelectedTour] = useState("");
    const [formData, setFormData] = useState({
        imgUrl: "",
        city: "",
        country: "",
        rating: "",
        price: "",
        charges: "",
        maxGroupSize: "",
        featured: false,
        desc: "",
        date: "",
    });

    const handleSelectTour = (id) => {
        setSelectedTour(id);
        const tour = tours.find((t) => t._id === id);
        if (tour) setFormData(tour);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = selectedTour ? "PUT" : "POST";
        const endpoint = selectedTour ? `${URL}/${selectedTour}` : URL;

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to save tour");

            alert(`Tour ${selectedTour ? "updated" : "created"} successfully!`);
            window.location.reload();
        } catch (error) {
            console.error("Error saving tour:", error);
            alert(error.message);
        }
    };

    const handleDelete = async () => {
        if (!selectedTour) return;
        try {
            const response = await fetch(`${URL}/${selectedTour}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (!response.ok) throw new Error("Failed to delete tour");
            alert("Tour deleted successfully!");
            setSelectedTour("");
        } catch (error) {
            console.error("Error deleting tour:", error);
            alert(error.message);
        }
    };

    return (
        <>
            <div className="my-5">
                <div className="py-3">
                    <h1 className="text-center font-bold text-xl lg:text-3xl">ADM<span className="text-main">IN DASH</span>BOARD</h1>
                </div>
                <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-5">
                    <h1 className="text-xl lg:text-2xl font-bold mb-4">Tour Management</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    <select
                        className="w-full p-2 border rounded mb-4"
                        onChange={(e) => handleSelectTour(e.target.value)}
                        value={selectedTour}
                    >
                        <option value="">Select a Tour</option>
                        {tours.map((tour) => (
                            <option key={tour._id} value={tour._id}>
                                {tour.city} - {tour.country}
                            </option>
                        ))}
                    </select>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full p-2 border rounded" />
                        <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="w-full p-2 border rounded" />
                        <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" className="w-full p-2 border rounded" />
                        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" />
                        <input type="number" name="charges" value={formData.charges} onChange={handleChange} placeholder="Charges" className="w-full p-2 border rounded" />
                        <input type="number" name="maxGroupSize" value={formData.maxGroupSize} onChange={handleChange} placeholder="Max Group Size" className="w-full p-2 border rounded" />
                        <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" />
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                            <span>Featured</span>
                        </label>

                        <div className="flex space-x-2">
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition">
                                {selectedTour ? "Update" : "Create"}
                            </button>
                            {selectedTour && (
                                <button type="button" onClick={handleDelete} className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600 transition">
                                    Delete
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export function AdminUserManagement() {
    const { data: users = [], error, loading } = useFetch(USER_URL);
    const [selectedUser, setSelectedUser] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    console.log("Fetched Users:", users);
    console.log("Error:", error);
    console.log("Loading:", loading);

    const handleSelectUser = (id) => {
        setSelectedUser(id);
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) {
            alert("Please select a user to delete");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`${DELETE_USER_URL}/${selectedUser}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

            const result = await response.json();
            if (response.ok) {
                alert("User deleted successfully");
                window.location.reload();
            } else {
                alert(result.message || "Failed to delete user");
            }
        } catch (error) {
            alert("Error deleting user");
            console.error("Delete Error:", error);
        }
        setIsDeleting(false);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-5">
            <h1 className="text-xl lg:text-2xl font-bold mb-4">User Management</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <select
                className="w-full p-2 border rounded mb-4"
                onChange={(e) => handleSelectUser(e.target.value)}
                value={selectedUser}
            >
                <option value="">Select a User</option>
                {users.length > 0 ? (
                    users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.username} - {user.email} - {user.role}
                        </option>
                    ))
                ) : (
                    <option disabled>No users available</option>
                )}
            </select>

            <button
                onClick={handleDeleteUser}
                className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={!selectedUser || isDeleting}
            >
                {isDeleting ? "Deleting..." : "Delete User"}
            </button>
        </div>
    );
}

export const AdminGalleryManagement = () => {
    const [gallery, setGallery] = useState(false);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [deletingImageId, setDeletingImageId] = useState(null);
    const [uploadMessage, setUploadMessage] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");

    useEffect(() => {
        const fetchGalleryImages = async () => {
            try {
                const response = await fetch(`${BASE_URL}/gallery`);
                if (!response.ok) {
                    throw new Error("Failed to fetch images");
                }
                const data = await response.json();
                setImages(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryImages();
    }, []);

    const toggleGallery = () => {
        setGallery((prev) => !prev);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setUploadMessage("Please select an image first.");
            return;
        }

        setUploading(true);
        setUploadMessage("");

        const formData = new FormData();
        formData.append("galleryImage", file);

        try {
            const response = await fetch(`${BASE_URL}/gallery/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Upload failed");

            setUploadMessage("Image uploaded successfully!");

            const updatedResponse = await fetch(`${BASE_URL}/gallery`);
            const updatedData = await updatedResponse.json();
            setImages(updatedData.data);
        } catch (error) {
            setUploadMessage(error.message);
        } finally {
            setUploading(false);
            setTimeout(() => setUploadMessage(""), 3000);
        }
    };


    const handleDelete = async (id) => {
        setDeletingImageId(id);
        setDeleteMessage("");

        const confirmDelete = window.confirm("Are you sure you want to delete this Image?");
        if (!confirmDelete) return;
        try {
            const response = await fetch(`${BASE_URL}/gallery/delete/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Delete failed");

            setDeleteMessage("Image deleted successfully!");
            setImages(images.filter((image) => image._id !== id));
        } catch (error) {
            setDeleteMessage(error.message);
        } finally {
            setDeletingImageId(null);
            setTimeout(() => setDeleteMessage(""), 3000);
        }
    };

    return (

        <>
            <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-5">
                <h1 className="text-xl lg:text-2xl font-bold mb-4">Gallery Management</h1>
                <div className="flex justify-center mb-3">
                    <button onClick={toggleGallery} className="px-3 py-1 bg-main text-white font-bold rounded lg:hidden">
                        {gallery ? "Hide Gallery" : "Visit Gallery"}
                    </button>
                </div>

                {loading && <p className="text-center">Loading images...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {gallery && (
                    <div className="block lg:hidden">
                        <div className="grid gap-3 sm:grid-cols-3">
                            {images.map((image) => (
                                <div key={image._id} className="rounded-lg relative group">
                                <img src={image.imgUrl} alt={image.title || "Gallery Image"} className="w-full h-auto object-cover rounded-lg shadow-md hover:scale-110 duration-300" />
                                <button onClick={() => handleDelete(image._id)} className="absolute top-2 right-2 bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 sm:px-3 sm:py-1 rounded-lg opacity-90 hover:opacity-100 transition-all" disabled={deletingImageId === image._id}>
                                    {deletingImageId === image._id ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                            ))}
                        </div>
                        <div className="flex flex-col my-10 items-center">
                            <form onSubmit={handleUpload} encType="multipart/form-data" className="flex flex-col items-center">
                                <input type="file" name="galleryImage" onChange={handleFileChange} />
                                <button className="bg-main w-26 lg:mt-3 xl:w-36 xl:text-xl xl:my-5 px-2 py-2 mt-3 rounded font-semibold text-base text-white active:bg-[#FEDCCC] active:text-main" type="submit" disabled={uploading}>
                                    {uploading ? "Uploading..." : "Upload"}
                                </button>
                            </form>
                            {uploadMessage && <p className="text-green-500 text-center mt-2">{uploadMessage}</p>}
                            {deleteMessage && <p className="text-red-500 text-center mt-2">{deleteMessage}</p>}
                        </div>

                    </div>

                )}

                <div className="hidden lg:block">
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-4">
                        {images.map((image) => (
                            <div key={image._id} className="rounded-lg relative group">
                                <img src={image.imgUrl} alt={image.title || "Gallery Image"} className="w-full h-auto object-cover rounded-lg shadow-md hover:scale-110 duration-300" />
                                <button onClick={() => handleDelete(image._id)} className="absolute top-2 right-2 bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 sm:px-3 sm:py-1 rounded-lg opacity-90 hover:opacity-100 transition-all" disabled={deletingImageId === image._id}>
                                    {deletingImageId === image._id ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col my-10 items-center">
                        <form onSubmit={handleUpload} encType="multipart/form-data" className="flex flex-col items-center">
                            <input type="file" name="galleryImage" onChange={handleFileChange} />
                            <button className="bg-main w-26 lg:mt-3 xl:w-36 xl:text-xl xl:my-5 px-2 py-2 mt-3 rounded font-semibold text-base text-white active:bg-[#FEDCCC] active:text-main" type="submit" disabled={uploading}>
                                {uploading ? "Uploading..." : "Upload"}
                            </button>
                        </form>
                        {uploadMessage && <p className="text-green-500 text-center mt-2">{uploadMessage}</p>}
                        {deleteMessage && <p className="text-red-500 text-center mt-2">{deleteMessage}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};


export const AdminBookingManagement = () => {
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
