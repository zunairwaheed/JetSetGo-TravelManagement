import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, resetBookingState } from "../../context/bookingSlice.jsx";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../../utils/config.js";

const BookingCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [date, setDate] = useState("");


    const { user } = useSelector((state) => state.auth);
    const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
    const { loading: bookingLoading, success: bookingSuccess, error: bookingError } = useSelector((state) => state.booking);

    const { imgUrl, city, country, rating, price, charges, desc } = tour || {};

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            guest: 1, // Ensure default guest count is 1
        },
    });

    const total = price * (watch("guest") || 1) + charges;

    const onSubmit = (data) => {
        if (!user) {
            alert("Please log in to book a tour.");
            return;
        }

        const bookingData = {
            userId: user._id,
            userEmail: user.email,
            tourName: city,
            userName: user.username,
            guestSize: Number(data.guest),
            phone: data.phone,
            bookingAt: new Date(data.bookingDate).toISOString(),
        };

        console.log("Dispatching booking:", bookingData);
        dispatch(createBooking(bookingData));
    };

    useEffect(() => {
        if (bookingSuccess) {
            alert("Booking successful!");
            dispatch(resetBookingState());
            navigate("/thankyou");
        }
    }, [bookingSuccess, dispatch, navigate]);

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
                            <img src={imgUrl} alt="Tour Location" className="rounded-lg w-full h-80 object-cover" />
                            <div className="mt-5">
                                <h2 className="text-2xl font-bold">{city}</h2>
                                <div className="flex items-center text-gray-500 text-sm gap-2 mt-1">
                                    <FaStar className="text-yellow-500" />
                                    <span>{rating} (1)</span>
                                </div>
                                <p className="text-gray-600 mt-3">{country} • ${price} / per person • {watch("guest") || 1} people</p>
                                <h3 className="mt-5 text-lg font-semibold">Description</h3>
                                <p className="text-gray-600">{desc}</p>
                            </div>
                        </div>

                        {/* Right Side - Booking Form */}
                        <div className="w-full lg:w-1/3 bg-white shadow-lg p-6 rounded-lg border">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    ${price} <span className="text-sm font-medium">/ per person</span>
                                </h2>
                                <div className="flex items-center text-sm text-gray-600">
                                    <FaStar className="text-yellow-500" />
                                    <span>{rating} (1)</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mt-4">Information</h3>

                            {/* Booking Form */}
                            <form className="space-y-3 mt-3" onSubmit={handleSubmit(onSubmit)}>
                                {/* Phone Field */}
                                <input
                                    type="tel"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^03[0-9]{9}$/,
                                            message: "Invalid phone format (e.g., 0324XXXXX93)",
                                        }
                                    })}
                                    placeholder="Phone (e.g., 0300XXXXX93)"
                                    className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-main text-sm"
                                />

                                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                                {/* Booking Date Field */}
                                <div className="relative">
                                    <input
                                        type="date"
                                        {...register("bookingDate", { required: "Booking date is required" })}
                                        className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-main text-gray-500 text-sm"
                                    />
                                </div>
                                {errors.bookingDate && <p className="text-red-500">{errors.bookingDate.message}</p>}

                                {/* Guest Field */}
                                <input
                                    type="number"
                                    {...register("guest", {
                                        required: "Guest count is required",
                                        min: {
                                            value: 1,
                                            message: "At least 1 guest is required",
                                        },
                                    })}
                                    placeholder="Guest"
                                    className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-main text-sm"
                                />
                                {errors.guest && <p className="text-red-500">{errors.guest.message}</p>}

                                {/* Price Summary */}
                                <div className="border-t mt-4 pt-4 space-y-2 text-gray-700">
                                    <p>${price} × {watch("guest") || 1} person</p>
                                    <p>Service charge: ${charges}</p>
                                    <h3 className="text-lg font-bold">Total: ${total}</h3>
                                </div>

                                {/* Button */}
                                <button type="submit" className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-orange-600 transition" disabled={bookingLoading}>
                                    {bookingLoading ? "Booking..." : "Book Now"}
                                </button>
                                {bookingError && <p className="text-red-500 mt-2">{bookingError}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingCard;
