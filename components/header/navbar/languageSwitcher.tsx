"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function LanguageSwitcher() {
  const [lang, setLang] = useState<"EN" | "AR">("EN");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 h-10 px-3 rounded-lg border border-gray-200 text-xs font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span>{lang}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-20 rounded-lg border border-gray-200 bg-white shadow-md py-1 z-30">
          {(["EN", "AR"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setLang(item);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
