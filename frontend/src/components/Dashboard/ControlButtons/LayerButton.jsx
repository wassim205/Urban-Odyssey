import { useMapContext } from "../../Context/Mapcontext";

function LayerButton({ isActive }) {
  const { toggleLayerSelector } = useMapContext();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        toggleLayerSelector()
      }}
      className={`w-full aspect-square rounded-md ${
        isActive ? "bg-[#D8C292]/70" : "hover:bg-[#D8C292]/70"
      } transition duration-300 p-1 flex items-center justify-center`}
      title="Change Layer"
    >
      <img src="/src/assets/icons/layer.svg" className="w-full h-full" alt="Layer" />
    </button>
  )
}

export default LayerButton
