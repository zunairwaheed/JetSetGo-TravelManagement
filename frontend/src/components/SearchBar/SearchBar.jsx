import { React, useRef } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";


const SeachBar = () => {
    const locationRef = useRef('')
    const dateRef = useRef(0)
    const peopleRef = useRef(0)

    const searchHandler = () => {
        const location = locationRef.current.value
        const date = dateRef.current.value
        const people = peopleRef.current.value

        if (location === '' || date === '' || people === '') {
            return alert('Please fill all the fields')
        }

    }
    return (
        <>
            <div className="my-10 mx-10 md:mx-20 lg:mx-36 xl:mx-[280px] lg:pb-3 xl:pb-0 rounded flex flex-col lg:flex-row md:justify-evenly shadow-lg">
                <div className="xl:p-[2px] gap-5 lg:gap-0 flex flex-col lg:flex-row items-center">

                    <div className='lg:border-r-2 lg:pr-3'>
                        <div className="flex items-center gap-1">
                            <IoLocationSharp className='text-[#FA7436]' />
                            <p className="font-semibold text-base xl:text-xl">Location</p>
                        </div>
                        <div className="">
                            <input type="text" placeholder='Where are you going' className='border-2 border-[#FA7436] rounded-lg outline-none text-center w-48' ref={locationRef} />
                        </div>
                    </div>

                    <div className='lg:pl-3 lg:pr-3 lg:border-r-2'>
                        <div className="flex items-center gap-1">
                            <BsCalendar2DateFill className='text-[#FA7436]' />
                            <p className="font-semibold text-base xl:text-xl">Date</p>
                        </div>
                        <div className="">
                            <input type="date" placeholder='When you will go' className='px-2 border-2 border-[#FA7436] rounded-lg outline-none text-center w-48' ref={dateRef} />
                        </div>
                    </div>

                    <div className='lg:pl-3'>
                        <div className="flex items-center gap-1">
                            <IoPeopleSharp className='text-[#FA7436]' />
                            <p className="font-semibold text-base xl:text-xl">Guest</p>
                        </div>
                        <div className="">
                            <input type="number" placeholder='No of guest' className='border-2 border-[#FA7436] rounded-lg outline-none text-center w-48' ref={peopleRef} />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mb-3 lg:mb-0'>
                    <button className="bg-[#FA7436] w-26 xl:w-36 px-2 py-2 mt-3 lg:mt-3 xl:my-5 rounded font-semibold text-base xl:text-xl text-white active:bg-[#FEDCCC] active:text-[#FA7436]" onClick={searchHandler}> Search
                    </button>
                </div>
            </div>
        </>
    )
}

export default SeachBar