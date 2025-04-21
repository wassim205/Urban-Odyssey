import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/about", icon: "/src/assets/icons/ask.svg", text: "ABOUT" },
    { href: "/favorites", icon: "/src/assets/icons/bookmark.svg", text: "FAVORITES" },
    { href: "/reviews", icon: "/src/assets/icons/reviews.svg", text: "REVIEWS" },
    { href: "/contact", icon: "/src/assets/icons/contact-us.svg", text: "CONTACT" },
    { href: "/profile", icon: "/src/assets/icons/account.svg", text: "PROFILE" },
    { href: "/logout", icon: "/src/assets/icons/logout.svg", text: "LOG OUT" }
  ];

  return (
    <div className="w-full bg-[#4B4B4D] shadow-md">
      {/* Desktop Navigation */}
      <div className="hidden lg:grid lg:grid-cols-3 items-center px-4 lg:px-8 h-16">
        {/* Left column: Search */}
        <div className="flex items-center lg:pl-8 xl:pl-16">
          <SearchBar />
        </div>

        {/* Center column: perfectly centered title */}
        <h1 className="justify-self-center font-righteous text-[#D8C292] text-4xl drop-shadow-2xl whitespace-nowrap">
          URBAN ODYSSEY
        </h1>

        {/* Right column: links with consistent spacing */}
        <div className="flex justify-end items-center space-x-2 md:space-x-3 lg:space-x-4 font-bebas text-[#9D9D9D] text-lg md:text-xl lg:text-2xl pr-2">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} className="flex items-center hover:text-white transition whitespace-nowrap">
              <img 
                src={link.icon} 
                className="w-5 h-5 md:w-5 md:h-5 mr-1" 
                alt={link.text} 
              />
              <span className="hidden xl:inline">{link.text}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex justify-between items-center px-4 h-16">
        <h1 className="font-righteous text-[#D8C292] text-2xl sm:text-3xl drop-shadow-2xl whitespace-nowrap">
          URBAN ODYSSEY
        </h1>
        
        <div className="flex items-center gap-2">
          <div className="sm:block hidden">
            <SearchBar />
          </div>
          <button 
            onClick={toggleMenu} 
            className="text-white p-2 hover:bg-[#5a5a5c] rounded-md transition duration-200"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#4B4B4D] pb-4 px-4 border-t border-gray-600 animate-fadeIn">
          <div className="sm:hidden mb-4 pt-4">
            <SearchBar />
          </div>
          
          <div className="flex flex-col space-y-4 font-bebas text-[#9D9D9D] text-xl">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="flex items-center hover:text-white transition py-2 px-1 hover:bg-[#5a5a5c] rounded-md"
              >
                <img 
                  src={link.icon} 
                  className="w-6 h-6 mr-3" 
                  alt={link.text} 
                />
                {link.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar