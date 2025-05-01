import React, { useContext } from "react";
import { Calendar, MapPin } from 'lucide-react';
import { ProfileContext } from "../Context/ProfileContext";

function FavoritePlacesTab() {
  const { userData, handleRemoveFavoritePlace } = useContext(ProfileContext);

  if (!userData) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
        <MapPin size={18} className="text-[#D8C292]" />
        Favorite Places
      </h3>

      {userData.favorites && userData.favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userData.favorites.map((place) => (
            <div
              key={place.place.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-200">
                <img
                  src={place.place.image_url || "/api/placeholder/400/320"}
                  alt={place.place.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/320";
                  }}
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900">
                  {place.place.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Calendar size={14} /> Saved on{" "}
                  {new Date(place.place.updated_at).toLocaleDateString()}
                </p>
                <button
                  className="mt-2 text-sm text-[#A67C52] hover:text-[#8A5A30] transition-colors flex items-center gap-1"
                  onClick={() => handleRemoveFavoritePlace(place)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          You haven't saved any favorite places yet.
        </div>
      )}
    </div>
  );
}

export default FavoritePlacesTab;
