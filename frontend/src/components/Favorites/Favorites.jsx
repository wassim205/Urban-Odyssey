import React from "react";
import Navbar from "../Dashboard/Navbar";
import { MapProvider } from "../Context/MapContext";
import city from "./../../images/City.png";
import MainContent from "./MainContent";

function Favorites() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center overflow-hidden w-full"
      style={{ backgroundImage: `url(${city})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#293D36] bg-opacity-60 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">
        <MapProvider>
          <Navbar />
          <MainContent />
        </MapProvider>
      </div>
    </div>
  );
}

export default Favorites;