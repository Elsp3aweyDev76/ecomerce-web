"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  LayoutGrid,
  Grid2x2,
  List,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  PackageSearch,
} from "lucide-react";
import ProductCard from "@/components/body/product-card";
import { SanityProduct } from "@/sanity/lib/queries";

const CATEGORY_TABS = [
  "All",
  "Gadget",
  "Appliances",
  "Refrigerators",
  "Others",
] as const;

type CategoryTab = (typeof CATEGORY_TABS)[number];
export type StatusFilter = "all" | "new" | "hot" | "sale";
type ViewMode = "grid-4" | "grid-3" | "grid-2" | "list";
type SortOption =
  "default" | "name-asc" | "name-desc" | "price-asc" | "price-desc";

export interface ShopCatalogProps {
  products: SanityProduct[];
  initialStatus?: StatusFilter;
  pageTitle?: string;
  pageSubtitle?: string;
}

export default function ShopCatalog({
  products,
  initialStatus = "all",
  pageTitle = "All Products",
  pageSubtitle,
}: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryTab>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(initialStatus);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid-4");
  const [showExtraFilters, setShowExtraFilters] = useState(true);

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryTab, number> = {
      All: products.length,
      Gadget: 0,
      Appliances: 0,
      Refrigerators: 0,
      Others: 0,
    };

    for (const product of products) {
      for (const tab of [
        "Gadget",
        "Appliances",
        "Refrigerators",
        "Others",
      ] as const) {
        if (
          product.categories?.some((c) => c.toLowerCase() === tab.toLowerCase())
        ) {
          counts[tab] += 1;
        }
      }
    }

    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) =>
        p.categories?.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase(),
        ),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (p) => (p.status ?? "").toLowerCase() === statusFilter,
      );
    }

    if (onlyInStock) {
      result = result.filter((p) => (p.stock ?? 0) > 0);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q),
      );
    }

    result.sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

    return result;
  }, [
    products,
    selectedCategory,
    statusFilter,
    onlyInStock,
    searchQuery,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedCategory !== "All" ||
    statusFilter !== initialStatus ||
    onlyInStock ||
    searchQuery.trim() !== "" ||
    sortBy !== "default";

  const resetFilters = () => {
    setSelectedCategory("All");
    setStatusFilter(initialStatus);
    setOnlyInStock(false);
    setSearchQuery("");
    setSortBy("default");
  };

  const gridClasses: Record<ViewMode, string> = {
    "grid-4": "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    "grid-3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "grid-2": "grid-cols-1 sm:grid-cols-2",
    list: "grid-cols-1",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-1 rounded-full bg-emerald-700" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {pageTitle}
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {pageSubtitle ??
              `Explore our complete store catalog (${products.length} total products)`}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name or specs..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Controls Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5 shadow-2xs space-y-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_TABS.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition cursor-pointer ${
                  isActive
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-emerald-50/60 text-gray-800 border-emerald-200 hover:bg-emerald-100/70"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {categoryCounts[category]}
                </span>
              </button>
            );
          })}
        </div>

        <hr className="border-gray-100" />

        {/* Toolbar: View + Extra Filters Toggle + Sort + Count */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Switcher */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode("grid-4")}
                aria-label="4 columns grid"
                className={`p-2 rounded-lg border transition cursor-pointer ${
                  viewMode === "grid-4"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid-3")}
                aria-label="3 columns grid"
                className={`p-2 rounded-lg border transition cursor-pointer ${
                  viewMode === "grid-3"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Grid2x2 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`p-2 rounded-lg border transition cursor-pointer ${
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
              onClick={() => setShowExtraFilters((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition cursor-pointer ${
                showExtraFilters
                  ? "border-emerald-700 bg-emerald-50 text-emerald-800"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            )}
          </div>

          {/* Sort & Results Count */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:border-emerald-600"
              >
                <option value="default">Featured Order</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>

            <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              Showing {filteredProducts.length} of {products.length}
            </span>
          </div>
        </div>

        {/* Status & Stock Filters */}
        {showExtraFilters && (
          <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-700">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-500 font-medium">Status:</span>
              {(["all", "new", "hot", "sale"] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-md border capitalize font-medium transition cursor-pointer ${
                    statusFilter === status
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <label className="inline-flex items-center gap-2 cursor-pointer font-medium">
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

      {/* Products Grid / List */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 px-4 text-center space-y-3">
          <PackageSearch className="h-10 w-10 text-gray-400 mx-auto" />
          <p className="text-sm font-medium text-gray-700">
            No products match your current filters.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-800 transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className={`grid ${gridClasses[viewMode]} gap-6`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              viewMode={viewMode === "list" ? "list" : "grid"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
