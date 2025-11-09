import React from 'react';
import { HiSun, HiMoon } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";
import useTheme from '../hooks/useTheme';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-[80px] border-b border-gray-200 dark:border-gray-700
                        bg-white dark:bg-[#141319] transition-all duration-300 shadow-sm">

            {/* Logo */}
            <div className="logo flex items-center gap-2">
                <h3 className="text-[26px] font-bold tracking-wider text-gray-900 dark:text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700">
                        Craftly
                    </span>

                </h3>
                <span className="hidden md:inline text-gray-500 dark:text-gray-400 text-sm tracking-wide">
                    — AI Component Generator
                </span>
            </div>

            {/* Icons */}
            <div className="icons flex items-center gap-4 md:gap-5">
                {/* Theme Toggle */}
                <button
                    title="Toggle Theme"
                    onClick={toggleTheme}
                    className="w-[40px] h-[40px] flex items-center justify-center text-gray-700 dark:text-gray-300 
                               hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg transition-all duration-200"
                >
                    {theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />}
                </button>

                {/* User Profile */}
                <button
                    title="User Profile"
                    className="w-[40px] h-[40px] flex items-center justify-center text-gray-700 dark:text-gray-300 
                               hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg transition-all duration-200"
                >
                    <FaUser size={18} />
                </button>

                {/* Settings */}
                <button
                    title="Settings"
                    className="w-[40px] h-[40px] flex items-center justify-center text-gray-700 dark:text-gray-300 
                               hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg transition-all duration-200"
                >
                    <RiSettings3Fill size={20} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
