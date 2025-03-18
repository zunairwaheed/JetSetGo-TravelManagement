import React, { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import toast from "react-hot-toast";

const ThankYou = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!sessionId || hasFetched.current) return; 
    
        if (!sessionStorage.getItem(`statusUpdated-${sessionId}`)) {
            hasFetched.current = true; 
            updateBookingStatus(sessionId);
        }
    }, [sessionId]);
    

    const updateBookingStatus = async (sessionId) => {
        try {
            const response = await fetch(`${BASE_URL}/bookings/update-status`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId }),
                credentials: "include",
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.error || "Failed to update booking status");
            }

            toast.success("Booking payment confirmed!");
            sessionStorage.setItem(`statusUpdated-${sessionId}`, "true");

        } catch (error) {
            console.error("Error updating booking status:", error.message);

            if (!sessionStorage.getItem(`errorDisplayed-${sessionId}`)) {
                toast.error(error.message);
                sessionStorage.setItem(`errorDisplayed-${sessionId}`, "true");
            }
        }
    };

    return (
        <div className='mx-10 my-10 md:mx-20 lg:mx-36 xl:mx-[280px] h-96 flex flex-col justify-center items-center gap-5'>
            <div className='font-bold text-main text-4xl'>Thank You!</div>
            <button>
                <Link to="/" className="text-sm text-white bg-main p-2 rounded font-semibold">
                    Back To Home
                </Link>
            </button>
        </div>
    );
};

export default ThankYou;
