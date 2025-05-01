import { useMap } from "react-leaflet"
import { useMapContext } from "../../Context/MapContext"

function LocationButton() {
  const map = useMap()
  const { fetchLabel } = useMapContext()

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        map.flyTo([latitude, longitude], 16)
        fetchLabel({ lat: latitude, lng: longitude })
      },
      () => {
        alert("Unable to retrieve your location.")
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        handleClick()
      }}
      className="w-full aspect-square rounded-md hover:bg-[#D8C292]/70 transition duration-300 p-1 flex items-center justify-center"
      title="Show My Location"
    >
      <img src="/src/assets/icons/locationIcon.svg" className="w-full h-full" alt="Get Location" />
    </button>
  )
}

export default LocationButton