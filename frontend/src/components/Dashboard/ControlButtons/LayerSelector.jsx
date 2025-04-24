
import { useRef, useEffect } from "react"
import { useMapContext } from "../../Context/Mapcontext"

const layers = [
  {
    name: "Standard",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
    previewUrl: "https://a.tile.openstreetmap.org/7/64/42.png",
  },
  {
    name: "CyclOSM",
    url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.cyclosm.org/">CyclOSM</a>, OpenStreetMap contributors',
    previewUrl: "https://a.tile-cyclosm.openstreetmap.fr/cyclosm/7/64/42.png",
  },
  {
    name: "Transport Map",
    url: "https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://memomaps.de/">memomaps.de</a>, OpenStreetMap contributors',
    previewUrl: "https://tile.memomaps.de/tilegen/7/64/42.png",
  },
  {
    name: "Topographic",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>, OpenStreetMap contributors',
    previewUrl: "https://a.tile.opentopomap.org/7/64/42.png",
  },
  {
    name: "Humanitarian",
    url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>',
    previewUrl: "https://a.tile.openstreetmap.fr/hot/7/64/42.png",
  },
]

function LayerSelector() {
  const { isLayerSelectorOpen, toggleLayerSelector, changeLayer, tileLayer } = useMapContext()
  const scrollContainerRef = useRef(null)
  const selectorRef = useRef(null)

  // Handle wheel event for better scrolling on laptop touchpads
  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollContainerRef.current) {
        e.preventDefault()
        scrollContainerRef.current.scrollTop += e.deltaY
      }
    }

    const container = scrollContainerRef.current
    if (container && isLayerSelectorOpen) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }


    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [isLayerSelectorOpen])

  // Prevent map interactions when touching the layer selector
  useEffect(() => {
    const preventMapInteraction = (e) => {
      e.stopPropagation()
    }

    const selector = selectorRef.current
    if (selector && isLayerSelectorOpen) {
      selector.addEventListener("touchstart", preventMapInteraction)
      selector.addEventListener("touchmove", preventMapInteraction)
      selector.addEventListener("touchend", preventMapInteraction)
    }

    return () => {
      if (selector) {
        selector.removeEventListener("touchstart", preventMapInteraction)
        selector.removeEventListener("touchmove", preventMapInteraction)
        selector.removeEventListener("touchend", preventMapInteraction)
      }
    }
  }, [isLayerSelectorOpen])

  // Add overlay when layer selector is open on mobile
  useEffect(() => {
    if (isLayerSelectorOpen) {
      document.body.classList.add("overflow-hidden")

      // Create backdrop overlay on mobile
      const backdrop = document.createElement("div")
      backdrop.id = "layer-selector-backdrop"
      backdrop.className = "fixed inset-0 z-[999] bg-black/40 md:hidden"
      backdrop.addEventListener("click", () => toggleLayerSelector(false))
      document.body.appendChild(backdrop)
    } else {
      document.body.classList.remove("overflow-hidden")

      // Remove backdrop
      const backdrop = document.getElementById("layer-selector-backdrop")
      if (backdrop) {
        backdrop.removeEventListener("click", () => toggleLayerSelector(false))
        backdrop.remove()
      }
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
      const backdrop = document.getElementById("layer-selector-backdrop")
      if (backdrop) {
        backdrop.removeEventListener("click", () => toggleLayerSelector(false))
        backdrop.remove()
      }
    }
  }, [isLayerSelectorOpen, toggleLayerSelector])

  if (!isLayerSelectorOpen) return null

  return (
    <>
      {isLayerSelectorOpen && (
        <div
          className="fixed inset-0 z-[1111] bg-black/0"
          onClick={(e) => {
            e.stopPropagation()
            toggleLayerSelector(false)
          }}
        />
      )}
      <div
        ref={selectorRef}
        className="layer-selector fixed top-16 left-4 sm:absolute sm:top-8 sm:left-0 sm:mt-16 sm:ml-4 bg-white shadow-lg rounded-lg z-[2000] w-[calc(100%-32px)] sm:w-72 flex flex-col max-h-[80vh] transition-all duration-300 ease-in-out touch-none"
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <div className="flex justify-between items-center bg-[#4B4B4D] text-white px-4 py-3 sticky top-0">
          <h3 className="font-semibold">Map Style</h3>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleLayerSelector(false)
            }}
            className="text-white hover:text-[#D8C292]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="overflow-y-auto overscroll-contain p-3 space-y-4 flex-grow"
          tabIndex="0"
        >
          {layers.map((layer) => (
            <div
              key={layer.name}
              onClick={(e) => {
                e.stopPropagation()
                changeLayer(layer)
              }}
              className={`cursor-pointer rounded-md overflow-hidden border-2 hover:border-[#D8C292] transition-all ${
                tileLayer.name === layer.name ? "border-[#D8C292] ring-2 ring-[#D8C292]/50" : "border-gray-200"
              }`}
            >
              <div className="relative">
                <img
                  src={layer.previewUrl || "/placeholder.svg"}
                  alt={`${layer.name} preview`}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/src/assets/map-placeholder.png"
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                  <span className="bg-[#D8C292] text-white px-3 py-1 rounded-full text-sm">Preview</span>
                </div>
              </div>
              <div className="p-2 bg-gray-50">
                <p className="font-medium text-gray-800">{layer.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default LayerSelector
export { layers }
