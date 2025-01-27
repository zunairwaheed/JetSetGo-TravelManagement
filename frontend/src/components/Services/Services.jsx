import React, { useRef } from 'react'
import ServicesData from './ServicesData'


const Services = () => {
    return (
        <>
            <div className="bg-blue-200 pb-10 pt-10 mt-10">
                <div className="mx-10 md:mx-20 lg:mx-36 xl:mx-[280px]">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
                        Things you need <span className="text-[#FA7436]">to do</span>
                    </h1>
                    <p className="text-xs text-center px-8 md:px-48 lg:px-56 xl:px-72 2xl:px-80 pt-3">
                        We ensure that you’ll embark on a perfectly planned, safe vacation
                        at a price you can afford.
                    </p>

                    <div className="flex flex-col md:flex-row justify-around items-center">
                        {ServicesData.map((item, index) => (

                            <div key={index} className="w-56 md:w-48 lg:w-60 xl:w-[277px] mt-5 px-2 lg:px-auto py-5 lg:py-10 bg-white rounded">
                                <img className="object-contain w-10 h-10" src={item.imgUrl} alt="" />
                                <p className="font-bold my-3">{item.title}</p>
                                <p className="mb-2 text-sm text-[#666666]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services