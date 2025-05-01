import { Card, CardContent, CardHeader, CardTitle } from "./../ui/card/index";
import { Star } from "lucide-react";
import axiosConfig from "../../../config/axiosConfig";
import { useState, useEffect } from "react";
import { MapPin, Calendar, Heart, ChevronRight } from 'lucide-react';
export default function PopularPlaces() {
  const [places, setPlaces] = useState([]);

  const fetchPopularPlaces = async () => {
    try {
      const { data } = await axiosConfig.get("dashboard");
      setPlaces(data.popular_places);
    } catch (error) {
      console.error("Error fetching popular places:", error);
    }
  };

  useEffect(() => {
    fetchPopularPlaces();
  }, []);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Card>
    <CardHeader>
      <CardTitle>Popular Places</CardTitle>
    </CardHeader>
    <CardContent>
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-blue-500" />
          Popular Places
        </h2>
        <p className="text-sm text-gray-500 mt-1">Discover the most beloved destinations around the world</p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {places.length > 0 ? (
          places.map((place, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={place.image_url || '/api/placeholder/120/120'}
                    alt={place.name}
                    className="h-24 w-24 rounded-lg object-cover shadow-sm"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {place.name}
                    </h3>
                    <span className="flex items-center text-rose-500 text-sm font-medium">
                      <Heart className="h-4 w-4 mr-1" />
                      {formatNumber(place.favorites_count)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {place.description}
                  </p>
                  
                  <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                    <div className="text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                      {place.city}, {place.country}
                    </div>
                    <div className="text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                      Added {formatDate(place.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="rounded-full bg-gray-100 p-3 w-12 h-12 mx-auto flex items-center justify-center">
              <MapPin className="h-6 w-6 text-gray-400" />
            </div>
            <p className="mt-4 text-gray-500">No popular places available at the moment.</p>
            <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800">
              Explore destinations
            </button>
          </div>
        )}
      </div>
    </div>
    </CardContent>
  </Card>
  );
}
