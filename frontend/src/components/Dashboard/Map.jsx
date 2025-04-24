"use client"

import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Popup, Circle } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import Controls from "./Controls"
import { ArrowLeftCircle, Navigation, MapPin, Info, Building, X, Bookmark } from "lucide-react"
import { useMapContext } from "../Context/MapContext"
import { useEffect, useRef, useState } from "react"
import { Toaster } from "sonner"
import { useLocation } from "react-router-dom"
import axiosInstance from "../../config/axiosConfig"

// Add CSS for facility markers
// import "./facility-markers.css" // We'll create this file

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Create a custom icon for facilities
const facilityIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "facility-marker-icon",
})

const MOROCCO_BOUNDS = [
  [20.0, -18.0],
  [37.0, 1.0],
]

function MapController() {
  const { fetchPlaceDetails, isLayerSelectorOpen, center } = useMapContext()
  const map = useMap()
  const centerRef = useRef(center)

  useEffect(() => {
    if (center && (center[0] !== centerRef.current[0] || center[1] !== centerRef.current[1])) {
      map.flyTo(center, 15, {
        duration: 1.5,
        easeLinearity: 0.25,
      })
      centerRef.current = center
    }
  }, [center, map])

  useMapEvents({
    click(e) {
      const target = e.originalEvent.target
      const isControlsClick =
        target.closest(".bg-black\\/60") ||
        target.closest(".layer-selector") ||
        document.getElementById("layer-selector-backdrop")

      if (!isControlsClick && !isLayerSelectorOpen) {
        fetchPlaceDetails(e.latlng)
      }
    },
  })

  return null
}

export default function EnhancedMap() {
  const {
    center,
    setCenter,
    selectedPlace,
    tileLayer,
    sidebarOpen,
    sidebarVisible,
    handleCloseSidebar,
    setSidebarOpen,
    saveToFavorites,
  } = useMapContext()

  const location = useLocation()
  const [facilities, setFacilities] = useState([])
  const [showFacilities, setShowFacilities] = useState(true)

  useEffect(() => {
    if (location.state?.lat && location.state?.lng) {
      setCenter([location.state.lat, location.state.lng])
    }
  }, [location.state, setCenter])

  // Fetch nearby facilities when the center changes
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
        .catch((err) => console.error("Failed to fetch facilities:", err))
    }
  }, [center])

  return (
    <>
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
                  {/* Pic Section */}
                  {/* Pics here will be displayed after by checking the database first */}
                  {selectedPlace?.place?.image && (
                    <img
                      src={selectedPlace.place.image || "/placeholder.svg"}
                      alt={selectedPlace.place.title}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
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
            <TileLayer url={tileLayer.url} attribution={tileLayer.attribution} noWrap={true} />
            <MapController />
            <Controls
              onLocate={() => {}}
              onLayerChange={() => {}}
              onLayerSelectorToggle={() => {}}
              setSidebarOpen={setSidebarOpen}
            />

            {selectedPlace && <Marker position={[selectedPlace.lat, selectedPlace.lng]} icon={customIcon} />}

            {/* Display nearby facilities */}
            {showFacilities &&
              facilities.map((facility) => (
                <Marker
                  key={facility.facility_id}
                  position={[facility.latitude, facility.longitude]}
                  icon={facilityIcon}
                >
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{facility.name}</h3>
                      <p className="text-sm">Type: {facility.type}</p>
                      <p className="text-sm">Distance: {facility.distance?.toFixed(2)} km</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* Display circles around facilities */}
            {showFacilities &&
              facilities.map((facility) => (
                <Circle
                  key={`circle-${facility.facility_id}`}
                  center={[facility.latitude, facility.longitude]}
                  radius={100} // meters
                  pathOptions={{
                    color: "#D8C292",
                    fillColor: "#D8C292",
                    fillOpacity: 0.2,
                    weight: 1,
                  }}
                />
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
  )
}
