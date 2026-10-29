"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductViewer from "./ProductViewer";
import { products } from "@/constants/demo-products";

const tabs = ["All Products", "Men", "Women", "Accessories", "New Arrivals"];

export default function ShopProducts() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All Products");
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState("5000");
  const [discountOnly, setDiscountOnly] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeTab === "New Arrivals") {
      result = result.filter((product) => product.isNew);
    } else if (activeTab !== "All Products") {
      result = result.filter((product) => product.category === activeTab);
    }

    result = result.filter(
      (product) => product.price <= Math.max(0, Number(maxPrice) || 0),
    );

    if (discountOnly) {
      result = result.filter(
        (product) =>
          product.originalPrice !== undefined &&
          product.originalPrice > product.price,
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeTab, sortBy, maxPrice, discountOnly]);

  // Close the viewer if filtering removes its selected product.
  const viewerIndex =
    selectedIndex !== null && filteredProducts[selectedIndex] !== undefined
      ? selectedIndex
      : null;

  return (
    <>
      <section>
        {/* Category tabs and toolbar */}
        <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedIndex(null);
                }}
                className={`shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition sm:px-4 ${
                  activeTab === tab
                    ? "border-violet-500 text-black"
                    : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#1e293b] bg-[#0b111c] px-3 sm:flex-none">
              <span className="whitespace-nowrap text-xs text-gray-300 sm:text-sm">
                Sort by:
              </span>

              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setSelectedIndex(null);
                }}
                className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none sm:text-sm"
                aria-label="Sort products"
              >
                <option className="bg-[#0b111c]" value="latest">
                  Latest
                </option>
                <option className="bg-[#0b111c]" value="price-low">
                  Price: Low to High
                </option>
                <option className="bg-[#0b111c]" value="price-high">
                  Price: High to Low
                </option>
                <option className="bg-[#0b111c]" value="name">
                  Name
                </option>
              </select>

              <ChevronDown size={15} className="shrink-0 text-gray-400" />
            </label>

            <button
              type="button"
              onClick={() => setShowFilters((previous) => !previous)}
              aria-expanded={showFilters}
              className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-sm transition ${
                showFilters
                  ? "border-violet-500 bg-violet-500/10 text-black"
                  : "border-[#354052] text-gray-500 hover:bg-[#151e2d]"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filter
            </button>

            <button
              type="button"
              onClick={() => router.push("/products/add")}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-500 sm:flex-none"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mb-5 rounded-xl border border-[#263142] bg-[#0b111c] p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-white">Filter products</h3>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                aria-label="Close filters"
                className="text-gray-400 transition hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="shop-max-price"
                  className="text-sm text-gray-300"
                >
                  Maximum price (₹)
                </label>

                <input
                  id="shop-max-price"
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(event) => {
                    setMaxPrice(event.target.value);
                    setSelectedIndex(null);
                  }}
                  className="h-10 w-full rounded-lg border border-[#303b4d] bg-[#111a28] px-3 text-sm text-white outline-none focus:border-violet-500 sm:w-48"
                />
              </div>

              <label className="flex h-10 items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={discountOnly}
                  onChange={(event) => {
                    setDiscountOnly(event.target.checked);
                    setSelectedIndex(null);
                  }}
                  className="accent-violet-500"
                />
                Discounted products only
              </label>

              <button
                type="button"
                onClick={() => {
                  setMaxPrice("5000");
                  setDiscountOnly(false);
                  setActiveTab("All Products");
                  setSelectedIndex(null);
                }}
                className="h-10 rounded-lg border border-[#354052] px-4 text-sm text-gray-300 transition hover:bg-[#151e2d]"
              >
                Reset filters
              </button>
            </div>
          </div>
        )}

        <p className="mb-4 text-xs text-gray-500">
          Showing {filteredProducts.length} products
        </p>

        {/* Uniform grid — clicking a card opens ProductViewer */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[#1c2735] bg-[#0b111c] py-16 text-center">
            <p className="text-base font-medium text-gray-400">
              No products found
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Try changing your category or filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveTab("All Products");
                setMaxPrice("5000");
                setDiscountOnly(false);
                setSelectedIndex(null);
              }}
              className="mt-4 text-sm font-medium text-violet-400 hover:text-violet-300"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Viewer is rendered outside the shop section */}
      {viewerIndex !== null && (
        <ProductViewer
          products={filteredProducts}
          initialIndex={viewerIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  );
}
