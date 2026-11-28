import React from "react";
import { client } from "@/sanity/lib/client";
import { ALL_PRODUCTS_QUERY, SanityProduct } from "@/sanity/lib/queries";
import ShopCatalog from "./shop/shopComps/shop-catalog";

export const metadata = {
  title: "Shop | All Products",
  description: "Browse the full catalog of products across all categories.",
};

async function getProducts(): Promise<SanityProduct[]> {
  try {
    const data = await client.fetch<SanityProduct[]>(ALL_PRODUCTS_QUERY);
    return data ?? [];
  } catch (error) {
    console.error("Failed to fetch shop products:", error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50/40">
      <ShopCatalog products={products} />
    </main>
  );
}
