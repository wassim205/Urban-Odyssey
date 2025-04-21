import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Trash2 } from "lucide-react";
import axios from "./../../config/axiosConfig";
import Controls from "./Controls";

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

export default function Map() {
  const [mapHeight, setMapHeight] = useState("calc(100vh - 64px)");
  const [center] = useState([35.1688, -2.9296]);
  const [marker, setMarker] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tileLayer, setTileLayer] = useState({
        name: "Default",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&copy; OpenStreetMap contributors',
    });

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
        attribution={tileLayer.attribution}
        url={tileLayer.url}
      />
      <ClickHandler onClick={fetchLabel} />
      <Controls onLocate={fetchLabel} onLayerChange={setTileLayer} />
      
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
