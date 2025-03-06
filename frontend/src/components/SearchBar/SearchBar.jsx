import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../utils/config.js";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [people, setPeople] = useState("");

    const navigate = useNavigate();
    const { handleSubmit } = useForm();

    const searchHandler = async () => {
        if (!location || !date || !people) {
            alert("Please fill all the fields");
            return;
        }

        try {
            const searchUrl = `${BASE_URL}/tours/search/getTourBySearch?country=${location}&date=${date}&maxGroupSize=${people}`;
            console.log("Search URL:", searchUrl);
    
            const res = await fetch(searchUrl);
    
            if (!res.ok) {
                throw new Error(`Error: ${res.status} - ${res.statusText}`);
            }
    
            const result = await res.json();
    
            if (!result || !result.data) {
                throw new Error("No data found in the response");
            }
     
            console.log("Search Results:", result.data);
    
            navigate(`/tours/search?country=${location}&date=${date}&maxGroupSize=${people}`, { state: { tours: result.data } });
    
        } catch (error) {
            console.error("Search failed:", error);
            alert(`Something went wrong: ${error.message}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(searchHandler)}
            className="my-10 mx-10 md:mx-20 lg:mx-36 xl:mx-[280px] lg:pb-3 xl:pb-0 rounded flex flex-col lg:flex-row md:justify-evenly shadow-lg"
        >
            <div className="xl:pb-2 gap-5 lg:gap-0 flex flex-col lg:flex-row items-center text-sm">

                {/* Location Input */}
                <div className="lg:border-r-2 lg:pr-3">
                    <div className="flex items-center gap-1">
                        <IoLocationSharp className="text-main" />
                        <p className="font-semibold text-base xl:text-xl">Location</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Where are you going"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border-2 border-main rounded-lg outline-none text-center w-48 h-10 placeholder-gray-500"
                        required
                    />
                </div>

                {/* Date Input */}
                <div className="lg:px-3 lg:border-r-2">
                    <div className="flex items-center gap-1">
                        <BsCalendar2DateFill className="text-main" />
                        <p className="font-semibold text-base xl:text-xl">Date</p>
                    </div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)} // Correctly updates state
                        className="px-2 border-2 border-main rounded-lg outline-none text-center w-48 h-10 text-gray-500"
                        required
                    />
                </div>

                {/* Guests Input */}
                <div className="lg:pl-3">
                    <div className="flex items-center gap-1">
                        <IoPeopleSharp className="text-main" />
                        <p className="font-semibold text-base xl:text-xl">Guest</p>
                    </div>
                    <input
                        type="number"
                        placeholder="No of guests"
                        value={people}
                        onChange={(e) => setPeople(e.target.value)} // Correctly updates state
                        className="border-2 border-main rounded-lg outline-none text-center w-48 h-10 placeholder-gray-500"
                        required
                    />
                </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center mb-3 lg:mb-0">
                <button
                    type="submit"
                    className="bg-main w-26 lg:mt-3 xl:w-36 xl:text-xl xl:my-5 px-2 py-2 mt-3 rounded font-semibold text-base text-white active:bg-[#FEDCCC] active:text-main"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
