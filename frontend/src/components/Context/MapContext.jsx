import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import axiosConfig from "../../config/axiosConfig"
import { layers } from "../Dashboard/ControlButtons/LayerSelector"
import { toast } from "sonner"

const HERE_API_KEY = "IjZYas33oji9rGIjAPCPcs-HI2AJk9I2r4_KQIgvfqw"
const UNSPLASH_ACCESS_KEY = "EnOe8sLfZHxRDJuFRxbkg1cjL2-oy-9lAk4tHFLItp8"

const MapContext = createContext(null)

export const useMapContext = () => {
  const context = useContext(MapContext)
  if (!context) throw new Error("useMapContext must be used within a MapProvider")
  return context
}

export const MapProvider = ({ children }) => {
  const [center, setCenter] = useState([35.1688, -2.9296])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [tileLayer, setTileLayer] = useState(layers[0])

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState(false)

  useEffect(() => {
    if (sidebarOpen) setSidebarVisible(true)
    else {
      const timer = setTimeout(() => setSidebarVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [sidebarOpen])

  // Use axios for external third-party APIs
  const fetchPlaceDetails = async ({ lat, lng }) => {
    setCenter([lat, lng])
    try {
      const { data } = await axios.get(
        "https://revgeocode.search.hereapi.com/v1/revgeocode",
        { params: { at: `${lat},${lng}`, apiKey: HERE_API_KEY } }
      )
      const item = data.items?.[0]
      let image = null
      if (item) {
        const title = item.title
        const category = item.categories?.[0]?.name || ''
        image =
          (await fetchUnsplashImage(`${title} ${category}`)) ||
          (await fetchUnsplashImage(category)) ||
          (await fetchUnsplashImage("city landscape"))
      }
      const placeInfo = item
        ? {
            id: item.id,
            title: item.title,
            address: item.address?.label || '',
            city: item.address?.city || item.address?.county || '',
            country: item.address?.countryName || '',
            category: item.categories?.[0]?.name || '',
            image,
          }
        : null
      setSelectedPlace({ lat, lng, place: placeInfo })
      setSidebarOpen(true)
    } catch (error) {
      setSelectedPlace({ lat, lng, place: null })
      setSidebarOpen(true)
    }
  }

  const fetchLabel = async ({ lat, lng }) => {
    setCenter([lat, lng])
    try {
      const { data } = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        { params: { lat, lon: lng, format: "json" } }
      )
      const label = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
      setSelectedPlace({
        lat,
        lng,
        place: {
          id: `${lat}-${lng}`,
          title: label,
          city: '',
          country: '',
          category: '',
          image: null,
        },
      })
      setSidebarOpen(true)
    } catch (error) {
      setSelectedPlace({
        lat,
        lng,
        place: {
          id: `${lat}-${lng}`,
          title: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
          city: '',
          country: '',
          category: '',
          image: null,
        },
      })
      setSidebarOpen(true)
    }
  }

  const fetchUnsplashImage = async (query) => {
    try {
      const { data } = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query, per_page: 1, orientation: "landscape" },
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
      })
      return data.results?.[0]?.urls?.small || null
    } catch (error) {
      return null
    }
  }

  // Use axiosConfig for backend calls (favorites)
  const saveToFavorites = async () => {
    if (!selectedPlace?.place) return
    const { id: external_id, title: name, city, country, address, image: image_url, category, title: description } = selectedPlace.place
    const payload = { external_id, source: 'HERE', name, city, country, lat: selectedPlace.lat, lng: selectedPlace.lng, address, image_url, category, description }
    try {
      const { data } = await axiosConfig.post('favorites', payload)
      toast.success('Place saved in favorites')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Could not save favorite')
    }
  }

  const navigateToLocation = (lat, lng, zoom = 15) => {
    setCenter([lat, lng])
    return { lat, lng, zoom }
  }

  const handleCloseSidebar = () => setSidebarOpen(false)
  const handleOpenSidebar = () => setSidebarOpen(true)
  const toggleLayerSelector = () => {
    setIsLayerSelectorOpen((prev) => !prev)
    setSidebarOpen(false)
  }
  const changeLayer = (layer) => {
    setTileLayer(layer)
    setIsLayerSelectorOpen(false)
  }

  const submitReview = async ({ facilityId, rating, comment }) => {
    try {
      const payload = {
        facility_id: facilityId,
        rating,
        comment,
      };
      const { data } = await axiosConfig.post("reviews", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      });
      toast.success("Review submitted successfully!");
      toast.warning("your comment is pended until an operator approve it, Thanks For Your Time!")
      return data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to submit review. Please try again."
      );
      throw error;
    }
  };

  const value = {
    center,
    setCenter,
    selectedPlace,
    setSelectedPlace,
    tileLayer,
    sidebarOpen,
    sidebarVisible,
    isLayerSelectorOpen,
    fetchPlaceDetails,
    fetchLabel,
    handleCloseSidebar,
    handleOpenSidebar,
    toggleLayerSelector,
    changeLayer,
    saveToFavorites,
    navigateToLocation,
    setSidebarOpen,
    submitReview,
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}