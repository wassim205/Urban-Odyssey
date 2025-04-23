import { Heart } from "lucide-react"

function MainContent() {
  // Fake data for favorite places
  const favoriteLocations = [
    {
      id: 1,
      name: "Eiffel Tower",
      city: "Paris",
      country: "France",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Central Park",
      city: "New York",
      country: "USA",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Colosseum",
      city: "Rome",
      country: "Italy",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-righteous text-[#D8C292] mb-8 text-center">My Favorite Places</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteLocations.map((location) => (
          <FavoriteCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  )
}

function FavoriteCard({ location }) {
  return (
    <div className="bg-[#293D36]/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-[#D8C292]/30 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      {/* Map Image */}
      <div className="relative">
        <img
          src={location.image || "/placeholder.svg"}
          alt={`Map of ${location.name}`}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition">
          <Heart className="h-5 w-5 text-[#D8C292] fill-[#D8C292]" />
        </button>
      </div>

      {/* Location Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#D8C292] mb-1">{location.name}</h3>
        <p className="text-[#9D9D9D]">
          {location.city}, {location.country}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <button className="text-sm text-[#D8C292] hover:text-white transition">View Details</button>
          <button className="text-sm text-[#9D9D9D] hover:text-white transition">Remove</button>
        </div>
      </div>
    </div>
  )
}

export default MainContent
