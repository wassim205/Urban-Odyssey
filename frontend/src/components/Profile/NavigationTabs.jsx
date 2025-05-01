import React, { useContext } from "react";
import { ProfileContext } from "../Context/ProfileContext";

const NavigationTabs = () => {
  const { activeTab, setActiveTab } = useContext(ProfileContext);

  return (
    <div className="bg-white mt-6 rounded-xl shadow-md">
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "overview"
                ? "border-b-2 border-[#D8C292] text-[#D8C292]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("places")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "places"
                ? "border-b-2 border-[#D8C292] text-[#D8C292]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Favorite Places
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "settings"
                ? "border-b-2 border-[#D8C292] text-[#D8C292]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Settings
          </button>
        </nav>
      </div>
    </div>
  );
};

export default NavigationTabs;
