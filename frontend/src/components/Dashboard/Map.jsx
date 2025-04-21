import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Trash2, LocateFixed } from "lucide-react";
import axios from "./../../config/axiosConfig";

// Fix leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
}

function LocationButton({ onLocate }) {
  const map = useMap();

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        map.flyTo([latitude, longitude], 16);
        onLocate({ lat: latitude, lng: longitude });
      },
      () => {
        alert("Unable to retrieve your location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
      title="Show My Location"
    >
      <LocateFixed className="text-blue-600" />
    </button>
  );
}

export default function Map() {
  const [mapHeight, setMapHeight] = useState("calc(100vh - 64px)");
  const [center] = useState([35.1688, -2.9296]);
  const [marker, setMarker] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateHeight = () => setMapHeight("calc(100vh - 64px)");
    window.addEventListener("resize", updateHeight);
    updateHeight();
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const fetchLabel = async ({ lat, lng }) => {
    setLoading(true);
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
      setMarker({ lat, lng, label });
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      setMarker({ lat, lng, label: `${lat.toFixed(5)}, ${lng.toFixed(5)}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full" style={{ height: mapHeight }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onClick={fetchLabel} />
        <LocationButton onLocate={fetchLabel} />

        {marker && (
          <Marker position={[marker.lat, marker.lng]}>
            <Popup>
              <div
                className="flex items-start justify-between gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-sm max-w-[250px]">
                  {loading ? "Loading address..." : marker.label}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMarker(null);
                  }}
                  title="Remove marker"
                >
                  <Trash2 size={16} className="hover:text-red-600" />
                </button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
