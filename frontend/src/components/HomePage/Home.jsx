import React from "react";
import NavBar from "./NavBar";
import MainContent from "./MainContent";
import city from "./../../images/City.png"

const Home = () => (
    <div 
        className="relative min-h-screen bg-cover bg-center overflow-hidden w-full"
        style={{ backgroundImage: `url(${city})` }}
    >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#293D36] bg-opacity-60 pointer-events-none"></div>

        {/* Content (Ensure it's on top of overlay) */}
        <div className="relative z-10">
            <NavBar />
            <MainContent />
        </div>
    </div>
);

export default Home;