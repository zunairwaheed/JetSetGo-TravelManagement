import { React } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import { useForm } from 'react-hook-form';

const SearchBar = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const searchHandler = (data) => {
        const { location, date, people } = data;

        if (!location || !date || !people) {
            alert('Please fill all the fields');
            return;
        }

        console.log("Searching with: ", data);
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(searchHandler)}
                className="my-10 mx-10 md:mx-20 lg:mx-36 xl:mx-[280px] lg:pb-3 xl:pb-0 rounded flex flex-col lg:flex-row md:justify-evenly shadow-lg"
            >
                <div className="xl:pb-2 gap-5 lg:gap-0 flex flex-col lg:flex-row items-center text-sm">

                    <div className='lg:border-r-2 lg:pr-3'>
                        <div className="flex items-center gap-1">
                            <IoLocationSharp className='text-[#FA7436]' />
                            <p className="font-semibold text-base xl:text-xl">Location</p>
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder='Where are you going'
                                className='border-2 border-[#FA7436] rounded-lg outline-none text-center w-48 h-10 placeholder-gray-500'
                                {...register('location', { required: true })}
                            />
                            {errors.location && <p className="text-red-500 text-xs">Location is required</p>}
                        </div>
                    </div>

                    <div className='lg:px-3 lg:border-r-2'>
                        <div className="flex items-center gap-1">
                            <BsCalendar2DateFill className='text-[#FA7436]' />
                            <p className="font-semibold text-base xl:text-xl">Date</p>
                        </div>
                        <div className="">
                            <input
                                type="date"
                                placeholder='When you will go'
                                className='px-2 border-2 border-[#FA7436] rounded-lg outline-none text-center w-48 h-10 text-gray-500'
                                {...register('date', { required: true })}
                            />
                            {errors.date && <p className="text-red-500 text-xs">Date is required</p>}
                        </div>
                    </div>

                    <div className='lg:pl-3'>
                        <div className="flex items-center gap-1">
                            <IoPeopleSharp className='text-[#FA7436]' />
                            <p className="font-semibold text-base xl:text-xl">Guest</p>
                        </div>
                        <div className="">
                            <input
                                type="number"
                                placeholder='No of guest'
                                className='border-2 border-[#FA7436] rounded-lg outline-none text-center w-48 h-10 placeholder-gray-500'
                                {...register('people', { required: true })}
                            />
                            {errors.people && <p className="text-red-500 text-xs">Number of guests is required</p>}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mb-3 lg:mb-0'>
                    <button
                        type="submit"
                        className="bg-[#FA7436] w-26 lg:mt-3 xl:w-36 xl:text-xl xl:my-5 px-2 py-2 mt-3 rounded font-semibold text-base text-white active:bg-[#FEDCCC] active:text-[#FA7436]"
                    >
                        Search
                    </button>
                </div>
            </form>
        </>
    );
}

export default SearchBar;
