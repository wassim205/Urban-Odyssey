import React, { useState } from "react";
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

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function EnhancedMap() {
  const [center] = useState([35.1688, -2.9296]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [tileLayer, setTileLayer] = useState({
    name: "Default",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    setSelectedPlace(null);
  };

  return (
    <div className="w-full h-screen relative flex">
      {/* Sidebar */}
      {sidebarOpen && selectedPlace && (
        <div className="w-64 bg-white shadow-lg z-10 h-full overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="font-bold text-lg text-gray-800">Location Details</h3>
              <button
                onClick={handleCloseSidebar}
                className="text-gray-500 hover:text-red-600 transition-colors"
                aria-label="Close sidebar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div>
              {selectedPlace.place ? (
                <>
                  <div className="mb-4">
                    <h4 className="font-semibold text-base text-gray-700">Name</h4>
                    <p className="text-gray-900">{selectedPlace.place.title}</p>
                  </div>
                  
                  {selectedPlace.place.category && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-base text-gray-700">Category</h4>
                      <p className="text-gray-900">{selectedPlace.place.category}</p>
                    </div>
                  )}
                  
                  {selectedPlace.place.address && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-base text-gray-700">Address</h4>
                      <p className="text-gray-900">{selectedPlace.place.address}</p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-base text-gray-700">Coordinates</h4>
                    <p className="text-gray-900">
                      {selectedPlace.lat.toFixed(6)}, {selectedPlace.lng.toFixed(6)}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 italic">No place information available for this location.</p>
              )}
              
              <div className="mt-6 pt-4 border-t">
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full flex items-center justify-center"
                  onClick={handleCloseSidebar}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Remove Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Map Container */}
      <div className={`${sidebarOpen ? 'flex-grow' : 'w-full'} h-full`}>
        <MapContainer 
          center={center} 
          zoom={13} 
          style={{ height: "100%" }}
          className="z-0"
        >
          <TileLayer url={tileLayer.url} attribution={tileLayer.attribution} />
          <ClickHandler onMapClick={fetchPlaceDetails} />
          <Controls
            onLocate={fetchLabel}
            onLayerChange={(layer) => {
              setTileLayer(layer);
            }}
          />

          {selectedPlace && (
            <Marker position={[selectedPlace.lat, selectedPlace.lng]} icon={customIcon} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}