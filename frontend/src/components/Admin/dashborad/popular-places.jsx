import { Card, CardContent, CardHeader, CardTitle } from "./../ui/card/index";
import { Star } from "lucide-react";
import axiosConfig from "../../../config/axiosConfig";
import { useState, useEffect } from "react";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Places</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {places.length > 0 ? (
            places.map((place, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img
                  src={place.image_url || "/placeholder.svg"}
                  alt={place.name}
                  className="h-12 w-12 rounded-md object-cover"
                />{console.log(place)
                }
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {place.name}
                  </p>
                  <p className="text-xs text-gray-500">{place.category}</p>
                </div>
                {/* <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{place.rating}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Intl.NumberFormat().format(place.visits)} visits
                </div> */}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No popular places available at the moment.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
