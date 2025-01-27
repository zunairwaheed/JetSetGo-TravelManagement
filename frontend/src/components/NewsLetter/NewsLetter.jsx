import React from 'react'

const NewsLetter = () => {
    return (
        <>
            <div className="pt-5 pb-10 mx-10 mb-10 md:mx-20 lg:mx-36 xl:mx-[280px] bg-[#FA7436] rounded-lg">
                <p className="text-white text-lg md:text-2xl lg:text-3xl font-bold text-center pb-10">
                    Subscribe and get exclusive <br />
                    deals & offer
                </p>
                <div className="md:bg-white md:w-72 lg:w-96 mx-auto flex flex-col md:flex-row items-center rounded gap-1 md:gap-4 lg:gap-14">
                    <input className="md:h-10 lg:h-12 ml-2 outline-none rounded text-center" type="text" placeholder="Enter your email"/>
                    <button
                        className="bg-white text-[#FA7436] md:bg-[#FA7436] md:active:bg-[#FEDCCC] md:text-white md:active:text-[#FA7436] w-13 md:w-20 lg:w-32 h-6 md:h-8 lg:h-10 px-2 text-sm md:text-base lg:text-md font-bold rounded-md">
                        Subscribe
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewsLetter