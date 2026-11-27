"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Heart, ShoppingBag, Star } from "lucide-react";
import { SanityProduct } from "@/sanity/lib/queries";

interface ProductCardProps {
  product: SanityProduct;
  viewMode?: "grid" | "list";
}

export default function ProductCard({
  product,
  viewMode = "grid",
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const stockCount = product.stock ?? 0;
  const isOutOfStock = stockCount <= 0;
  const discount = product.discount ?? 0;

  // حساب السعر الأصلي قبل الخصم للعرض المشطوب
  const originalPrice =
    discount > 0 ? product.price / (1 - discount / 100) : null;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);

  return (
    <div
      className={`group rounded-xl border border-blue-100/80 bg-white overflow-hidden transition-all duration-300 hover:shadow-md hover:border-emerald-600/30 ${
        viewMode === "list"
          ? "flex flex-col sm:flex-row items-stretch"
          : "flex flex-col"
      }`}
    >
      {/* Image Container */}
      <div
        className={`relative bg-[#f6f6f6] overflow-hidden flex items-center justify-center ${
          viewMode === "list"
            ? "w-full sm:w-60 h-60 shrink-0"
            : "w-full h-64"
        }`}
      >
        {/* Status Badge (Top Left) */}
        {product.status === "hot" && (
          <span
            title="Hot Deal"
            className="absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-orange-400 bg-white text-orange-500 shadow-2xs"
          >
            <Flame className="h-4 w-4 fill-orange-500" />
          </span>
        )}
        {product.status === "sale" && (
          <span className="absolute top-3 left-3 z-10 rounded-full border border-emerald-600 bg-white px-2.5 py-0.5 text-[11px] font-semibold uppercase text-emerald-700">
            Sale
          </span>
        )}
        {product.status === "new" && (
          <span className="absolute top-3 left-3 z-10 rounded-full border border-blue-500 bg-white px-2.5 py-0.5 text-[11px] font-semibold uppercase text-blue-600">
            New
          </span>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={() => setIsWishlisted((prev) => !prev)}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-2xs transition hover:bg-emerald-800 hover:text-white cursor-pointer"
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>

        {/* Product Image */}
        <Link
          href={`/product/${product.slug}`}
          className="relative w-full h-full flex items-center justify-center p-5"
        >
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="text-xs text-gray-400">No Image</span>
          )}
        </Link>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-2.5">
        <div className="space-y-1.5">
          {/* Categories Subtitle */}
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 line-clamp-1">
            {product.categories?.length
              ? product.categories.join(", ")
              : "GADGET ACCESSORIES, ELECTRONICS"}
          </p>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-[15px] font-bold text-gray-900 line-clamp-1 hover:text-emerald-800 transition">
              {product.name}
            </h3>
          </Link>

          {/* Rating Stars */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500"
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-medium">1 Review</span>
          </div>

          {/* Stock Indicator */}
          <div className="flex items-center gap-2 text-xs pt-0.5">
            <span className="text-gray-700 font-medium">
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </span>
            {!isOutOfStock && (
              <span className="font-bold text-emerald-800">{stockCount}</span>
            )}
          </div>

          {/* Price & Discount Badge */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-base font-extrabold text-emerald-900">
              {formatPrice(product.price)}
            </span>

            {originalPrice && (
              <span className="text-xs font-medium text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}

            {discount > 0 && (
              <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-500">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Pill Button */}
        <div className="pt-1">
          <button
            type="button"
            disabled={isOutOfStock}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#385a4c] px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-[#2b463b] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}