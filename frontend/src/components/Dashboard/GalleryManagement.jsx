import React from 'react'
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import useFetchAllTours from "../hooks/useFetchAllTours.js";
import useFetch from "../hooks/useFetch.js";

const URL = `${BASE_URL}/tours`;
const USER_URL = `${BASE_URL}/users`;
const DELETE_USER_URL = `${BASE_URL}/users`;

const GalleryManagement = () => {
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

export default GalleryManagement