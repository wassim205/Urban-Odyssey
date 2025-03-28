import React, { useState } from 'react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <nav className="relative flex justify-center items-center w-full px-4 py-4">
      {/* Centered Title */}
      <h1 className="text-[#D8C292] text-[40px] font-righteous">
        URBAN ODYSSEY
      </h1>

      {/* Desktop nav: visible on medium screens and up */}
      <ul className="hidden md:flex absolute right-0 space-x-4 mr-10">
        <li>
          <a 
            href="/login"
            className="text-white font-bebas text-[30px]"
          >
            JOIN US
          </a>
        </li>
      </ul>

      {/* Mobile nav: hamburger menu */}
      <div className="md:hidden absolute right-0 mr-4">
        <button 
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          )}
        </button>
        {isMenuOpen && (
          <ul className="absolute right-5 z-50 h-16 text-center flex items-center justify-center w-80 mt-3 bg-[#293D36] rounded shadow">
            <li>
              <a 
                href="/login" 
                className="text-white font-bebas text-[20px] block"
                onClick={() => setIsMenuOpen(false)}
              >
                JOIN US
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
