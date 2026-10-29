"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { demoProducts } from "@/constants/demo-products";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";

export default function ProductFeed() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const [category, setCategory] = useState("All");
  const [mediaType, setMediaType] = useState("All");

  const products = useMemo(() => {
    return demoProducts.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesQuery =
        !query ||
        [product.name, product.brand, product.category, product.location].some(
          (value) => value.toLowerCase().includes(query.toLowerCase()),
        );

      const matchesMedia =
        mediaType === "All" ||
        product.media.some((item) =>
          mediaType === "Videos"
            ? item.type === "video"
            : item.type === "image",
        );

      return matchesCategory && matchesQuery && matchesMedia;
    });
  }, [category, mediaType, query]);

  return (
    <main className="mx-auto min-h-screen bg-white w-full min-w-0 max-w-[1600px] overflow-x-clip px-3 pb-10 pt-6 sm:px-5 lg:px-8">
      {" "}
      <section className="mb-6 flex items-end justify-between gap-3">
        {/* <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
            Explore the collection
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            {query ? `Results for "${query}"` : "Find your style."}
          </h1>

          <p className="mt-2 text-sm text-neutral-400">
            Discover fashion from shops around you.
          </p>
        </div> */}

        {/* <button
          type="button"
          className="rounded-full border m-auto mr-0 border-white/10 p-3 text-neutral-300 hover:bg-white/10"
          aria-label="Product filters"
          onClick={() =>
            document
              .getElementById("media-filters")
              ?.scrollIntoView({ behavior: "smooth", block: "nearest" })
          }
        >
          <SlidersHorizontal size={19} />
        </button> */}
      </section>
      <div className="mb-4 flex items-end justify-between gap-3">
        <ProductFilters category={category} onCategoryChange={setCategory} />
        <button
          type="button"
          className="rounded-full border m-auto bg-gray-100 mr-0 border-white/10 p-3 text-gray-500 hover:bg-black/10"
          aria-label="Product filters"
          onClick={() =>
            document
              .getElementById("media-filters")
              ?.scrollIntoView({ behavior: "smooth", block: "nearest" })
          }
        >
          <SlidersHorizontal size={19} />
        </button>
      </div>
      <div
        id="media-filters"
        className="mb-5 flex gap-2"
        aria-label="Filter products by media"
      >
        {["All", "Photos", "Videos"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setMediaType(type)}
            className={`rounded-full px-3 py-1.5 text-xs transition ${
              mediaType === type
                ? "bg-gray-100 text-black"
                : "border border-white/10 text-gray-500 hover:bg-black/10"
            }`}
          >
            {type === "All" ? "All media" : type}
          </button>
        ))}
      </div>
      <p className="mb-3 text-xs text-neutral-500">
        {products.length} products
      </p>
      {products.length > 0 ? (
        <div className="grid w-full grid-cols-2 items-start gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 py-20 text-center">
          <p className="text-lg font-medium text-white">No products found</p>
          <p className="mt-2 text-sm text-neutral-400">
            Try another search or choose a different category.
          </p>

          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setMediaType("All");
            }}
            className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-medium text-black"
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}
