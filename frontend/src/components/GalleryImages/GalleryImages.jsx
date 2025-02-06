import React, { useState } from "react";
// import GalleryData from "./GalleryData";
import { GalleryData } from "../../Data/index.js";

const GalleryImages = () => {
    const [gallery, setgallery] = useState(false)

    const toggleGallery = () => {
        if (gallery) {
            setgallery(false)
        }
        else {
            setgallery(true)
        }
    }
    return (
        <>
            <div className="mx-10 md:mx-20 lg:mx-36 xl:mx-[280px]">
                <div className="py-10 max-w-screen-xl mx-auto">
                    <div>
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
                            Tour <span className="text-[#FA7436]">Gallery</span>
                        </h1>
                        <p className="text-xs text-center pt-3 pb-3 px-8 md:px-48 lg:px-56 xl:px-72 2xl:px-80">
                            Discover our fantastic early booking discounts & start planning your
                            journey.
                        </p>
                    </div>

                    <div className='flex justify-center mb-3'>
                        <button onClick={toggleGallery} className="px-1 py-1 bg-[#FA7436] text-white font-bold rounded lg:hidden">Visit Gallery</button>
                    </div>

                    {/* Mobile */}
                    <div className="lg:hidden">
                        <div className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 ${!gallery ? 'hidden' : ''}`}>
                            {GalleryData.map((src, index) => (
                                <div key={index} className="rounded-lg">
                                    <img
                                        src={src}
                                        alt=""
                                        className="w-full h-auto object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Desktop */}
                    <div className="hidden lg:block">
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-4">
                            {GalleryData.map((src, index) => (
                                <div key={index} className="rounded-lg">
                                    <img
                                        src={src}
                                        alt=""
                                        className="w-full h-auto object-cover rounded-lg shadow-md hover:scale-110 duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div >
        </>

    );
};

export default GalleryImages;
