import React, { useRef } from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Card from "../Common/Card.jsx";
import useFetch from "../hooks/useFetch.js"
import { BASE_URL } from "../../utils/config.js";

const FeaturedCard = () => {
  const { data: featuredTours, loading, error } = useFetch(
    `${BASE_URL}/tours/search/getFeaturedTours`
  );

  const navigate = useNavigate();

  const handleBookingClick = (_id, city) => {
    navigate(`/tour/${_id}/${city}`);
  };

  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="py-10 mx-10 md:mx-20 lg:mx-36 xl:mx-[280px]">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
            Featured <span className="text-main">Tours</span>
          </h1>
          <p className="text-xs text-center px-8 md:px-48 lg:px-56 xl:px-72 2xl:px-80 pt-3 pb-7">
            Plan your perfect vacation with our travel agency. Choose among
            hundreds of all-inclusive offers!
          </p>
          <div className="mt-3 pb-3 gap-2 flex justify-end">
            {/* Back Button */}
            <button
              className="bg-gray-200 active:bg-[#FC9A73] text-main active:text-white rounded-full flex items-center justify-center w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rotate-180"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <FaArrowRight className="size-4 lg:size-5" />
            </button>
            {/* Next Button */}
            <button
              className="bg-main active:bg-[#FEDCCC] text-white active:text-main rounded-full flex items-center justify-center w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10"
              onClick={() => sliderRef.current.slickNext()}
            >
              <FaArrowRight className="size-4 lg:size-5" />
            </button>
          </div>
        </div>

        {
          loading && <h4>Loading......</h4>
        }
        {
          error && <h4>{error}</h4>
        }

        <div>
          <Slider {...settings} ref={sliderRef}>
            {!loading && !error && featuredTours.filter((item) => item.featured).map((item) => (
              <Card
                key={item._id}
                cid={item._id}
                img={item.imgUrl}
                ccity={item.city}
                crating={item.rating}
                cdesc={item.desc}
                cprice={item.price}
                cBook={item.book}
                cfeatured={item.featured}
              />
            ))}
          </Slider>

        </div>
      </div>
    </>
  );
};

export default FeaturedCard;

