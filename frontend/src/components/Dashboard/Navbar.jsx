import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-[#4B4B4D] min-h-16">
      {/* Desktop Navigation */}
      <div className="hidden lg:grid lg:grid-cols-3 items-center px-4 lg:px-8 h-16">
        {/* Left column: Search */}
        <div className="flex items-center lg:pl-8 xl:pl-40">
          <SearchBar />
        </div>

        {/* Center column: perfectly centered title */}
        <h1 className="justify-self-center font-righteous text-[#D8C292] text-4xl drop-shadow-2xl whitespace-nowrap">
          URBAN ODYSSEY
        </h1>

        {/* Right column: links with consistent spacing */}
        <div className="flex justify-end items-center space-x-2 md:space-x-4 lg:space-x-6 font-bebas text-[#9D9D9D] text-lg md:text-xl lg:text-2xl">
          <a href="/about" className="flex items-center hover:text-white transition">
            <img src="/src/assets/icons/ask.svg" className="w-5 h-5 md:w-6 md:h-6 mr-1 md:mr-2" alt="Ask" />
            ABOUT
          </a>
          <a href="/favorites" className="flex items-center hover:text-white transition">
            <img src="/src/assets/icons/bookmark.svg" className="w-5 h-5 md:w-6 md:h-6 mr-1 md:mr-2" alt="Favorites" />
            FAVORITES
          </a>
          <a href="/reviews" className="flex items-center hover:text-white transition">
            <img src="/src/assets/icons/reviews.svg" className="w-5 h-5 md:w-6 md:h-6 mr-1 md:mr-2" alt="Reviews" />
            REVIEWS
          </a>
          <a href="/contact" className="flex items-center hover:text-white transition">
            <img src="/src/assets/icons/contact-us.svg" className="w-5 h-5 md:w-6 md:h-6 mr-1 md:mr-2" alt="Contact" />
            CONTACT
          </a>
          <a href="/profile" className="flex items-center hover:text-white transition">
            <img src="/src/assets/icons/account.svg" className="w-5 h-5 md:w-6 md:h-6 mr-1 md:mr-2" alt="Profile" />
            PROFILE
          </a>
          <a href="/logout" className="flex items-center whitespace-nowrap hover:text-white transition">
            <img src="/src/assets/icons/logout.svg" className="w-5 h-5 md:w-6 md:h-6 mr-1 md:mr-2" alt="Log out" />
            LOG OUT
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex justify-between items-center px-4 h-16">
        <h1 className="font-righteous text-[#D8C292] text-2xl sm:text-3xl drop-shadow-2xl">
          URBAN ODYSSEY
        </h1>
        
        <button onClick={toggleMenu} className="text-white p-2">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#4B4B4D] pb-4 px-4">
          <div className="mb-4">
            <SearchBar />
          </div>
          
          <div className="flex flex-col space-y-4 font-bebas text-[#9D9D9D] text-xl">
            <a href="/about" className="flex items-center hover:text-white transition">
              <img src="/src/assets/icons/ask.svg" className="w-6 h-6 mr-2" alt="Ask" />
              ABOUT
            </a>
            <a href="/favorites" className="flex items-center hover:text-white transition">
              <img src="/src/assets/icons/bookmark.svg" className="w-6 h-6 mr-2" alt="Favorites" />
              FAVORITES
            </a>
            <a href="/reviews" className="flex items-center hover:text-white transition">
              <img src="/src/assets/icons/reviews.svg" className="w-6 h-6 mr-2" alt="Reviews" />
              REVIEWS
            </a>
            <a href="/contact" className="flex items-center hover:text-white transition">
              <img src="/src/assets/icons/contact-us.svg" className="w-6 h-6 mr-2" alt="Contact" />
              CONTACT
            </a>
            <a href="/profile" className="flex items-center hover:text-white transition">
              <img src="/src/assets/icons/account.svg" className="w-6 h-6 mr-2" alt="Profile" />
              PROFILE
            </a>
            <a href="/logout" className="flex items-center hover:text-white transition">
              <img src="/src/assets/icons/logout.svg" className="w-6 h-6 mr-2" alt="Log out" />
              LOG OUT
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar