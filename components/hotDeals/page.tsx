import React from "react";
import { cacheLife } from "next/cache";
import { client } from "@/sanity/lib/client";
import { ALL_PRODUCTS_QUERY, SanityProduct } from "@/sanity/lib/queries";
import ShopCatalog from "@/components/shop/shopComps/shop-catalog";

export const metadata = {
  title: "Hot Deals | Special Offers",
  description:
    "Discover the hottest deals and special offers across all categories.",
};

async function getProducts(): Promise<SanityProduct[]> {
  "use cache";
  cacheLife("minutes");

  try {
    const data = await client.fetch<SanityProduct[]>(ALL_PRODUCTS_QUERY);
    return data ?? [];
  } catch (error) {
    console.error("Failed to fetch hot deals products:", error);
    return [];
  }
}

export default async function HotDealsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50/40">
      <ShopCatalog
        products={products}
        initialStatus="hot"
        pageTitle="Hot Deals"
        pageSubtitle="Top trending items and special offers available right now"
      />
    </main>
  );
}
