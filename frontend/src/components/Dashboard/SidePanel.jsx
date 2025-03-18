import { Link, NavLink, Outlet } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdTour } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
export default function Sidebar() {

    return (
        <>
            <div className="flex flex-col md:flex-row px-3 my-10">
                {/* Sidebar for Desktop */}
                <div className="bg-gray-900 h-[850px] text-white px-5 py-8 w-64 hidden md:block rounded">

                    <div className="pb-6 border-b border-gray-700 text-xl font-bold text-center">Admin Panel</div>

                    <nav className="mt-8 space-y-4">
                        <NavLink to="/admin" className="block p-3 rounded-lg hover:bg-gray-700" >Dashboard</NavLink>
                        <NavLink to="tourmanagement" className={({ isActive }) => `block p-3 rounded-lg hover:bg-gray-700 ${isActive ? "bg-gray-700 text-white" : ""}`}>Tour Management</NavLink>
                        <NavLink to="usermanagement" className={({ isActive }) => `block p-3 rounded-lg hover:bg-gray-700 ${isActive ? "bg-gray-700 text-white" : ""}`}>User Management</NavLink>
                        <NavLink to="gallerymanagement" className={({ isActive }) => `block p-3 rounded-lg hover:bg-gray-700 ${isActive ? "bg-gray-700 text-white" : ""}`}>Gallery Management</NavLink>
                        <NavLink to="bookingmanagement" className={({ isActive }) => `block p-3 rounded-lg hover:bg-gray-700 ${isActive ? "bg-gray-700 text-white" : ""}`}>Booking Management</NavLink>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <Outlet />
                </div>

                {/* Bottom Navigation for Mobile */}
                <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around p-3 md:hidden">
                    <Link to="/admin" className="p-2"><IoHome /></Link>
                    <Link to="tourmanagement" className="p-2"><MdTour /></Link>
                    <Link to="usermanagement" className="p-2"><FaUserCheck /></Link>
                    <Link to="gallerymanagement" className="p-2"><RiGalleryFill /></Link>
                    <Link to="bookingmanagement" className="p-2"><SlCalender /></Link>
                </div>
            </div>
        </>
    );
}
