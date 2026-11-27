import { getAllProducts } from "@/sanity/lib/queries";
import HomeBanner from "../components/body/baner/homeBanner"; // عدّل المسار حسب مشروعك
import FeaturedProducts from "./body/featured-products";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main>
      <HomeBanner />
      <FeaturedProducts products={products} />
    </main>
  );
}
