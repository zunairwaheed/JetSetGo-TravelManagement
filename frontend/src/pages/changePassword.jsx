import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/config";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    // ✅ Separate states for each password field
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserId(user?._id);
                console.log("User ID Retrieved:", user?._id);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!userId) {
            toast.error("User ID is missing. Please log in again.");
            setLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password must match");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/users/change-password/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong");
            }

            toast.success("Password updated successfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Change Password Error:", error);
            toast.error(error.message);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword}>

                {/* Old Password Field */}
                <div className="relative">
                    <label className="font font-semibold">Old Password</label>
                    <input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full p-2 border rounded mb-2 pr-10"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-2 top-9 bg-transparent border-none cursor-pointer"
                    >
                        {showOldPassword ? <BiSolidHide /> : <BiSolidShow />}
                    </button>
                </div>

                {/* New Password Field */}
                <div className="relative">
                <label className="font font-semibold">New Password</label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border rounded mb-2 pr-10"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-2 top-9 bg-transparent border-none cursor-pointer"
                    >
                        {showNewPassword ? <BiSolidHide /> : <BiSolidShow />}
                    </button>
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                <label className="font font-semibold">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded mb-2 pr-10"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-9 bg-transparent border-none cursor-pointer"
                    >
                        {showConfirmPassword ? <BiSolidHide /> : <BiSolidShow />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-main text-white p-2 rounded w-full hover:bg-[#fa6036]"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Change Password"}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
