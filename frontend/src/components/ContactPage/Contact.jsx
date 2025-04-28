import Navbar from "../Layout/Navbar";
import { MapProvider } from "../Context/MapContext";
import city from "./../../images/City.png";
import ContactContent from "./ContactContent";

function Contact() {
  return (
    <div className="relative min-h-screen bg-cover bg-center overflow-hidden w-full">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${city})`,
        }}
      ></div>

      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#293D36]/80 via-[#293D36]/70 to-[#293D36]/90 backdrop-blur-sm pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <MapProvider>
          <Navbar />
          <div className="flex-grow">
            <ContactContent />
          </div>
          <footer className="text-center py-4 text-[#D8C292]/70 text-sm">
            <p>© {new Date().getFullYear()} - Tous droits réservés</p>
          </footer>
        </MapProvider>
      </div>
    </div>
  );
}

export default Contact;