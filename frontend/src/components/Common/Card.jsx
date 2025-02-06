import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
    const navigate = useNavigate();

    const handleBookingClick = (id, city) => {
        navigate(`/tour/${id}/${city}`);
    };
    return (
        <>
            {data?.map((item) => (
                <div key={item.id}>
                    <div className="w-60 h-auto border-2 rounded-xl bg-white pb-2 mx-auto">
                        <img
                            className="w-72 h-60 object-cover rounded-lg"
                            src={item.imgUrl}
                            alt={item.title}
                        />
                        <div className="flex justify-between py-2 px-2">
                            <div className="flex items-center">
                                <FaLocationDot color="#FA7436" />
                                <p className="font-bold pl-1">{item.city}</p>
                            </div>
                            <div className="flex items-center">
                                <FaStar color="#FA7436" />
                                <p className="pl-1 text-sm">{item.rating}</p>
                            </div>
                        </div>
                        <div className="flex justify-between px-2">
                            <p className="text-sm">{item.desc}</p>
                        </div>
                        <div className="flex justify-between py-2 px-2">
                            <div className="flex">
                                <p className="font-bold text-[#FA7436]">${item.price}</p>
                                <p className="pt-1 text-sm">/person</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleBookingClick(item.id, item.city)}
                                    className="px-1 py-1 text-sm lg:font-bold bg-[#FA7436] text-white rounded active:bg-[#FEDCCC] active:text-[#FA7436]"
                                >
                                    {item.Book}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}


        </>
    )
}

export default Card