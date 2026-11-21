"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { headerData } from "@/lib/constants/headerData";
import Logo from "../logo";
import SocialMedia from "./socialMediaIcons";

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex items-center justify-center text-gray-900 hover:text-emerald-700 transition-colors cursor-pointer"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* الخلفية الداكنة */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* القائمة الجانبية */}
        <aside
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 left-0 h-full w-72 max-w-[80vw] bg-white p-5 shadow-xl flex flex-col gap-6 transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {headerData?.map((item) => (
              <Link
                key={item?.title}
                href={item?.href}
                onClick={() => setOpen(false)}
                className="relative group w-fit text-base font-medium text-gray-800 hover:text-red-400 transition-colors duration-300"
              >
                {item?.title}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <SocialMedia />
        </aside>
      </div>
    </div>
  );
}

export default MobileMenu;
