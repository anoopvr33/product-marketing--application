"use client";

type ProductFiltersProps = {
  category: string;
  onCategoryChange: (category: string) => void;
};

const categories = ["All", "Men", "Women", "Shoes", "Accessories"];

export default function ProductFilters({
  category,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onCategoryChange(item)}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
            category === item
              ? "border-white bg-gray-100 text-black"
              : "border-white/10 bg-[#171717] text-neutral-300 hover:bg-[#252525]"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
