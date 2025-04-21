import React from "react";
import Navbar from "./Navbar";
import Map from "./Map";

function Dashboard() {
  return (
    <div className="flex flex-col h-screen w-full">
    <Navbar />
    <div className="flex-grow">
      <Map />
    </div>
  </div>
  );
}

export default Dashboard;
