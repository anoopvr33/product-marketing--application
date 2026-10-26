"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Search, Store, X } from "lucide-react";

const searchItems = [
  { name: "Cotton Kurtis", type: "Product", category: "Women" },
  { name: "Men's Casual Shirts", type: "Product", category: "Men" },
  { name: "Traditional Sarees", type: "Product", category: "Ethnic wear" },
  { name: "Designer Blouses", type: "Product", category: "Women" },
  { name: "Sneakers", type: "Product", category: "Footwear" },
  { name: "Denim Jeans", type: "Product", category: "Men" },
  { name: "Ethnic Wear Shops", type: "Shop", category: "Nearby shops" },
  { name: "Fashion Boutiques", type: "Shop", category: "Local stores" },
];

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return [];

    return searchItems
      .filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.type.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term),
      )
      .slice(0, 6);
  }, [query]);

  function submitSearch(value = query) {
    const term = value.trim();

    if (!term) return;

    setQuery(term);
    setOpen(false);
    setActiveIndex(-1);

    router.push(`/products?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="relative min-w-0 flex-1">
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();

          const selected = results[activeIndex];

          submitSearch(selected?.name ?? query);
        }}
        className={`flex h-11 items-center rounded-xl border bg-white transition ${
          open && query.trim()
            ? "border-orange-400 shadow-sm shadow-orange-100"
            : "border-stone-200 hover:border-stone-300"
        }`}
      >
        <Search size={19} className="ml-3 shrink-0 text-stone-400" />

        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" && results.length) {
              event.preventDefault();
              setOpen(true);
              setActiveIndex((current) =>
                current >= results.length - 1 ? 0 : current + 1,
              );
            }

            if (event.key === "ArrowUp" && results.length) {
              event.preventDefault();
              setActiveIndex((current) =>
                current <= 0 ? results.length - 1 : current - 1,
              );
            }

            if (event.key === "Escape") {
              setOpen(false);
              setActiveIndex(-1);
            }
          }}
          placeholder="Search products, brands & shops..."
          aria-label="Search products, brands and shops"
          aria-autocomplete="list"
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-stone-800 outline-none placeholder:text-stone-400"
        />

        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setOpen(true);
              setActiveIndex(-1);
            }}
            className="mr-1 rounded-lg p-1.5 text-stone-400 hover:bg-stone-100"
          >
            <X size={16} />
          </button>
        )}

        <button
          type="submit"
          className="mr-1 flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-[#151515ed] px-3 text-xs font-bold text-white transition hover:bg-black-600 sm:px-4 sm:text-sm"
        >
          <span className="hidden sm:inline">Search</span>
          <ArrowUpRight size={16} />
        </button>
      </form>

      {open && query.trim() && (
        <>
          <button
            type="button"
            aria-label="Close search suggestions"
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div
            role="listbox"
            aria-label="Search suggestions"
            className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-xl"
          >
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
              {results.length ? "Suggestions" : "Search"}
            </p>

            {results.length ? (
              results.map((item, index) => (
                <button
                  key={`${item.type}-${item.name}`}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => submitSearch(item.name)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    activeIndex === index ? "bg-orange-50" : "hover:bg-stone-50"
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    {item.type === "Shop" ? (
                      <Store size={18} />
                    ) : (
                      <Search size={17} />
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-stone-800">
                      {item.name}
                    </span>
                    <span className="block text-xs text-stone-500">
                      {item.category}
                    </span>
                  </span>

                  <span className="shrink-0 rounded-full bg-stone-100 px-2 py-1 text-[10px] font-semibold text-stone-500">
                    {item.type}
                  </span>
                </button>
              ))
            ) : (
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => submitSearch()}
                className="w-full rounded-xl px-3 py-3 text-left text-sm text-stone-600 hover:bg-orange-50"
              >
                Search for <span className="font-bold">“{query}”</span>
              </button>
            )}

            <p className="px-3 pb-2 pt-3 text-[10px] text-stone-400">
              Discover products and shops across India
            </p>
          </div>
        </>
      )}
    </div>
  );
}
