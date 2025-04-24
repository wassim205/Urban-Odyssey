"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  Popup,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Controls from "./Controls";
import { Info, Building } from "lucide-react";
import { useMapContext } from "../Context/MapContext";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "sonner";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import Sidebar from "../Layout/Sidebar";

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const facilityIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "facility-marker-icon",
});

const MOROCCO_BOUNDS = [
  [20.0, -18.0],
  [37.0, 1.0],
];

function MapController() {
  const { fetchPlaceDetails, isLayerSelectorOpen, center } = useMapContext();
  const map = useMap();
  const centerRef = useRef(center);

  useEffect(() => {
    if (
      center &&
      (center[0] !== centerRef.current[0] || center[1] !== centerRef.current[1])
    ) {
      map.flyTo(center, 15, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
      centerRef.current = center;
    }
  }, [center, map]);

  useMapEvents({
    click(e) {
      const target = e.originalEvent.target;
      const isControlsClick =
        target.closest(".bg-black\\/60") ||
        target.closest(".layer-selector") ||
        document.getElementById("layer-selector-backdrop");

      if (!isControlsClick && !isLayerSelectorOpen) {
        fetchPlaceDetails(e.latlng);
      }
    },
  });

  return null;
}

export default function EnhancedMap() {
  const {
    center,
    setCenter,
    selectedPlace,
    tileLayer,
    sidebarOpen,
    setSelectedPlace,
    sidebarVisible,
    handleCloseSidebar,
    setSidebarOpen,
    saveToFavorites,
  } = useMapContext();

  const location = useLocation();
  const [facilities, setFacilities] = useState([]);
  const [showFacilities, setShowFacilities] = useState(true);

  useEffect(() => {
    if (location.state?.lat && location.state?.lng) {
      setCenter([location.state.lat, location.state.lng]);
    }
  }, [location.state, setCenter]);

  useEffect(() => {
    if (center) {
      axiosInstance
        .get(`nearby-facilities`, {
          params: {
            latitude: center[0],
            longitude: center[1],
            radius: 3,
          },
        })
        .then((res) => setFacilities(res.data))
        .catch((err) => console.error("Failed to fetch facilities:", err));
    }
  }, [center]);
  console.log(facilities);

  return (
    <>
      <div className="w-full h-full relative flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          handleCloseSidebar={handleCloseSidebar}
          selectedPlace={selectedPlace}
          sidebarVisible={sidebarVisible}
          saveToFavorites={saveToFavorites}
        />

        {/* Map Container */}
        <div className="flex-grow h-full transition-all duration-300">
          <MapContainer
            center={center}
            zoom={6}
            style={{ height: "100%" }}
            className="z-0"
            minZoom={7}
            maxZoom={20}
            maxBounds={MOROCCO_BOUNDS}
            maxBoundsViscosity={1.0}
            worldCopyJump={false}
          >
            <TileLayer
              url={tileLayer.url}
              attribution={tileLayer.attribution}
              noWrap={true}
            />
            <MapController />
            <Controls
              onLocate={() => {}}
              onLayerChange={() => {}}
              onLayerSelectorToggle={() => {}}
              setSidebarOpen={setSidebarOpen}
            />

            {selectedPlace && (
              <Marker
                position={[selectedPlace.lat, selectedPlace.lng]}
                icon={customIcon}
              />
            )}

            {/* Display nearby facilities */}
            {showFacilities &&
              facilities.map((facility) => (
                <Marker
                  key={facility.facility_id}
                  position={[facility.latitude, facility.longitude]}
                  icon={facilityIcon}
                >
                  <Popup>
                    <div
                      onClick={() => {
                        setSelectedPlace({
                          lat: facility.latitude,
                          lng: facility.longitude,
                          place: {
                            title: facility.name,
                            category: facility.type,
                            address: `Lat: ${facility.latitude}, Lng: ${facility.longitude}`,
                          },
                          reviews: {
                            text: facility.reviews?.[0]?.comment || "No reviews available",
                            author: facility.reviews?.[0]?.user.username
                          
                          }
                        });
                        setSidebarOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      <h3 className="font-semibold">{facility.name}</h3>
                      <p className="text-sm">Type: {facility.type}</p>
                      <p className="text-sm">
                        Distance: {facility.distance?.toFixed(2)} km
                      </p>
                      <p className="text-xs text-blue-500 underline">
                        View Details
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
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

        {/* Toggle Facilities Button */}
        <button
          onClick={() => setShowFacilities(!showFacilities)}
          className="absolute bottom-6 right-6 z-10 bg-[#4B4B4D] text-[#D8C292] p-3 rounded-full shadow-lg hover:bg-[#5C5C5E] transition duration-200"
          aria-label="Toggle facilities"
        >
          <Building size={24} />
        </button>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}
