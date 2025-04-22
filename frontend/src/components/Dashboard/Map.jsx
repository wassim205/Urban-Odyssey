import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Controls from "./Controls";
import { ArrowLeftCircle, Navigation, MapPin, Info, Building, Map, X, Bookmark } from "lucide-react";
import { layers } from "./ControlButtons/LayerSelector";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const HERE_API_KEY = "IjZYas33oji9rGIjAPCPcs-HI2AJk9I2r4_KQIgvfqw";

function ClickHandler({ onMapClick, isLayerSelectorOpen }) {
  const map = useMapEvents({
    click(e) {
      const target = e.originalEvent.target
      const isControlsClick =
        target.closest(".bg-black\\/60") ||
        target.closest(".layer-selector") ||
        document.getElementById("layer-selector-backdrop")

      if (!isControlsClick && !isLayerSelectorOpen) {
        onMapClick(e.latlng)
      }
    },
  })
  return null
}

export default function EnhancedMap() {
  const [center] = useState([35.1688, -2.9296]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [tileLayer, setTileLayer] = useState(layers[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState(false);

  // Handle animations
  useEffect(() => {
    if (sidebarOpen) {
      setSidebarVisible(true);
    } else {
      const timer = setTimeout(() => {
        setSidebarVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [sidebarOpen]);

  const fetchPlaceDetails = async ({ lat, lng }) => {
    try {
      const { data } = await axios.get(
        "https://revgeocode.search.hereapi.com/v1/revgeocode",
        {
          params: {
            at: `${lat},${lng}`,
            apiKey: HERE_API_KEY,
          },
        }
      );

      const place = data.items?.[0];

      setSelectedPlace({
        lat,
        lng,
        place: place
          ? {
              title: place.title,
              address: place.address?.label,
              category: place.categories?.[0]?.name,
            }
          : null,
      });
      setSidebarOpen(true);
    } catch (error) {
      console.error("Reverse geocode error", error);
      setSelectedPlace({ lat, lng, place: null });
      setSidebarOpen(true);
    }
  };

  const fetchLabel = async ({ lat, lng }) => {
    try {
      const { data } = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat,
            lon: lng,
            format: "json",
          },
          withCredentials: false,
        }
      );

      const label = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      setSelectedPlace({ lat, lng, place: { title: label } });
      setSidebarOpen(true);
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      setSelectedPlace({
        lat,
        lng,
        place: { title: `${lat.toFixed(5)}, ${lng.toFixed(5)}` },
      });
      setSidebarOpen(true);
    }
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const saveToFavorites = () => {
    // This would be implemented to save the location to favorites
    console.log("Saving to favorites:", selectedPlace);
    // Display success message or visual feedback
  };

  return (
    <div className="w-full h-full relative flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={`w-80 bg-[#4B4B4D] text-gray-100 shadow-xl h-full z-20 absolute left-0 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ display: sidebarVisible || sidebarOpen ? "block" : "none" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-[#3A3A3C] text-[#D8C292] px-6 py-4 flex justify-between items-center border-b border-[#5C5C5E]">
            <h2 className="font-righteous text-2xl">LOCATION DETAILS</h2>
            <button
              onClick={handleCloseSidebar}
              className="text-[#D8C292] hover:text-white transition p-1"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          {selectedPlace && (
            <div className="flex-grow overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                {/* Title Section */}
                <div className="animate-fadeIn bg-[#5C5C5E] p-4 rounded-lg shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin size={20} className="text-[#D8C292]" />
                    <h3 className="font-bebas text-xl text-[#D8C292]">NAME</h3>
                  </div>
                  <p className="text-white text-lg pl-7">{selectedPlace.place?.title || "Unknown Location"}</p>
                </div>

                {/* Category Section */}
                {selectedPlace.place?.category && (
                  <div className="animate-fadeIn animation-delay-100 bg-[#5C5C5E] p-4 rounded-lg shadow-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <Building size={20} className="text-[#D8C292]" />
                      <h3 className="font-bebas text-xl text-[#D8C292]">CATEGORY</h3>
                    </div>
                    <p className="text-white text-lg pl-7">{selectedPlace.place.category}</p>
                  </div>
                )}

                {/* Address Section */}
                {selectedPlace.place?.address && (
                  <div className="animate-fadeIn animation-delay-200 bg-[#5C5C5E] p-4 rounded-lg shadow-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info size={20} className="text-[#D8C292]" />
                      <h3 className="font-bebas text-xl text-[#D8C292]">ADDRESS</h3>
                    </div>
                    <p className="text-white text-lg pl-7">{selectedPlace.place.address}</p>
                  </div>
                )}

                {/* Coordinates Section */}
                <div className="animate-fadeIn animation-delay-300 bg-[#5C5C5E] p-4 rounded-lg shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <Navigation size={20} className="text-[#D8C292]" />
                    <h3 className="font-bebas text-xl text-[#D8C292]">COORDINATES</h3>
                  </div>
                  <p className="text-white text-lg pl-7">
                    {selectedPlace.lat.toFixed(6)}, {selectedPlace.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-[#3A3A3C] border-t border-[#5C5C5E] space-y-3">
            <button
              className="w-full bg-[#D8C292] hover:bg-[#E8D2A2] text-[#3A3A3C] font-bebas text-xl py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center shadow-md"
              onClick={saveToFavorites}
            >
              <Bookmark size={20} className="mr-2" />
              SAVE TO FAVORITES
            </button>

            <button
              className="w-full bg-[#5C5C5E] hover:bg-[#6E6E70] text-white font-bebas text-xl py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center shadow-md"
              onClick={handleCloseSidebar}
            >
              <ArrowLeftCircle size={20} className="mr-2" />
              CLOSE
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-grow h-full transition-all duration-300">
        <MapContainer center={center} zoom={13} style={{ height: "100%" }} className="z-0">
          <TileLayer url={tileLayer.url} attribution={tileLayer.attribution} />
          <ClickHandler onMapClick={fetchPlaceDetails} isLayerSelectorOpen={isLayerSelectorOpen} />
          <Controls
            onLocate={fetchLabel}
            onLayerChange={(layer) => {
              setTileLayer(layer)
            }}
            onLayerSelectorToggle={setIsLayerSelectorOpen}
          />

          {selectedPlace && <Marker position={[selectedPlace.lat, selectedPlace.lng]} icon={customIcon} />}
        </MapContainer>
      </div>

      {/* Mobile Toggle Button - shows when sidebar is closed */}
      {selectedPlace && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute bottom-6 left-6 z-10 bg-[#4B4B4D] text-[#D8C292] p-3 rounded-full shadow-lg hover:bg-[#5C5C5E] transition duration-200 animate-fadeIn"
          aria-label="Show location details"
        >
          <Info size={24} />
        </button>
      )}
    </div>
  )
}