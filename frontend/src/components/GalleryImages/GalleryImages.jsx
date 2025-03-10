import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config.js";

const GalleryImages = () => {
    const [gallery, setGallery] = useState(false);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
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
    
            // Refresh the gallery
            const updatedResponse = await fetch(`${BASE_URL}/gallery`);
            const updatedData = await updatedResponse.json();
            setImages(updatedData.data);
        } catch (error) {
            setUploadMessage(error.message);
        }
    };
    

    const handleDelete = async (id) => {
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
        }
    };

    return (
        <div className="mx-10 md:mx-20 lg:mx-36 xl:mx-[280px]">
            <div className="py-10 max-w-screen-xl mx-auto">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
                    Tour <span className="text-main">Gallery</span>
                </h1>
                <p className="text-xs text-center pt-3 pb-3 px-8 md:px-48 lg:px-56 xl:px-72 2xl:px-80">
                    Discover our fantastic early booking discounts & start planning your journey.
                </p>

                <div className="flex justify-center mb-3">
                    <button
                        onClick={toggleGallery}
                        className="px-3 py-1 bg-main text-white font-bold rounded lg:hidden"
                    >
                        {gallery ? "Hide Gallery" : "Visit Gallery"}
                    </button>
                </div>


                {loading && <p className="text-center">Loading images...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {/* Mobile Gallery View */}
                {gallery && (
                    <div className="block lg:hidden">
                        <div className="grid gap-3 sm:grid-cols-3">
                            {images.map((image) => (
                                <div key={image._id} className="rounded-lg">
                                    <img
                                        src={image.imgUrl}
                                        alt={image.title || "Gallery Image"}
                                        className="w-full h-auto object-cover rounded-lg shadow-md hover:scale-110 duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Desktop Gallery View */}
                <div className="hidden lg:block">
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-4">
                        {images.map((image) => (
                            <div key={image._id} className="rounded-lg">
                                <img
                                    src={image.imgUrl}
                                    alt={image.title || "Gallery Image"}
                                    className="w-full h-auto object-cover rounded-lg shadow-md hover:scale-110 duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryImages;
