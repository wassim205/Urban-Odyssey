import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // toggle the search bar only on these two routes
  const showSearch = ["/dashboard", "/urban-odyssey"].includes(pathname);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const navLinks = [
    { href: "/about", icon: "/src/assets/icons/ask.svg", text: "ABOUT" },
    {
      href: "/favorites",
      icon: "/src/assets/icons/bookmark.svg",
      text: "FAVORITES",
    },
    {
      href: "/reviews",
      icon: "/src/assets/icons/reviews.svg",
      text: "REVIEWS",
    },
    {
      href: "/contact",
      icon: "/src/assets/icons/contact-us.svg",
      text: "CONTACT",
    },
    {
      href: "/profile",
      icon: "/src/assets/icons/account.svg",
      text: "PROFILE",
    },
    { href: "/logout", icon: "/src/assets/icons/logout.svg", text: "LOG OUT" },
  ];

  return (
    <div className="w-full bg-[#4B4B4D] shadow-md">
      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-3 items-center px-4 lg:px-8 h-16">
        {/* Left: show only on specific routes */}
        {showSearch ? (
          <div className="flex items-center lg:pl-8 xl:pl-16">
            <SearchBar />
          </div>
        ) : (
          <div />
        )}

        {/* Center */}
        <a href="/urban-odyssey">
          <h1 className="justify-self-center font-righteous text-[#D8C292] text-4xl drop-shadow-2xl whitespace-nowrap">
            URBAN ODYSSEY
          </h1>
        </a>

        {/* Right */}
        <div className="flex justify-end items-center space-x-4 font-bebas text-[#9D9D9D] text-2xl pr-4">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="flex items-center hover:text-white transition"
            >
              <img src={link.icon} className="w-5 h-5 mr-1" alt={link.text} />
              <span className="hidden xl:inline">{link.text}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex justify-between items-center px-4 h-16">
      <a href="/urban-odyssey"> <h1 className="font-righteous text-[#D8C292] text-3xl drop-shadow-2xl">
          URBAN ODYSSEY
        </h1></a>
        <div className="flex items-center gap-2">
          {showSearch && (
            <div className="sm:block hidden">
              <SearchBar />
            </div>
          )}
          <button
            onClick={toggleMenu}
            className="text-white p-2 hover:bg-[#5a5a5c] rounded-md transition"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#4B4B4D] pb-4 px-4 border-t border-gray-600 animate-fadeIn">
          {showSearch && (
            <div className="sm:hidden mb-4 pt-4">
              <SearchBar />
            </div>
          )}
          <div className="flex flex-col space-y-4 font-bebas text-[#9D9D9D] text-xl">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="flex items-center hover:text-white transition py-2 px-1 hover:bg-[#5a5a5c] rounded-md"
              >
                <img src={link.icon} className="w-6 h-6 mr-3" alt={link.text} />
                {link.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
