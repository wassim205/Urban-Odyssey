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
import "leaflet/dist/leaflet.css";
import fetchJsonp from "./../../utils/jsonp";

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
    attribution: "&copy; OpenStreetMap contributors",
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [wikipediaData, setWikipediaData] = useState(null);
  const [flickrPhotos, setFlickrPhotos] = useState([]);

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
  const fetchPlaceDetails = async (latlng) => {
    try {
      const lat = latlng.lat;
      const lng = latlng.lng;

      const formattedCoords = `${lat}|${lng}`;

      // Use JSONP for Wikimedia request
      const wikiMediaResponse = await fetchJsonp(
        `https://commons.wikimedia.org/w/api.php?action=query&list=geosearch&gscoord=${formattedCoords}&gsradius=1000&gslimit=5&format=json`
      );
      const wikiMediaData = wikiMediaResponse.query?.geosearch || [];

      // Use Overpass API for OSM data
      const overpassResponse = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://overpass-api.de/api/interpreter",
        `[out:json];
        (
          node[~"name|amenity|tourism|shop|historic|building"~"."](around:100,${lat},${lng});
          way[~"name|amenity|tourism|shop|historic|building"~"."](around:100,${lat},${lng});
        );
        out body;>;out skel qt;`,
        {
          headers: {
            "Content-Type": "text/plain",
            "X-Requested-With": "XMLHttpRequest"
          },
          withCredentials: false
        }
      );

      const wikiMediaImages = processWikiMediaImages(
        wikiMediaResponse.data?.query?.geosearch || []
      );

      const osmFeatures = processOSMData(overpassResponse.data.elements || []);

      setSelectedPlace({
        lat,
        lng,
        osmFeatures,
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
      setSelectedPlace(null);
    }
  };
  const processWikiMediaImages = (items) => {
    return items.map((item) => ({
      url: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
        item.title
      )}`,
      title: item.title,
      thumbnail: `https://commons.wikimedia.org/w/thumb.php?f=${encodeURIComponent(
        item.title
      )}&w=200`,
    }));
  };

  const processOSMData = (elements) => {
    return elements
      .filter(
        (element) =>
          element.tags?.name || element.tags?.amenity || element.tags?.tourism
      )
      .map((element) => ({
        type:
          element.tags?.amenity ||
          element.tags?.tourism ||
          element.tags?.shop ||
          element.tags?.historic ||
          element.tags?.building ||
          element.type,
        name: element.tags?.name || element.tags?.brand || "Unnamed Feature",
        details: element.tags,
      }));
  };

  // Update your ClickHandler usage

  return (
    <div className="relative w-full" style={{ height: mapHeight }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer attribution={tileLayer.attribution} url={tileLayer.url} />
        <ClickHandler onClick={fetchLabel} />
        <Controls onLocate={fetchLabel} onLayerChange={setTileLayer} />

        <ClickHandler
          onClick={(latlng) => {
            fetchLabel(latlng);
            fetchPlaceDetails(latlng);
          }}
        />

        {selectedPlace && (
          <Marker position={[selectedPlace.lat, selectedPlace.lng]}>
            <Popup className="custom-popup">
              <div className="max-w-[300px]">
                <h3 className="font-semibold mb-2">Location Details</h3>

                {selectedPlace.osmFeatures.map((feature, index) => (
                  <div key={index} className="mb-3">
                    <p className="font-medium">{feature.name}</p>
                    <p className="text-sm text-gray-600">{feature.type}</p>
                  </div>
                ))}

                {selectedPlace.images?.wikiMediaImages.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium mb-1">
                      Wikimedia Images
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedPlace.images.wikiMediaImages.map(
                        (img, index) => (
                          <a
                            key={index}
                            href={img.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                          >
                            <img
                              src={img.thumbnail}
                              alt={img.title}
                              className="w-full h-20 object-cover rounded group-hover:opacity-75"
                            />
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}

                {selectedPlace.osmFeatures.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium mb-1">OSM Features</h4>
                    <ul className="space-y-2">
                      {selectedPlace.osmFeatures.map((feature, index) => (
                        <div key={index} className="mb-3">
                          {feature.name !== "Unnamed Feature" && (
                            <p className="font-medium">{feature.name}</p>
                          )}
                          <p className="text-sm text-gray-600">
                            {feature.type.replace(/_/g, " ")}
                          </p>
                          {feature.details?.website && (
                            <a
                              href={feature.details.website}
                              className="text-blue-600 text-xs block truncate"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {feature.details.website}
                            </a>
                          )}
                        </div>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
