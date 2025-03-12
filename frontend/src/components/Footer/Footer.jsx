import React from 'react'
import { FaFacebook, FaPlaneDeparture } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import logo from "../../assets/logo.png"

const Footer = () => {
    return (
        <>
            <footer>
                <div className="pt-5 pb-10 mx-10 md:mx-20 lg:mx-36 xl:mx-[280px]">
                    <div className="flex flex-col md:flex-row pb-3">
                        <div className="md:w-1/2">
                            <div className="flex gap-2 justify-center md:justify-start items-center">
                                {/* <p className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold">
                                Jet<span className='text-main'>Set</span>Go
                                </p>
                                <FaPlaneDeparture className='hidden md:block' color="#FA7436" size="30px" /> */}
                                <img className='w-20 lg:w-24' src={logo} alt="" />
                            </div>

                            <div className="text-center md:text-start py-3">
                                <p className="text-xs lg:text-sm">
                                    Book your trip in minute, get full <br />
                                    Control for much longer.
                                </p>
                            </div>

                            <div className="flex justify-center md:justify-start gap-2">
                                <NavLink to="" className='active:text-main'><FaFacebook className='md:size-6' /></NavLink>
                                <NavLink to="" className='active:text-main'><FaInstagramSquare className='md:size-6' /></NavLink>
                                <NavLink to="" className='active:text-main'><FaTwitterSquare className='md:size-6' /></NavLink>
                            </div>
                        </div>

                        <div className="md:w-1/2 flex justify-between mt-3 md:mt-0">
                            <div>
                                <h1 className="font-bold">Company</h1>
                                <div className="flex flex-col text-xs lg:text-sm leading-7 lg:leading-7">
                                    <NavLink to="/" className='hover:text-main'>Home</NavLink>
                                    <NavLink to="/about" className='hover:text-main'>About</NavLink>
                                    <NavLink to="/tours" className='hover:text-main'>Tours</NavLink>
                                    <NavLink to="/signup" className='hover:text-main'>SignUp</NavLink>
                                    <NavLink to="/login" className='hover:text-main'>LogIn</NavLink>
                                </div>
                            </div>
                            <div>
                                <h1 className="font-bold">Contact</h1>
                                <div className="flex flex-col text-xs lg:text-sm leading-7 lg:leading-7">
                                    <NavLink className='hover:text-main'>Low fare tips</NavLink>
                                    <NavLink className='hover:text-main'>Career</NavLink>
                                    <NavLink className='hover:text-main'>Press</NavLink>
                                    <NavLink className='hover:text-main'>Affilates</NavLink>
                                </div>
                            </div>
                            <div>
                                <h1 className="font-bold">More</h1>
                                <div className="flex flex-col text-xs lg:text-sm leading-7 lg:leading-7">
                                    <NavLink className='hover:text-main'>Our Press</NavLink>
                                    <NavLink className='hover:text-main'>Our Blog</NavLink>
                                    <NavLink className='hover:text-main'>Low fare tips</NavLink>
                                    <NavLink className='hover:text-main'>Logistics</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                        <div className="mt-3 text-xs lg:text-sm flex justify-center">
                            <div>
                                <p>&copy; CopyWrite, All rights reserved by Ch Zunair</p>
                            </div>
                        </div>
                </div>
            </footer>
        </>
    )
}

export default Footer