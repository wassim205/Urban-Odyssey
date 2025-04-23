import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import axiosConfig from "./../../config/axiosConfig";
import { toast } from "sonner";

function MainContent() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const response = await axiosConfig.get("favorites");
        setFavorites(response.data.data || []);
        toast.success("Favorites loaded successfully");
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load favorites"
        );
      } finally {
        setLoading(false);
      }
    };

    getFavorites();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-[#D8C292]">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-righteous text-[#D8C292] mb-8 text-center">
        My Favorite Places
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-[#9D9D9D]">
          You have no favorite places yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((location) => (
            <FavoriteCard
              key={location.id}
              location={location}
              onRemove={() => handleRemove(location.id)}
            />
          ))}
        </div>
      )}
    </div>
  );

  async function handleRemove(id) {
    try {
      await axiosConfig.delete(`favorites/${id}`);
      setFavorites((prev) => prev.filter((loc) => loc.id !== id));
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to remove favorite"
      );
    }
  }
}

function FavoriteCard({ location, onRemove }) {
  return (
    <div className="bg-[#293D36]/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-[#D8C292]/30 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={location.place.image_url || "/placeholder.svg"}
          alt={`Map of ${location.place.name}`}
          className="w-full h-48 object-cover"
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

export default MainContent;
