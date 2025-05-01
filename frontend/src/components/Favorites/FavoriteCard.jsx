import React from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FavoriteCard({ location, onRemove }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/urban-odyssey", {
      state: {
        lat: location.place.latitude,
        lng: location.place.longitude,
      },
    });
  };

  return (
    <div className="bg-[#293D36]/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border
     border-[#D8C292]/30 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
    >
      <div className="relative" onClick={handleCardClick}>
        <img
          src={location.place.image_url || "/placeholder.svg"}
          alt={`Map of ${location.place.name}`}
          className="w-full h-48 object-cover cursor-pointer"
        />
        <button className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition">
          <Heart className="h-5 w-5 text-[#D8C292] fill-[#D8C292]" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#D8C292] mb-1">
          {location.place.name}
        </h3>
        <p className="text-[#9D9D9D]">
          {location.place.city || location.place.country
            ? `(${location.place.city ?? "–"}, ${
                location.place.country ?? "–"
              })`
            : "Location details unavailable"}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <button className="text-sm text-[#D8C292] hover:text-white transition">
            View Details
          </button>
          <button
            onClick={onRemove}
            className="text-sm text-[#D8C292] hover:text-white transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;