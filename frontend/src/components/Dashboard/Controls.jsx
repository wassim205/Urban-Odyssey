import React, { useState } from "react";
import LocationButton from "./ControlButtons/LocationButton";
import LayerButton from "./ControlButtons/LayerButton";
import LayerSelector, { layers } from "./ControlButtons/LayerSelector";

function Controls({ onLocate, onLayerChange }) {
  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(layers[0]);

  const handleLayerChange = (layer) => {
    setCurrentLayer(layer);
    onLayerChange(layer);
    setIsLayerSelectorOpen(false);
  };

  return (
    <>
      <div 
        className={`bg-black/60 absolute top-4 right-0 z-[900] rounded-l-lg flex flex-col 
        gap-3 items-center justify-center shadow-md transition-all duration-300
        w-12 px-1 py-3`}
      >
        <LocationButton onLocate={onLocate} />
        <LayerButton 
          onClick={() => setIsLayerSelectorOpen(!isLayerSelectorOpen)} 
          isActive={isLayerSelectorOpen}
        />
      </div>
      
      <LayerSelector 
        isOpen={isLayerSelectorOpen}
        onLayerChange={handleLayerChange}
        onClose={() => setIsLayerSelectorOpen(false)}
        currentLayer={currentLayer}
      />
    </>
  );
}

export default Controls;