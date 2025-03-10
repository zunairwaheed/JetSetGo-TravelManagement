import React, { useState } from 'react';
import { FaAlignJustify } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { FaPlaneDeparture } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../context/AuthSlice.jsx"; // Import Redux logout action

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user); // Get user from Redux store

    const Logout = () => {
        dispatch(logout()); // Dispatch logout action
        navigate('/');
    };

    const [visible, setVisible] = useState(false);

    // Toggle menu visibility
    const toggleMenu = () => setVisible(true);
    const handleMenu = () => setVisible(false);

    return (
        <>
            <header>
                <div className="mt-10 mx-10 md:mx-20 lg:mx-36 xl:mx-[280px] flex items-center justify-between sticky top-0">
                    <div className="flex items-center gap-2">
                        <button onClick={toggleMenu}>
                            <FaAlignJustify color="#FA7436" className='md:hidden' />
                        </button>
                        <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                            Jet<span className='text-main'>Set</span>Go
                        </p>
                        <FaPlaneDeparture className='hidden md:block' color="#FA7436" size="30px" />
                    </div>

                    <div className='hidden md:block space-x-2'>
                        <NavLink to="/" className={({ isActive }) =>
                            `hover:bg-main hover:text-white cursor-pointer p-2 rounded ${isActive ? "bg-gray-200" : ""
                            } active:bg-black`}>Home</NavLink>
                        <NavLink to="/about" className={({ isActive }) =>
                            `hover:bg-main hover:text-white cursor-pointer p-2 rounded ${isActive ? "bg-gray-200" : ""
                            } active:bg-black`}>About</NavLink>
                        <NavLink to="/tours" className={({ isActive }) =>
                            `hover:bg-main hover:text-white cursor-pointer p-2 rounded ${isActive ? "bg-gray-200" : ""
                            } active:bg-black`}>Tour</NavLink>
                    </div>

                    {/* Mobile Menu Bar */}
                    <div className={`w-0 h-full fixed top-0 left-0 bg-white transition-all overflow-hidden ${visible ? "w-full" : "w-0"}`}>
                        <div onClick={handleMenu} className='p-5'><IoMdArrowRoundBack color="#FA7436" /></div>

                        <div className="relative flex justify-center">
                            <ul id="mobile-menu" className="transition-all bg-white w-full text-center md:hidden flex flex-col absolute top-5">
                                <NavLink to="/" onClick={handleMenu} className="hover:bg-main hover:text-white cursor-pointer p-2 rounded">Home</NavLink>
                                <NavLink to="/about" onClick={handleMenu} className="hover:bg-main hover:text-white cursor-pointer p-2 rounded">About</NavLink>
                                <NavLink to="/tours" onClick={handleMenu} className="hover:bg-main hover:text-white cursor-pointer p-2 rounded">Tour</NavLink>
                            </ul>
                        </div>
                    </div>

                    <div className="md:space-x-1">
                        {
                            user ? (
                                <>
                                    <div className='flex gap-5 items-center'>
                                        {/* <div className='w-10 h-10 rounded-full bg-red-700'>
                                            <img
                                                className="w-full h-full object-cover"
                                                src={user?.profilePic ? `/images/${user.profilePic}` : "/images/login.jpeg"}
                                                alt="Profile Picture"
                                                onError={(e) => e.target.src = "/images/login.jpeg"} // Fallback for broken images
                                            />
                                        </div> */}
                                        <div className='text-center bg-slate-200 p-1 rounded'>
                                            <h5 className='font-semibold'>{user.username}</h5>
                                        </div>
                                        <div>
                                            <button className='bg-main hover:bg-[#FEDCCC] hover:text-main w-13 md:w-20 lg:w-32 h-6 md:h-8 lg:h-10 text-sm px-1 md:text-base lg:text-md text-white font-bold rounded-md' onClick={Logout}>Logout</button>
                                        </div>
                                    </div>
                                    <div className='flex justify-end mt-2'>
                                        <NavLink to="/admin">
                                            <button className='bg-main hover:bg-[#FEDCCC] hover:text-main w-14 md:w-16 lg:w-16 h-7 md:h-8 lg:h-8 text-sm md:text-md lg:text-md text-white font-semibold rounded-md shadow-md transition-all duration-300 ease-in-out'>
                                                Admin
                                            </button>
                                        </NavLink>
                                    </div>
                                    <div className='flex justify-end mt-2'>
                                        <NavLink to="/settings">
                                            <button><IoSettingsSharp className='text-main active:text-[#FEDCCC] text-base md:text-xl'/></button>
                                        </NavLink>
                                        
                                    </div>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/login">
                                        <button
                                            className="bg-white hover:bg-[#FC9A73] text-main hover:text-white w-13 md:w-20 lg:w-32 h-6 md:h-8 px-1 lg:h-10 text-sm md:text-base lg:text-md font-bold rounded-md">
                                            Login
                                        </button>
                                    </NavLink>
                                    <NavLink to="/signup">
                                        <button
                                            className="bg-main hover:bg-[#FEDCCC] hover:text-main w-13 md:w-20 lg:w-32 h-6 md:h-8 lg:h-10 text-sm px-1 md:text-base lg:text-md text-white font-bold rounded-md">
                                            Signup
                                        </button>
                                    </NavLink>
                                </>
                            )
                        }
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
