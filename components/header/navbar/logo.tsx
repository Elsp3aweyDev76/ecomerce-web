import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
    return (
        <Link
            href="/"
            className="inline-flex items-center gap-2 group focus:outline-none"
        >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-emerald-600">
                <ShoppingBag className="h-5 w-5" />
            </div>
            <h2
                className={cn(
                    "text-2xl font-extrabold tracking-tight   text-gray-900 transition-colors duration-300",
                    className
                )}
            >
                My Shoppin
                <span className="text-emerald-600 transition-colors duration-300 group-hover:text-emerald-800">
                    g
                </span>
            </h2>
        </Link>
    );
};

export default Logo;