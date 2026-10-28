"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import type { ProductCardProps } from "@/types/product";

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [liked, setLiked] = useState(false);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className="group min-w-0 cursor-pointer overflow-hidden rounded-xl border border-[#1c2735] bg-gradient-to-b from-[#0d1521] to-[#080d15] transition-colors hover:border-[#35435a]"
    >
      <div className="relative aspect-[4/4.5] overflow-hidden bg-[#111827]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {product.isNew && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-emerald-400 px-3 py-1 text-[11px] font-semibold text-white sm:left-3 sm:top-3">
            New
          </span>
        )}

        {!product.isNew && discount > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-violet-600 px-3 py-1 text-[11px] font-semibold text-white sm:left-3 sm:top-3">
            {discount}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setLiked((previous) => !previous);
          }}
          aria-label={liked ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={liked}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/80 sm:right-3 sm:top-3"
        >
          <Heart
            size={18}
            className={liked ? "fill-rose-500 text-rose-500" : ""}
          />
        </button>
      </div>

      <div className="p-3 sm:p-3.5">
        <h3 className="truncate text-[13px] font-medium text-gray-100 sm:text-sm">
          {product.name}
        </h3>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold text-white sm:text-base">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.originalPrice && discount > 0 && (
            <>
              <span className="text-xs text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#38465b] bg-violet-500 text-[10px] font-semibold text-white">
            F
          </div>
          <span className="truncate text-xs text-gray-400">Fashion Hub</span>
        </div>
      </div>
    </article>
  );
}
