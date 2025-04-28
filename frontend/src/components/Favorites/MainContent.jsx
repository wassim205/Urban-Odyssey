import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axiosConfig from "../../config/axiosConfig";
import FavoriteCard from "./FavoriteCard";
import { Toaster } from "sonner";


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

  const handleRemove = async (id) => {
    try {
      await axiosConfig.delete(`favorites/${id}`);
      setFavorites((prev) => prev.filter((loc) => loc.id !== id));
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to remove favorite"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-[#D8C292]">Loading favorites...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bebas text-[#D8C292] mb-8 text-center">
        mes préférés
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
      <Toaster position="top-right" richColors />
      </>

  );
}

export default MainContent;