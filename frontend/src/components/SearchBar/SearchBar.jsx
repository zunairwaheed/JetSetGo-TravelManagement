import React, { useState } from "react";
import { IoLocationSharp, IoPeopleSharp } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../utils/config.js";
import { useNavigate } from "react-router-dom";
import Card from "../Common/Card.jsx";

const SearchBar = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchHandler = async (data) => {
        setLoading(true);
        setError("");

        const { location, date, guests } = data;

        try {
            const searchUrl = `${BASE_URL}/tours/search/getTourBySearch?country=${location}&date=${date}&maxGroupSize=${guests}`;

            const res = await fetch(searchUrl);

            if (!res.ok) {
                throw new Error(`Error: ${res.status} - ${res.statusText}`);
            }

            const result = await res.json();

            if (!result || !result.data.length) {
                throw new Error("No tours found matching the criteria.");
            }

            setTours(result.data);

        } catch (error) {
            console.error("Search failed:", error);
            setError("No tours found matching the criteria.");
            setTours([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-10 mx-5 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-[280px] shadow-lg">
            <form
                onSubmit={handleSubmit(searchHandler)}
                className=" p-5 lg:pb-3 xl:pb-0 rounded flex flex-col md:justify-even bg-white"
            >
                <div className="xl:pb-2 gap-5 lg:gap-0 flex flex-col lg:flex-row items-center justify-center text-sm w-full">

                    {/* Location Input */}
                    <div className="w-full lg:w-auto lg:border-r-2 lg:pr-3">
                        <div className="flex items-center gap-1 mb-2">
                            <IoLocationSharp className="text-main text-lg" />
                            <p className="font-semibold text-base xl:text-xl">Location</p>
                        </div>
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            {...register("location", { required: "Location is required" })}
                            className="border-2 border-main rounded-lg outline-none w-full lg:w-48 h-10 px-2 placeholder-gray-500"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
                        )}
                    </div>

                    {/* Date Input */}
                    <div className="w-full lg:w-auto lg:px-3 lg:border-r-2">
                        <div className="flex items-center gap-1 mb-2">
                            <BsCalendar2DateFill className="text-main text-lg" />
                            <p className="font-semibold text-base xl:text-xl">Date</p>
                        </div>
                        <input
                            type="date"
                            {...register("date", { required: "Date is required" })}
                            className="border-2 border-main rounded-lg outline-none w-full lg:w-48 h-10 px-2 text-gray-500"
                        />
                        {errors.date && (
                            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                        )}
                    </div>

                    {/* Guests Input */}
                    <div className="w-full lg:w-auto lg:pl-3">
                        <div className="flex items-center gap-1 mb-2">
                            <IoPeopleSharp className="text-main text-lg" />
                            <p className="font-semibold text-base xl:text-xl">Guests</p>
                        </div>
                        <input
                            type="number"
                            placeholder="No of guests"
                            {...register("guests", {
                                required: "Number of guests is required",
                                min: { value: 1, message: "At least 1 guest is required" },
                            })}
                            className="border-2 border-main rounded-lg outline-none w-full lg:w-48 h-10 px-2 placeholder-gray-500"
                        />
                        {errors.guests && (
                            <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>
                        )}
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center mt-5 lg:mt-0 w-full lg:w-auto">
                    <button
                        type="submit"
                        className="bg-main w-full lg:w-24 text-white font-semibold text-base py-2 md:my-5 rounded active:bg-[#FEDCCC] active:text-main"
                        disabled={loading}
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>
            </form>

            {/* Display Results */}
            <div className="p-2">
                {error && <p className="text-red-500 text-lg">{error}</p>}

                {tours.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {tours.map((tour) => (
                            <Card
                                key={tour._id}
                                cid={tour._id}
                                img={tour.imgUrl}
                                ccity={tour.city}
                                crating={tour.rating}
                                cdesc={tour.desc}
                                cprice={tour.price}
                                cfeatured={tour.featured}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
