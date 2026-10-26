import { Suspense } from "react";
import ProductFeed from "@/components/products/ProductFeed";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white text-black p-6 text-neutral-400">
          Loading products...
        </main>
      }
    >
      <ProductFeed />
    </Suspense>
  );
}
