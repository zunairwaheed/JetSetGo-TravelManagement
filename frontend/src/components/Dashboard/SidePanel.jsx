import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`bg-gray-900 text-white h-screen p-5 pt-8 relative transition-all duration-300 ${isOpen ? "w-64" : "w-20"
                    }`}
            >
                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 text-white focus:outline-none"
                >
                    {isOpen ? "✖" : "☰"}
                </button>

                {/* Logo */}
                <div className="flex items-center space-x-2 pb-6 border-b border-gray-700">
                    <span className="text-xl font-bold">{isOpen ? "Admin Panel" : "AP"}</span>
                </div>

                {/* Navigation Links */}
                <nav className="mt-8 space-y-4">
                    <SidebarItem text="Dashboard" to="/dashboard" isOpen={isOpen} />
                    <SidebarItem text="Tour Management" to="/tourmanagement" isOpen={isOpen} />
                    <SidebarItem text="User Management" to="/usermanagement" isOpen={isOpen} />
                    <SidebarItem text="Gallery Management" to="/gallerymanagement" isOpen={isOpen} />
                    <SidebarItem text="Booking Management" to="/bookingmanagement" isOpen={isOpen} />
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-5 w-full">
                    <SidebarItem text="Logout" to="/" isOpen={isOpen} />
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ text, to, isOpen }) {
    return (
        <Link
            to={to}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 transition-all"
        >
            <span className="text-base">{isOpen ? text : text.charAt(0)}</span>
        </Link>
    );
}
