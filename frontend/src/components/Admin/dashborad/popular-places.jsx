import { Card, CardContent, CardHeader, CardTitle } from "./../ui/card/index"
import { Star } from "lucide-react"

export default function PopularPlaces() {
  // Static data for demonstration
  const places = [
    {
      name: "Tour Eiffel",
      category: "Monument",
      rating: 4.8,
      visits: 12453,
      image: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Musée du Louvre",
      category: "Museum",
      rating: 4.7,
      visits: 10876,
      image: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Cathédrale Notre-Dame",
      category: "Religious Site",
      rating: 4.6,
      visits: 9542,
      image: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Montmartre",
      category: "District",
      rating: 4.5,
      visits: 8765,
      image: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Jardin du Luxembourg",
      category: "Park",
      rating: 4.4,
      visits: 7654,
      image: "/placeholder.svg?height=48&width=48",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Places</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {places.map((place, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img
                src={place.image || "/placeholder.svg"}
                alt={place.name}
                className="h-12 w-12 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{place.name}</p>
                <p className="text-xs text-gray-500">{place.category}</p>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{place.rating}</span>
              </div>
              <div className="text-sm text-gray-500">{new Intl.NumberFormat().format(place.visits)} visits</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
