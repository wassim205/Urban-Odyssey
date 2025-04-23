import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { layers } from "./../ControlButtons/LayerSelector"

const HERE_API_KEY = "IjZYas33oji9rGIjAPCPcs-HI2AJk9I2r4_KQIgvfqw"
const UNSPLASH_ACCESS_KEY = "EnOe8sLfZHxRDJuFRxbkg1cjL2-oy-9lAk4tHFLItp8"

// Create the context
const MapContext = createContext(null)

// Custom hook to use the map context
export const useMapContext = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider")
  }
  return context
}

// Provider component
export const MapProvider = ({ children }) => {
  // Map state
  const [center, setCenter] = useState([35.1688, -2.9296])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [tileLayer, setTileLayer] = useState(layers[0])

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState(false)

  // Handle sidebar animations
  useEffect(() => {
    if (sidebarOpen) {
      setSidebarVisible(true)
    } else {
      const timer = setTimeout(() => {
        setSidebarVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [sidebarOpen])

  // API functions
  const fetchPlaceDetails = async ({ lat, lng }) => {
    try {
      // First, update the center to fly to this location
      setCenter([lat, lng])

      const { data } = await axios.get("https://revgeocode.search.hereapi.com/v1/revgeocode", {
        params: {
          at: `${lat},${lng}`,
          apiKey: HERE_API_KEY,
        },
      })

      const place = data.items?.[0]

      let image = null
      if (place) {
        const title = place.title
        const category = place.categories?.[0]?.name

        image =
          (await fetchUnsplashImage(`${title} ${category}`)) ||
          (await fetchUnsplashImage(category)) ||
          (await fetchUnsplashImage("city landscape"))
      }

      setSelectedPlace({
        lat,
        lng,
        place: place
          ? {
              title: place.title,
              address: place.address?.label,
              category: place.categories?.[0]?.name,
              image,
            }
          : null,
      })
      setSidebarOpen(true)
    } catch (error) {
      console.error("Reverse geocode error", error)
      setSelectedPlace({ lat, lng, place: null })
      setSidebarOpen(true)
    }
  }

  const fetchLabel = async ({ lat, lng }) => {
    try {
      const { data } = await axios.get("https://nominatim.openstreetmap.org/reverse", {
        params: {
          lat,
          lon: lng,
          format: "json",
        },
        withCredentials: false,
      })

      const label = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
      setSelectedPlace({ lat, lng, place: { title: label } })
      setSidebarOpen(true)
    } catch (err) {
      console.error("Reverse geocoding error:", err)
      setSelectedPlace({
        lat,
        lng,
        place: { title: `${lat.toFixed(5)}, ${lng.toFixed(5)}` },
      })
      setSidebarOpen(true)
    }
  }

  const fetchUnsplashImage = async (query) => {
    try {
      const { data } = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query,
          per_page: 1,
          orientation: "landscape",
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      })

      return data.results?.[0]?.urls?.small || null
    } catch (err) {
      console.error("Unsplash fetch error:", err)
      return null
    }
  }

  // Navigate to a specific location
  const navigateToLocation = (lat, lng, zoom = 15) => {
    setCenter([lat, lng])
    // This will be used by the Map component to update the view
    return { lat, lng, zoom }
  }

  // UI actions
  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  const handleOpenSidebar = () => {
    setSidebarOpen(true)
  }

  const toggleLayerSelector = (state) => {
    const newState = typeof state === "boolean" ? state : !isLayerSelectorOpen
    setIsLayerSelectorOpen(newState)
    setSidebarOpen(false)
  }

  const changeLayer = (layer) => {
    setTileLayer(layer)
    setIsLayerSelectorOpen(false)
  }

  const saveToFavorites = () => {
    console.log("Saving to favorites:", selectedPlace)
    // Implement saving logic here
  }

  // The value that will be provided to consumers of this context
  const value = {
    // Map state
    center,
    selectedPlace,
    tileLayer,

    // UI state
    sidebarOpen,
    sidebarVisible,
    isLayerSelectorOpen,

    // Actions
    fetchPlaceDetails,
    fetchLabel,
    handleCloseSidebar,
    handleOpenSidebar,
    toggleLayerSelector,
    changeLayer,
    saveToFavorites,
    setSidebarOpen,
    navigateToLocation,
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}
