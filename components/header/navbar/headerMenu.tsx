import { headerData } from "@/lib/constants/headerData";
import Link from "next/link";
import React from "react";

function HeaderMenu() {
  return (
    <div className="hidden md:flex items-center gap-6">
      {headerData?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          className="relative group hover:text-red-400 transition-colors duration-300"
        >
          {item?.title}
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-400 transition-all duration-300 group-hover:w-full" />
        </Link>
      ))}
    </div>
  );
}

export default HeaderMenu;
