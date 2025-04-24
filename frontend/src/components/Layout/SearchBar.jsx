import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Building } from "lucide-react"
import { useMapContext } from "../Context/MapContext"
import axios from "axios"

const HERE_API_KEY = "IjZYas33oji9rGIjAPCPcs-HI2AJk9I2r4_KQIgvfqw"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)
  const { fetchPlaceDetails } = useMapContext()

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 2) {
      searchLocations(value)
    } else {
      setResults([])
    }
  }

  const searchLocations = async (searchQuery) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const { data } = await axios.get("https://geocode.search.hereapi.com/v1/geocode", {
        params: {
          q: searchQuery,
          apiKey: HERE_API_KEY,
          limit: 5,
        },
      })

      setResults(data.items || [])
      setShowResults(true)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectLocation = (result) => {
    setQuery(result.title)
    setShowResults(false)

    if (result.position) {
      fetchPlaceDetails(result.position)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const getResultIcon = (result) => {
    if (result.resultType === "locality" || result.resultType === "administrativeArea") {
      return <Building className="h-4 w-4 text-[#D8C292]" />
    } else if (result.categories && result.categories.length > 0) {
      return <Building className="h-4 w-4 text-[#D8C292]" />
    } else {
      return <MapPin className="h-4 w-4 text-[#D8C292]" />
    }
  }

  return (
    <div className="relative flex-1" ref={searchRef}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-white" />
      </div>
      <input
        type="text"
        placeholder="Search for locations..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => {
          if (results.length > 0) setShowResults(true)
        }}
        className="w-full max-w-xs sm:max-w-md md:w-64 lg:w-72 xl:w-80 h-9 pl-10 text-lg font-poppins rounded-lg bg-[#D2C3A2] border border-[#D2C3A2] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-[#817456]"
      />

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-w-xs sm:max-w-md md:w-64 lg:w-72 xl:w-80 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul className="py-1">
            {results.map((result) => (
              <li
                key={result.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-start gap-2"
                onClick={() => handleSelectLocation(result)}
              >
                <div className="mt-1">{getResultIcon(result)}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{result.title}</p>
                  <p className="text-sm text-gray-500 truncate">{result.address.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-[#817456] border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  )
}
