import React, { useState } from "react";
import { BASE_URL } from "../../utils/config";
import useFetchAllTours from "../hooks/useFetchAllTours.js";
import toast from "react-hot-toast";
import DeleteModal from "../Common/DeleteModal"; // Import the modal

const URL = `${BASE_URL}/tours`;

function TourManagement() {
    const { data: tours, error, loading } = useFetchAllTours(URL);
    const [selectedTour, setSelectedTour] = useState("");
    const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for modal

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to save tour");

            toast.success(`Tour ${selectedTour ? "updated" : "created"} successfully!`);
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            toast.error(error.message);
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

            toast.error("Tour deleted successfully!");
            setSelectedTour("");
            setIsDeleteModalOpen(false); // Close modal after deletion
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="my-5">
            <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-5">
                <h1 className="text-xl lg:text-2xl font-bold mb-4">Tour Management</h1>
                {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
                    </div>
                )}
                {error && <p className="text-red-500">{error}</p>}

                <label className="flex items-center mb-4 space-x-2">
                    <input
                        type="checkbox"
                        checked={showOnlyFeatured}
                        onChange={() => setShowOnlyFeatured(!showOnlyFeatured)}
                    />
                    <span>Show Only Featured Tours</span>
                </label>

                <select
                    className="w-full p-2 border rounded mb-4"
                    onChange={(e) => handleSelectTour(e.target.value)}
                    value={selectedTour}
                >
                    <option value="">Select a Tour</option>
                    {tours
                        .filter((tour) => !showOnlyFeatured || tour.featured)
                        .map((tour) => (
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
                    <input type="number" name="maxGroupSize" value={formData.maxGroupSize} onChange={handleChange} placeholder="Available Seats" className="w-full p-2 border rounded" />
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
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Delete Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                itemName={`${formData.city}, ${formData.country}`}
            />
        </div>
    );
}

export default TourManagement;