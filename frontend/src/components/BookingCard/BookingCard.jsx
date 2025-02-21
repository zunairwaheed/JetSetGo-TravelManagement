import React, { useEffect, useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../assets/gallery-04.jpg";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../../utils/config.js";
import { AuthContext } from "../../context/AuthContext.jsx";

const BookingCard = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

    const {
        imgUrl, city, country, rating, price, charges, desc
    } = tour;

    const [guest, setGuest] = useState(1);
    const [phone, setPhone] = useState("");
    const [bookingDate, setBookingDate] = useState("");

    const pricePerPerson = price;
    const serviceCharge = charges;
    const total = pricePerPerson * guest + serviceCharge;

    const handleBookingClick = async () => {
        if (!user) {
            alert("Please log in to book a tour.");
            return;
        }

        if (!phone || !bookingDate) {
            alert("Please enter your phone number and select a booking date.");
            return;
        }

        const bookingData = {
            userId: user._id,
            userEmail: user.email,
            tourName: tour.city,
            userName: user.username,
            guestSize: guest,
            phone: phone,
            bookingAt: new Date(bookingDate).toISOString(),
        };

        console.log("Booking Data Sent:", bookingData);

        try {
            const res = await fetch(`${BASE_URL}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
                credentials: "include",
            });

            const result = await res.json();
            if (!res.ok) {
                alert(result.message);
                return;
            }

            navigate(`/thankyou`);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tour]);

    return (
        <div>
            {loading && <h4>Loading...</h4>}
            {error && <h4>{error}</h4>}
            {!loading && !error && (
                <div className="py-10 mx-10 md:mx-20 lg:mx-36 xl:mx-[280px]">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Side - Image & Details */}
                        <div className="w-full lg:w-2/3">
                            <img
                                src={imgUrl} alt="Tour Location"
                                className="rounded-lg w-full h-80 object-cover"
                            />
                            <div className="mt-5">
                                <h2 className="text-2xl font-bold">{city}</h2>
                                <div className="flex items-center text-gray-500 text-sm gap-2 mt-1">
                                    <FaStar className="text-yellow-500" />
                                    <span>{rating} (1)</span>
                                </div>
                                <p className="text-gray-600 mt-3">
                                    {country} &bull;  ${price} / per person &bull;  {guest} people
                                </p>
                                <h3 className="mt-5 text-lg font-semibold">Description</h3>
                                <p className="text-gray-600">{desc}</p>
                            </div>
                        </div>

                        {/* Right Side - Booking Form */}
                        <div className="w-full lg:w-1/3 bg-white shadow-lg p-6 rounded-lg border">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    ${pricePerPerson} <span className="text-sm font-medium">/ per person</span>
                                </h2>
                                <div className="flex items-center text-sm text-gray-600">
                                    <FaStar className="text-yellow-500" />
                                    <span>{rating} (1)</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mt-4">Information</h3>

                            {/* Booking Form */}
                            <form className="space-y-3 mt-3">
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone"
                                    className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-main"
                                />

                                <div className="relative">
                                    <input
                                        type="date"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-main text-gray-500"
                                    />
                                    <IoCalendarOutline className="absolute right-3 top-3 text-gray-400" />
                                </div>

                                <input
                                    type="number"
                                    min="1"
                                    value={guest}
                                    onChange={(e) => setGuest(Number(e.target.value))}
                                    placeholder="Guest"
                                    className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-main"
                                />
                            </form>

                            {/* Price Summary */}
                            <div className="border-t mt-4 pt-4 space-y-2 text-gray-700">
                                <p>${pricePerPerson} × {guest} person</p>
                                <p>Service charge: ${serviceCharge}</p>
                                <h3 className="text-lg font-bold">Total: ${total}</h3>
                            </div>

                            {/* Button */}
                            <button onClick={handleBookingClick} className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-orange-600 transition">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingCard;
