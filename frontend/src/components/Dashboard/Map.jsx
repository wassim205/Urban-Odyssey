import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Trash2 } from 'lucide-react'; // or any other icon you prefer

// --- Leaflet default‐icon fix (keep this) ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- Component to capture clicks and report back ---
function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    }
  });
  return null;
}

export default function Map() {
  const [mapHeight, setMapHeight] = useState('calc(100vh - 64px)');
  const [center]    = useState([35.1688, -2.9296]); // Nador default
  const [marker, setMarker] = useState(null);       // { lat, lng } or null

  // resize & geolocation (optional pan‑to‑user)
  useEffect(() => {
    const updateHeight = () => setMapHeight('calc(100vh - 64px)');
    window.addEventListener('resize', updateHeight);
    updateHeight();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          // pan map to user but still only one marker if you click
          setMarker({ lat: latitude, lng: longitude });
        },
        (err) => console.error('Geolocation error:', err)
      );
    }

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="w-full" style={{ height: mapHeight }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Hook into click events */}
        <ClickHandler onClick={setMarker} />

        {/* Only render if marker is non‐null */}
        {marker && (
          <Marker position={[marker.lat, marker.lng]}>
            <Popup>
              <div className="flex items-center space-x-2">
                <div>
                  {marker.lat.toFixed(5)}, {marker.lng.toFixed(5)}
                </div>
                <Trash2
                  size={16}
                  className="cursor-pointer hover:text-red-600"
                  onClick={() => setMarker(null)}
                  title="Remove marker"
                />
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
