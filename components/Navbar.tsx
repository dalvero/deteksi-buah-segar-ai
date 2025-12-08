"use client";

import { useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // SIMULASAI EFFECT SCROLL
  useState(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/80 backdrop-blur-md shadow-sm'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* LOGO */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-linear-to-br from-teal-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="14" r="7" fill="white" opacity="0.9"/>
              <path d="M12 7 Q11 5 10 7 Q11 6 12 7 Q13 6 14 7 Q13 5 12 7Z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
            BuahAI
          </h1>
        </a>

        {/* NAVIGASI */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#home" className="hover:text-teal-600 transition-colors relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
          </a>
          <a href="#upload" className="hover:text-teal-600 transition-colors relative group">
            Upload
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
          </a>
          <a href="#features" className="hover:text-teal-600 transition-colors relative group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
          </a>
          <a href="#about" className="hover:text-teal-600 transition-colors relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
          </a>
        </div>

        {/* CTA BUTTONS */}
        <a
          href="#upload"
          className="px-6 py-2.5 bg-linear-to-r from-teal-600 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
        >
          <span>Try Demo</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
          </svg>
        </a>
      </div>
    </nav>
  );
}
