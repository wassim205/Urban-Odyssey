import React from "react";
const layers = [
    {
      name: "Standard",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; OpenStreetMap contributors',
    },
    {
      name: "CyclOSM",
      url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.cyclosm.org/">CyclOSM</a>, OpenStreetMap contributors',
    },
    {
      name: "Transport Map",
      url: "https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://memomaps.de/">memomaps.de</a>, OpenStreetMap contributors',
    },
    {
      name: "Topographic",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>, OpenStreetMap contributors',
    },
    {
      name: "Humanitarian",
      url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>',
    },
  ];
  
  

function Layer({ onLayerChange  }) {
    const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full aspect-square rounded-md hover:bg-[#D8C292]/70 transition duration-300 p-1 flex items-center justify-center"
        title="Change Layer"
      >
        <img
          src="/src/assets/icons/layer.svg"
          className="w-full h-full"
          alt="Layer"
        />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 bg-white shadow-md rounded-md z-[999] w-40 p-2 space-y-2">
          {layers.map((layer) => (
            <button
              key={layer.name}
              onClick={() => {
                onLayerChange(layer);
                setOpen(false);
              }}
              className="w-full text-left text-sm hover:bg-gray-100 px-2 py-1 rounded"
            >
              {layer.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Layer;