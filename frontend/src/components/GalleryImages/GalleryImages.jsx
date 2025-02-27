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
    
        console.log("FormData:", formData.get("galleryImage")); // Debugging line
    
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

                {/* Mobile */}
                <div className="lg:hidden">
                    <div className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 ${!gallery ? "hidden" : ""}`}>
                        {images.map((image) => (
                            <div key={image._id} className="rounded-lg relative group">
                                <img
                                    src={image.imgUrl}
                                    alt={image.title || "Gallery Image"}
                                    className="w-full h-auto object-cover rounded-lg shadow-md"
                                />
                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDelete(image._id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 sm:px-3 sm:py-1 rounded-lg opacity-90 hover:opacity-100 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col mt-5">
                        <div className={`${!gallery ? "hidden" : ""}`}>
                            <form onSubmit={handleUpload} encType="multipart/form-data" className="flex flex-col items-center">
                                <input className="text-sm pl-5" type="file" name="galleryImage" onChange={handleFileChange} />
                                <button className="bg-main w-16 lg:mt-3 xl:w-36 xl:text-xl xl:my-5 px-2 py-2 mt-3 rounded font-semibold text-sm text-white active:bg-[#FEDCCC] active:text-main" type="submit">Submit</button>
                            </form>
                            {uploadMessage && <p className="text-green-500 text-center text-sm pt-2">{uploadMessage}</p>}
                            {deleteMessage && <p className="text-red-500 text-center text-sm pt-2">{deleteMessage}</p>}
                        </div>
                    </div>
                </div>

                {/* Desktop */}
                <div className="hidden lg:block">
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-4">
                        {images.map((image) => (
                            <div key={image._id} className="rounded-lg relative group">
                                <img
                                    src={image.imgUrl}
                                    alt={image.title || "Gallery Image"}
                                    className="w-full h-auto object-cover rounded-lg shadow-md hover:scale-110 duration-300"
                                />
                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDelete(image._id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 sm:px-3 sm:py-1 rounded-lg opacity-90 hover:opacity-100 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col my-10">
                        <form onSubmit={handleUpload} encType="multipart/form-data" className="flex flex-col items-center">
                            <input type="file" name="galleryImage" onChange={handleFileChange} />
                            <button className="bg-main w-26 lg:mt-3 xl:w-36 xl:text-xl xl:my-5 px-2 py-2 mt-3 rounded font-semibold text-base text-white active:bg-[#FEDCCC] active:text-main" type="submit">Submit</button>
                        </form>
                        {uploadMessage && <p className="text-green-500 text-center">{uploadMessage}</p>}
                        {deleteMessage && <p className="text-red-500 text-center">{deleteMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryImages;
