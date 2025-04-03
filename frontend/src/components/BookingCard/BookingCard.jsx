import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, resetBookingState } from "../../context/bookingSlice.jsx";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../../utils/config.js";
import toast from "react-hot-toast";


const BookingCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [date, setDate] = useState("");



    const { user } = useSelector((state) => state.auth);
    const { data: tour, loading, error, refetch } = useFetch(`${BASE_URL}/tours/${id}`);
    const { loading: bookingLoading, success: bookingSuccess, error: bookingError } = useSelector((state) => state.booking);

    const { imgUrl, city, country, rating, price, charges, desc, maxGroupSize } = tour || {};

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        getValues
    } = useForm();


    const total = price * (watch("guest") || 1) + charges;

    const onSubmit = (data) => {
        if (!user) {
            toast.error("Please log in to book a tour.");
            return;
        }

        const seatsToBook = Number(data.guest);

        if (seatsToBook > maxGroupSize) {
            toast.error("Not enough seats available.");
            return;
        }

        const bookingData = {
            userId: user._id,
            image: imgUrl,
            userEmail: user.email,
            tourName: city,
            userName: user.username,
            guestSize: Number(data.guest),
            price: total,
            phone: data.phone,
            bookingFrom: new Date(data.dateFrom).toISOString(), // Correctly format dateFrom
            // bookingTo: new Date(data.dateTo).toISOString(), // Correctly format dateTo
            tourId: id,
        };

        console.log("Dispatching booking:", bookingData);
        dispatch(createBooking(bookingData));
    };


    useEffect(() => {
        if (bookingSuccess) {
            toast.success("Booking successful!");
            dispatch(resetBookingState());
            navigate("/thankyou");

            refetch();
        }
    }, [bookingSuccess, dispatch, navigate, id])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tour]);

    return (
        <div>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
                </div>
            )}
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
                                <p className="text-gray-600 mt-3">{country} • ${price} / per person • {watch("guest") || 1} people •  {maxGroupSize} seats available</p>
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
                                <div>
                                    <h1>Phone:</h1>
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
                                </div>

                                {/* Date From Field */}
                                <div className="relative">
                                    <h1>Date:</h1>
                                    <input
                                        type="date"
                                        {...register("dateFrom", {
                                            required: "Start date is required",
                                            validate: value => new Date(value) >= new Date(Date.now() + 86400000) || "Start date must be tomorrow or later", // Ensures the date is valid
                                        })}
                                        className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-main text-gray-500 text-sm"
                                        min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Set min date to tomorrow
                                    />
                                </div>
                                {errors.dateFrom && <p className="text-red-500">{errors.dateFrom.message}</p>}

                                {/* Date To Field
                                <div className="relative">
                                    <h1>To:</h1>
                                    <input
                                        type="date"
                                        {...register("dateTo", {
                                            required: "End date is required",
                                            validate: value => new Date(value) > new Date(getValues("dateFrom")) || "End date must be later than start date", // Ensures end date is later than start date
                                        })}
                                        className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-main text-gray-500 text-sm"
                                        min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Set min date to tomorrow
                                    />
                                </div>
                                {errors.dateTo && <p className="text-red-500">{errors.dateTo.message}</p>} */}


                                {/* Guest Field */}
                                <div>
                                    <h1>People:</h1>
                                    <input
                                        type="number"
                                        {...register("guest", {
                                            required: "Guest count is required",
                                            min: {
                                                value: 1,
                                                message: "At least 1 guest is required",
                                            },
                                            valueAsNumber: true, // Ensures value is treated as a number
                                        })}
                                        placeholder="Guest"
                                        className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-main text-sm"
                                        min="1" // Prevents negative numbers
                                    // onKeyDown={(e) => e.key === "-" && e.preventDefault()} // Disables negative input
                                    />
                                    {errors.guest && <p className="text-red-500">{errors.guest.message}</p>}
                                </div>




                                {/* Price Summary */}
                                <div className="border-t mt-4 pt-4 space-y-2 text-gray-700">
                                    <p>${price} × {watch("guest") || 1} person</p>
                                    <p>Service charge: ${charges}</p>
                                    <h3 className="text-lg font-bold">Total: ${total}</h3>
                                </div>

                                {/* Button */}
                                <button type="submit" className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-orange-600 transition" disabled={bookingLoading}>
                                    {bookingLoading ? "Booking..." : "Book Order"}
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
