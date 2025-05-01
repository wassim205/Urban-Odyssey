import Navbar from "./../Layout/Navbar";
import Map from "./Map";
import { MapProvider } from "../Context/MapContext";

function Dashboard() {
  return (
    <div className="flex flex-col h-screen w-full">
      <MapProvider>
        <Navbar />
        <div className="flex-grow">
          <Map />
        </div>
      </MapProvider>
    </div>
  );
}

export default Dashboard;
