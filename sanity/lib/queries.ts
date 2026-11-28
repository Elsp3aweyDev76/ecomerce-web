import { client } from "./client";

export interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  discount?: number;
  stock?: number;
  status?: "new" | "hot" | "sale";
  images?: string[];
  categories?: string[];
}

export const ALL_PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  discount,
  stock,
  status,
  categories,
  "images": images[].asset->url
}`;

export async function getAllProducts(): Promise<SanityProduct[]> {
  "use cache";
  return client.fetch(ALL_PRODUCTS_QUERY);
}