import React, { useState } from "react";
import { BASE_URL } from "../../utils/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsLetter = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!email) {
            toast.warning("Please enter an email address.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/newsletter/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            toast.success(result.message);
            setEmail("");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-5 pb-10 mx-10 mb-10 md:mx-20 lg:mx-36 xl:mx-[280px] bg-main rounded-lg">
            <p className="text-white text-lg md:text-2xl lg:text-3xl font-bold text-center pb-10">
                Subscribe and get exclusive <br />
                deals & offers
            </p>
            <div className="md:bg-white md:w-72 lg:w-96 mx-auto flex flex-col md:flex-row items-center rounded gap-2 md:gap-4 lg:gap-6 p-3">
                <input
                    className="md:h-10 lg:h-12 w-full outline-none rounded border p-2"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="bg-white text-main md:bg-main md:active:bg-[#FEDCCC] md:text-white md:active:text-main w-20 lg:w-32 h-10 px-2 text-sm font-bold rounded-md"
                    onClick={handleSubscribe}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
                        </div>
                    ) : "Subscribe"}
                </button>
            </div>
        </div>
    );
};

export default NewsLetter;
