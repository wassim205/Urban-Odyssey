"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-white" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-xs sm:max-w-md md:w-64 lg:w-72 xl:w-80 h-9 pl-10 text-lg font-poppins rounded-lg bg-[#D2C3A2] border border-[#D2C3A2] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-[#817456]"
      />
    </div>
  );
}