import React, { useState, useContext } from 'react'
import { FaAlignJustify } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
// import logo from "../../assets/logo.png"
import { FaPlaneDeparture } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AuthContext } from '../../context/AuthContext';



const Header = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext)

    const Logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
    }

    const [visible, setVisible] = useState(false);

    // Toggle menu visibility
    const toggleMenu = () => {
        setVisible(true);
    };
    const handleMenu = () => {
        setVisible(false)
    }
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
                                        <div className='text-center bg-slate-200 p-1 rounded'>
                                            <h5 className='font-semibold'>{user.username}</h5>
                                        </div>
                                        <div>
                                            <button className='bg-main hover:bg-[#FEDCCC] hover:text-main w-13 md:w-20 lg:w-32 h-6 md:h-8 lg:h-10 text-sm px-1 md:text-base lg:text-md text-white font-bold rounded-md' onClick={Logout}>Logout</button>
                                        </div>
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
    )
}

export default Header