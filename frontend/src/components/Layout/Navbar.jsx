import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  const showSearch = ["/dashboard", "/urban-odyssey"].includes(pathname);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const navLinks = [];

  navLinks.push({
    to: "/about",
    icon: "/src/assets/icons/ask.svg",
    text: "ABOUT",
  });

  if (authToken && userRole === "user") {
    navLinks.push(
      {
        to: "/favorites",
        icon: "/src/assets/icons/bookmark.svg",
        text: "FAVORITES",
      },
      {
        to: "/reviews",
        icon: "/src/assets/icons/reviews.svg",
        text: "REVIEWS",
      },
      {
        to: "/contact",
        icon: "/src/assets/icons/contact-us.svg",
        text: "CONTACT",
      },
      {
        to: "/profile",
        icon: "/src/assets/icons/account.svg",
        text: "PROFILE",
      },
      { to: "/logout", icon: "/src/assets/icons/logout.svg", text: "LOG OUT" }
    );
  } else if (authToken && userRole === "admin") {
    navLinks.push(
      {
        to: "/dashboard",
        icon: "/src/assets/icons/ask.svg",
        text: "DASHBOARD",
      },
      { to: "/logout", icon: "/src/assets/icons/logout.svg", text: "LOG OUT" }
    );
  } else {
    // Add JOIN link for visitors
    navLinks.push({
      to: "/login",
      icon: "/src/assets/icons/account.svg",
      text: "JOIN",
    });
  }
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
        <Link to="/urban-odyssey">
          <h1 className="justify-self-center font-righteous text-[#D8C292] text-4xl drop-shadow-2xl whitespace-nowrap">
            URBAN ODYSSEY
          </h1>
        </Link>

        {/* Right */}
        <div className="flex justify-end items-center space-x-3 font-bebas text-[#9D9D9D] text-2xl pr-4">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="flex items-center hover:text-white transition"
            >
              <img src={link.icon} className="w-6 h-6 mr-1" alt={link.text} />
              <span className="hidden xl:inline">{link.text}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex justify-between items-center px-4 h-16">
        <Link to="/urban-odyssey">
          <h1 className="font-righteous text-[#D8C292] text-3xl drop-shadow-2xl">
            URBAN ODYSSEY
          </h1>
        </Link>
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
        <div className="lg:hidden bg-[#4B4B4D] py-2 px-4 border-t border-gray-600 animate-fadeIn">
          {showSearch && (
            <div className="sm:hidden mb-4 pt-4">
              <SearchBar />
            </div>
          )}
          <div className="flex flex-col space-y-4 font-bebas text-[#9D9D9D] text-xl">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                className="flex items-center hover:text-white transition py-2 px-1 hover:bg-[#5a5a5c] rounded-md"
              >
                <img src={link.icon} className="w-6 h-6 mr-3" alt={link.text} />
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
