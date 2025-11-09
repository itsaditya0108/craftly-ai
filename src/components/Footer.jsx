import React from 'react';
import { FaGithub, FaGlobe } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full mt-16 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#0e0e10] text-gray-700 dark:text-gray-300 py-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">

                {/* Left Text */}
                <p className="text-[14px]">
                    Made with ❤️ by <span className="font-semibold text-purple-500">Aditya Verma</span>
                </p>

                {/* Links */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/itsaditya0108"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View on GitHub"
                        className="flex items-center gap-2 hover:text-purple-500 transition-colors"
                    >
                        <FaGithub /> <span className="hidden sm:inline">GitHub</span>
                    </a>

                    <a
                        href="https://itsaditya0108.github.io/adityaportfolio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Visit Portfolio"
                        className="flex items-center gap-2 hover:text-purple-500 transition-colors"
                    >
                        <FaGlobe /> <span className="hidden sm:inline">Portfolio</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
