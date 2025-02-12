import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Card = ({ cid, img, ccity, crating, cdesc, cprice, cBook, cfeatured }) => {
    const navigate = useNavigate();

    const handleBookingClick = (id, city) => {
        navigate(`/tour/${id}/${city}`);
    };

    return (
        <div className="w-60 h-auto border-2 rounded-xl bg-white pb-2 mx-auto">
            <div className="relative">
                <img className="w-72 h-60 object-cover rounded-lg" src={img} alt={ccity} />
                <div className="absolute right-1 bottom-1">{cfeatured && <button className="bg-main text-white p-1 rounded-md">{cfeatured}Featured</button>}</div>
            </div>
            <div className="flex justify-between py-2 px-2">
                <div className="flex items-center">
                    <FaLocationDot color="#FA7436" />
                    <p className="font-bold pl-1">{ccity}</p>
                </div>
                <div className="flex items-center">
                    <FaStar color="#FA7436" />
                    <p className="pl-1 text-sm">{crating}</p>
                </div>
            </div>
            <div className="flex justify-between px-2">
                <p className="text-sm">{cdesc}</p>
            </div>
            <div className="flex justify-between py-2 px-2">
                <div className="flex">
                    <p className="font-bold text-[#FA7436]">${cprice}</p>
                    <p className="pt-1 text-sm">/person</p>
                </div>
                <div>
                    <button
                        onClick={() => handleBookingClick(cid, ccity)}
                        className="px-1 py-1 text-sm lg:font-bold bg-[#FA7436] text-white rounded active:bg-[#FEDCCC] active:text-[#FA7436]"
                    >
                        {cBook}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
