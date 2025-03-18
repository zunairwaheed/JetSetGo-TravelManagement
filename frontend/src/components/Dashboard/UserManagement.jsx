import React, { useState } from "react";
import { BASE_URL } from "../../utils/config";
import useFetch from "../hooks/useFetch.js";
import toast from "react-hot-toast";
import DeleteModal from "../Common/DeleteModal"; // Import the modal


const USER_URL = `${BASE_URL}/users`;
const DELETE_USER_URL = `${BASE_URL}/users`;

function UserManagement() {
    const { data: users = [], error, loading } = useFetch(USER_URL);
    const [selectedUser, setSelectedUser] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for modal

    const handleSelectUser = (id) => {
        setSelectedUser(id);
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) {
            toast.warning("Please select a user to delete.");
            return;
        }
    
        setIsDeleting(true);
        try {
            const response = await fetch(`${DELETE_USER_URL}/${selectedUser}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success("User deleted successfully!");
    
                // Get the logged-in user from localStorage
                const storedUser = JSON.parse(localStorage.getItem("user"));
    
                // Check if the deleted user is the logged-in user
                if (storedUser && storedUser._id === selectedUser) {
                    // Logout the user by removing stored data
                    localStorage.removeItem("user");
                    setTimeout(() => {
                        window.location.href = "/"; // Redirect to login page
                    }, 1500);
                } else {
                    setTimeout(() => window.location.reload(), 1500);
                }
            } else {
                toast.error(result.message || "Failed to delete user");
            }
            setIsDeleteModalOpen(false);
        } catch (error) {
            toast.error("Error deleting user");
            console.error("Delete Error:", error);
        }
        setIsDeleting(false);
    };
    
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-5">
            <h1 className="text-xl lg:text-2xl font-bold mb-4">User Management</h1>

            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
                </div>
            )}
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
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={!selectedUser || isDeleting}
            >
                {isDeleting ? "Deleting..." : "Delete User"}
            </button>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteUser}
                itemName={``}
            />
        </div>
    );
}

export default UserManagement;
