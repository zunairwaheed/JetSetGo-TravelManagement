import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import toast from "react-hot-toast";
import DeleteModal from "../Common/DeleteModal.jsx";

const GalleryManagement = () => {
    const [gallery, setGallery] = useState(false);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [deletingImageId, setDeletingImageId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        const fetchGalleryImages = async () => {
            try {
                const response = await fetch(`${BASE_URL}/gallery`);
                if (!response.ok) throw new Error("Failed to fetch images");
                const data = await response.json();
                setImages(data.data);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchGalleryImages();
    }, []);

    const toggleGallery = () => setGallery((prev) => !prev);
    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.warn("Please select an image first.");
            return;
        }
        setUploading(true);

        const formData = new FormData();
        formData.append("galleryImage", file);

        try {
            const response = await fetch(`${BASE_URL}/gallery/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Upload failed - maxSize 10MB");
            toast.success("Image uploaded successfully!");
            setImages([...images, data.data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedImageId) return;
        setDeletingImageId(selectedImageId);

        try {
            const response = await fetch(`${BASE_URL}/gallery/delete/${selectedImageId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Delete failed");
            toast.error("Image deleted successfully!");
            setImages(images.filter((image) => image._id !== selectedImageId));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setDeletingImageId(null);
            setModalOpen(false);
        }
    };

    return (
        <>
            <div className="bg-gray-100 p-6">
                <h1 className="text-xl lg:text-2xl font-bold mb-4">Gallery Management</h1>
                <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-5 relative">
                    {(loading || uploading || deletingImageId) && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
                        </div>
                    )}

                    <div className="flex justify-center mb-3">
                        <button onClick={toggleGallery} className="px-3 py-1 bg-main text-white font-bold rounded lg:hidden">
                            {gallery ? "Hide Gallery" : "Visit Gallery"}
                        </button>
                    </div>

                    {loading && <p className="text-center">Loading images...</p>}

                    {gallery && (
                        <div className="lg:hidden grid gap-3 sm:grid-cols-3">
                            {images.map((image) => (
                                <div key={image._id} className="relative group">
                                    <img src={image.imgUrl} alt={image.title || "Gallery Image"} className="w-full h-auto object-cover rounded-lg shadow-md hover:scale-110 duration-300" />
                                    <button
                                        onClick={() => {
                                            setSelectedImageId(image._id);
                                            setModalOpen(true);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg opacity-90 hover:opacity-100 transition-all"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="hidden lg:block columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-4">
                        {images.map((image) => (
                            <div key={image._id} className="relative group">
                                <img src={image.imgUrl} alt={image.title || "Gallery Image"} className="w-full h-auto object-cover rounded-lg shadow-md hover:scale-110 duration-300" />
                                <button
                                    onClick={() => {
                                        setSelectedImageId(image._id);
                                        setModalOpen(true);
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg opacity-90 hover:opacity-100 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col my-10 items-center">
                        <form onSubmit={handleUpload} className="flex flex-col items-center">
                            <input className="pl-16 text-sm lg:text-base" type="file" onChange={handleFileChange} />
                            <button className="bg-main px-3 py-2 mt-3 rounded font-semibold text-white active:bg-[#FEDCCC] active:text-main" type="submit" disabled={uploading}>
                                {uploading ? "Uploading..." : "Upload"}
                            </button>
                        </form>
                    </div>

                    <DeleteModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onConfirm={handleDelete}
                        itemName={selectedImageId?.imgUrl || "this image"}
                    />
                </div>
            </div>
        </>
    );
};

export default GalleryManagement;
