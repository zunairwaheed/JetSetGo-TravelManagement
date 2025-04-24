import React, { useRef, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "../../utils/config";

const Testimonial = () => {
    const sliderRef = useRef(null);
    const [testimonials, setTestimonials] = useState([]);

    // ✅ Fetch testimonials from backend
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch(`${BASE_URL}/testimonials`);
                const data = await response.json();
                if (data.success) {
                    setTestimonials(data.data);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        };
        fetchTestimonials();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div className="bg-blue-200 pb-20 pt-20 mt-10 mb-10">
            <div className="mx-10 md:mx-20 lg:mx-36 xl:mx-[280px] flex flex-col lg:flex-row lg:gap-28">
                {/* Left Section */}
                <div className="lg:w-1/2">
                    <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-center lg:text-left">
                        What people say <span className="text-[#FA7436]">about us</span>
                    </h1>
                    <p className="text-xs lg:text-sm text-center lg:text-left px-8 md:px-48 lg:px-0 pt-3 pb-7">
                        Our Clients send us bunch of smilies with our services and we love them.
                    </p>
                    <div className="hidden lg:block">
                        <div className="mt-3 gap-2 flex justify-center lg:justify-start">
                            {/* Back Button */}
                            <button
                                className="bg-white active:bg-[#FC9A73] text-[#FA7436] active:text-white rounded-full flex items-center justify-center w-9 h-9 xl:w-10 xl:h-10 rotate-180"
                                onClick={() => sliderRef.current.slickPrev()}
                            >
                                <FaArrowRight className="w-5 h-5" />
                            </button>
                            {/* Next Button */}
                            <button
                                className="bg-[#FA7436] active:bg-[#FEDCCC] text-white active:text-[#FA7436] rounded-full flex items-center justify-center w-9 h-9 xl:w-10 xl:h-10"
                                onClick={() => sliderRef.current.slickNext()}
                            >
                                <FaArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="lg:w-1/2">
                    <Slider {...settings} ref={(slider) => (sliderRef.current = slider)}>
                        {testimonials.length > 0 ? (
                            testimonials.map((item) => (
                                <div key={item._id} className="py-11">
                                    <div className="relative bg-white rounded-lg shadow-md px-6 py-8 w-full flex justify-center">
                                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                                            <img
                                                className="w-16 h-16 rounded-full object-cover border-2 border-black shadow-lg"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIhCBq-WV5kdxy5e-8fgzaYKejJFYOUnTt1Q&s"
                                                // src={item.avatar}
                                                alt={`${item.name}'s avatar`}
                                            />
                                        </div>
                                        <div className="text-center mt-8">
                                            <p className="text-md">{item.testimonial}</p>
                                            <h1 className="font-bold text-base lg:text-lg mt-4">
                                                {item.name}
                                            </h1>
                                            <p className="text-gray-500 text-sm lg:text-base">{item.city.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No testimonials available.</p>
                            </div>
                        )}
                    </Slider>
                </div>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="lg:hidden">
                <div className="mt-3 gap-2 flex justify-center">
                    {/* Back Button */}
                    <button
                        className="bg-white active:bg-[#FC9A73] text-[#FA7436] active:text-white rounded-full flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rotate-180"
                        onClick={() => sliderRef.current.slickPrev()}
                    >
                        <FaArrowRight className="w-4 h-4" />
                    </button>
                    {/* Next Button */}
                    <button
                        className="bg-[#FA7436] active:bg-[#FEDCCC] text-white active:text-[#FA7436] rounded-full flex items-center justify-center w-6 h-6 md:w-8 md:h-8"
                        onClick={() => sliderRef.current.slickNext()}
                    >
                        <FaArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
