import React, { useState } from "react";
import LocationButton from "./ControlButtons/LocationButton";
import Layer from "./ControlButtons/LayerButton";

function Controls({ onLocate, onLayerChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`bg-black/60 absolute top-4 right-0 z-[900] rounded-l-lg flex flex-col 
      gap-3 items-center justify-center shadow-md transition-all duration-300
      ${isExpanded ? "w-16 px-2" : "w-12 px-1"} py-3`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <LocationButton onLocate={onLocate} />
      <Layer onLayerChange={onLayerChange} />
    </div>
  );
}

export default Controls;