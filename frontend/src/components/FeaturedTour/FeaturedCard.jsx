// import React, { useRef } from "react";
// import { FeaturedData } from "../../Data/index.js"
// import { FaArrowRight, FaStar } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useNavigate } from "react-router-dom";
// import Card from "../Common/Card.jsx";


// const FeaturedCard = () => {
//   const navigate = useNavigate();

//   const handleBookingClick = (id, city) => {
//     navigate(`/tour/${id}/${city}`);
//   };

//   const sliderRef = useRef(null);
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//       <div className="py-10 mx-10 md:mx-20 lg:mx-36 xl:mx-[280px]">
//         <div>
//           <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
//             Featured <span className="text-main">Tours</span>
//           </h1>
//           <p className="text-xs text-center px-8 md:px-48 lg:px-56 xl:px-72 2xl:px-80 pt-3 pb-7">
//             Plan your perfect vacation with our travel agency. Choose among
//             hundreds of all-inclusive offers!
//           </p>
//           <div className="mt-3 pb-3 gap-2 flex justify-end">
//             {/* Back Button */}
//             <button
//               className="bg-gray-200 active:bg-[#FC9A73] text-main active:text-white rounded-full flex items-center justify-center w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rotate-180"
//               onClick={() => sliderRef.current.slickPrev()}
//             >
//               <FaArrowRight className="size-4 lg:size-5" />
//             </button>
//             {/* Next Button */}
//             <button
//               className="bg-main active:bg-[#FEDCCC] text-white active:text-main rounded-full flex items-center justify-center w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10"
//               onClick={() => sliderRef.current.slickNext()}
//             >
//               <FaArrowRight className="size-4 lg:size-5" />
//             </button>
//           </div>
//         </div>

//         <div>
//           <Slider {...settings} ref={sliderRef}>
//             {FeaturedData.map((item) => (
//               <div key={item.id}>
//                 <div className="w-60 h-auto border-2 rounded-xl bg-white pb-2 mx-auto">
//                   <div>
//                     <div className="relative">
//                       <img className="w-72 h-60 object-cover rounded-lg" src={item.imgUrl} alt={item.title} />
//                       <div className="absolute right-1 bottom-1"><button className="bg-main text-sm text-white p-1">{item.featured}</button></div>
//                     </div>
//                   </div>
//                   <div className="flex justify-between py-2 px-2">
//                     <div className="flex items-center">
//                       <FaLocationDot color="#FA7436" />
//                       <p className="font-bold pl-1">{item.city}</p>
//                     </div>
//                     <div className="flex items-center">
//                       <FaStar color="#FA7436" />
//                       <p className="pl-1 text-sm">{item.rating}</p>
//                     </div>
//                   </div>
//                   <div className="flex justify-between px-2">
//                     <p className="text-sm">{item.desc}</p>
//                   </div>
//                   <div className="flex justify-between py-2 px-2">
//                     <div className="flex">
//                       <p className="font-bold text-main">${item.price}</p>
//                       <p className="pt-1 text-sm">/person</p>
//                     </div>
//                     <div>
//                       <button
//                         onClick={() => handleBookingClick(item.id, item.city)}
//                         className="px-1 py-1 text-sm lg:font-bold bg-main text-white rounded active:bg-[#FEDCCC] active:text-main"
//                       >
//                         {item.Book}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* <Card data={FeaturedData}/> */}
//           </Slider>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FeaturedCard;

import React, { useRef } from "react";
import { FeaturedData } from "../../Data/index.js"
import { FaArrowRight, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Card from "../Common/Card.jsx";


const FeaturedCard = () => {
  const navigate = useNavigate();

  const handleBookingClick = (id, city) => {
    navigate(`/tour/${id}/${city}`);
  };

  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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

        <div>
          <Slider {...settings} ref={sliderRef}>
          {FeaturedData.map((item) => (
                <Card 
                    key={item.id} 
                    cid={item.id} 
                    img={item.imgUrl} 
                    ccity={item.city} 
                    crating={item.rating} 
                    cdesc={item.desc} 
                    cprice={item.price} 
                    cBook={item.Book} 
                />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default FeaturedCard;

