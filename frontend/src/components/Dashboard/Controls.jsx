import { useState } from "react"
import LocationButton from "./ControlButtons/LocationButton"
import LayerButton from "./ControlButtons/LayerButton"
import LayerSelector, { layers } from "./ControlButtons/LayerSelector"

function Controls({ onLocate, onLayerChange, onLayerSelectorToggle, setSidebarOpen }) {
  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState(false)
  const [currentLayer, setCurrentLayer] = useState(layers[0])

  const handleLayerChange = (layer) => {
    setCurrentLayer(layer)
    onLayerChange(layer)
    setIsLayerSelectorOpen(false)
    onLayerSelectorToggle(false)
  }

  return (
    <>
      <div
        className={`bg-black/60 absolute top-4 right-0 z-[900] rounded-l-lg flex flex-col 
        gap-3 items-center justify-center shadow-md transition-all duration-300
        w-12 px-1 py-3`}
      >
        <LocationButton onLocate={onLocate} />
        <LayerButton
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            const newState = !isLayerSelectorOpen
            setIsLayerSelectorOpen(newState)
            onLayerSelectorToggle(newState)
            setSidebarOpen(false)
          }}
          isActive={isLayerSelectorOpen}

        />
      </div>

      <LayerSelector
        isOpen={isLayerSelectorOpen}
        onLayerChange={handleLayerChange}
        onClose={() => {
          setIsLayerSelectorOpen(false)
          onLayerSelectorToggle(false)
        }}
        currentLayer={currentLayer}
      />
    </>
  )
}

export default Controls
