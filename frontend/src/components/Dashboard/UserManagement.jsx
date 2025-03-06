import React from 'react'
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import useFetch from "../hooks/useFetch.js";

const URL = `${BASE_URL}/tours`;
const USER_URL = `${BASE_URL}/users`;
const DELETE_USER_URL = `${BASE_URL}/users`;

function UserManagement() {
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

export default UserManagement