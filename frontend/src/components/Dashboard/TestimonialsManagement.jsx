import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import DeleteModal from "../Common/DeleteModal.jsx";

const TestimonialsAdmin = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({ name: "", city: "", testimonial: "" });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const testimonialsPerPage = 4;

    const API_URL = `${BASE_URL}/testimonials`;

    // Fetch testimonials
    const fetchTestimonials = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data.success) setTestimonials(data.data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    // Input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const method = editingId ? "PUT" : "POST";
        const url = editingId ? `${API_URL}/${editingId}` : API_URL;

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                fetchTestimonials();
                setFormData({ name: "", city: "", testimonial: "" });
                setEditingId(null);
            }
        } catch (error) {
            console.error("Error submitting testimonial:", error);
        } finally {
            setLoading(false);
        }
    };

    // Edit
    const handleEdit = (testimonial) => {
        setFormData({
            name: testimonial.name,
            city: testimonial.city,
            testimonial: testimonial.testimonial
        });
        setEditingId(testimonial._id);
    };

    // Delete
    const handleDelete = async () => {
        if (!selectedId) return;

        try {
            const response = await fetch(`${API_URL}/${selectedId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (data.success) fetchTestimonials();
        } catch (error) {
            console.error("Error deleting testimonial:", error);
        } finally {
            setModalOpen(false);
            setSelectedId(null);
        }
    };

    // Pagination Logic
    const indexOfLast = currentPage * testimonialsPerPage;
    const indexOfFirst = indexOfLast - testimonialsPerPage;
    const currentTestimonials = testimonials.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Manage Testimonials</h2>
            <div className="p-4 md:p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-5">
                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded mb-4">
                    <h1 className="text-sm md:text-base font-semibold py-1">Name:</h1>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <h1 className="text-sm md:text-base font-semibold py-1">City:</h1>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <h1 className="text-sm md:text-base font-semibold py-1">Review:</h1>
                    <textarea
                        name="testimonial"
                        placeholder="Testimonial"
                        value={formData.testimonial}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {editingId ? "Update Testimonial" : "Add Testimonial"}
                    </button>
                </form>

                {/* List */}
                <div className="space-y-4">
                    {currentTestimonials.map((testimonial) => (
                        <div key={testimonial._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{testimonial.name} ({testimonial.city})</p>
                                <p>{testimonial.testimonial}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEdit(testimonial)}
                                    className="bg-yellow-500 text-white px-3 py-1 my-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedId(testimonial._id);
                                        setModalOpen(true);
                                    }}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-1 mt-4 text-sm font-semibold">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-main text-white disabled:bg-gray-400 rounded"
                        >
                            Prev
                        </button>
                        <span className="px-1 md:px-4 py-2 text-black hidden md:block">{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-main text-white disabled:bg-gray-400 rounded"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Delete Modal */}
                <DeleteModal
                    isOpen={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedId(null);
                    }}
                    onConfirm={handleDelete}
                    itemName={"this testimonial"}
                />
            </div>
        </div>
    );
};

export default TestimonialsAdmin;
