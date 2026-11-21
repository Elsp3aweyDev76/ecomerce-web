"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

function SearchBar() {
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-between w-72 h-10 px-3 rounded-lg border border-gray-200 bg-white focus-within:border-emerald-700 transition-colors">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          ref={searchInputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products..."
          className="w-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
        />
      </div>
      <kbd className="ml-2 px-2 py-0.5 text-xs font-medium text-gray-500 border border-gray-200 rounded bg-gray-50 shrink-0">
        Ctrl K
      </kbd>
    </div>
  );
}

export default SearchBar;
