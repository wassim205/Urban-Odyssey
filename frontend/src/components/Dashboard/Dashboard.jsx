import Navbar from "./Navbar"
import Map from "./Map"
import { MapProvider } from "./context/MapContext"

function Dashboard() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div className="flex-grow">
        <MapProvider>
          <Map />
        </MapProvider>
      </div>
    </div>
  )
}

export default Dashboard