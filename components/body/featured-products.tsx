"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Grid2x2,
  Grid3x3,
  List,
  SlidersHorizontal,
  ArrowUpDown,
  Eye,
} from "lucide-react";
import ProductCard from "../body/product-card";
import { SanityProduct } from "@/sanity/lib/queries";

const CATEGORIES = ["Gadget", "Appliances", "Refrigerators", "Others"] as const;

type ViewMode = "grid-4" | "grid-3" | "grid-2" | "grid-5" | "list";
type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

interface FeaturedProductsProps {
  products: SanityProduct[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [selectedTab, setSelectedTab] = useState<string>("Gadget");
  const [viewMode, setViewMode] = useState<ViewMode>("grid-4");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [showFilters, setShowFilters] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);

  // ترتيب وفلترة المنتجات
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (onlyInStock) {
      result = result.filter((p) => (p.stock ?? 0) > 0);
    }

    result.sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

    return result;
  }, [products, onlyInStock, sortBy]);

  const gridClasses: Record<ViewMode, string> = {
    "grid-5": "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    "grid-4": "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    "grid-3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "grid-2": "grid-cols-1 sm:grid-cols-2",
    list: "grid-cols-1",
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Title with Side Green Lines */}
      <div className="text-center mb-8 space-y-2">
        <div className="flex items-center justify-center gap-3">
          <span className="h-0.5 w-8 bg-emerald-700 rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Our Products
          </h2>
          <span className="h-0.5 w-8 bg-emerald-700 rounded-full" />
        </div>
        <p className="text-sm text-gray-500">
          Discover our carefully curated selection of premium products
        </p>
      </div>

      {/* Filter & Controls Container */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs space-y-4">
        {/* Top Row: Category Pills + See all */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const isActive = selectedTab === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedTab(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition cursor-pointer ${
                    isActive
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "bg-emerald-50/70 text-gray-800 border-emerald-200 hover:bg-emerald-100/70"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <Link
            href="/shop"
            className="px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-800 hover:bg-gray-50 transition"
          >
            See all
          </Link>
        </div>

        <hr className="border-gray-100" />

        {/* Bottom Row: View Switcher + Filters + Sort + Count */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left Side: View & Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 mr-1">View:</span>

              <button
                type="button"
                onClick={() => setViewMode("grid-5")}
                aria-label="5 columns grid"
                className={`p-2 rounded-md border transition cursor-pointer ${
                  viewMode === "grid-5"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid-3")}
                aria-label="3 columns grid"
                className={`p-2 rounded-md border transition cursor-pointer ${
                  viewMode === "grid-3"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Grid2x2 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid-2")}
                aria-label="2 columns grid"
                className={`p-2 rounded-md border transition cursor-pointer ${
                  viewMode === "grid-2"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid-4")}
                aria-label="4 columns grid"
                className={`p-2 rounded-md border transition cursor-pointer ${
                  viewMode === "grid-4"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`p-2 rounded-md border transition cursor-pointer ${
                  viewMode === "list"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition cursor-pointer ${
                showFilters
                  ? "border-emerald-700 bg-emerald-50 text-emerald-800"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </button>
          </div>

          {/* Right Side: Sort & Products Count */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:border-emerald-600"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <Eye className="h-4 w-4 text-gray-400" />
              <span className="rounded-md bg-orange-50 px-2.5 py-1 font-semibold text-emerald-800">
                {filteredProducts.length} products
              </span>
            </div>
          </div>
        </div>

        {/* Collapsible Extra Filters */}
        {showFilters && (
          <div className="pt-2 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-700">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded border-gray-300 text-emerald-700 focus:ring-emerald-600"
              />
              In Stock Only
            </label>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-sm text-gray-500">
          No products found in {selectedTab}.
        </div>
      ) : (
        <div className={`grid ${gridClasses[viewMode]} gap-6 mt-6`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              viewMode={viewMode === "list" ? "list" : "grid"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
