import React from "react";

function LayerButton({ onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`w-full aspect-square rounded-md ${
        isActive ? "bg-[#D8C292]/70" : "hover:bg-[#D8C292]/70"
      } transition duration-300 p-1 flex items-center justify-center`}
      title="Change Layer"
    >
      <img
        src="/src/assets/icons/layer.svg"
        className="w-full h-full"
        alt="Layer"
      />
    </button>
  );
}

export default LayerButton;