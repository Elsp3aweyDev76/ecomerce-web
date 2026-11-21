import React from "react";
import Link from "next/link";
import { ShoppingBag, Heart, User } from "lucide-react";

function HeaderIcons() {
  return (
    <div className="flex items-center gap-3.5 pl-1">
      <Link
        href="/cart"
        className="text-gray-900 hover:text-emerald-700 transition-colors"
        aria-label="Cart"
      >
        <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
      </Link>

      <Link
        href="/wishlist"
        className="text-gray-900 hover:text-emerald-700 transition-colors"
        aria-label="Wishlist"
      >
        <Heart className="w-5 h-5 stroke-[1.8]" />
      </Link>

      <Link
        href="/account"
        className="text-gray-900 hover:text-emerald-700 transition-colors"
        aria-label="Account"
      >
        <User className="w-5 h-5 stroke-[1.8]" />
      </Link>
    </div>
  );
}

export default HeaderIcons;
