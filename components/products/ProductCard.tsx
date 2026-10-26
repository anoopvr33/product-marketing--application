"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Heart, MapPin, Store } from "lucide-react";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  postedAt?: string;
};

export default function ProductCard({
  product,
  postedAt = "Recently posted",
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const media =
    product.media.find((item) => item.type === "video") ?? product.media[0];

  if (!media) return null;

  const productHref = `/products/${product.id}`;
  const shopHref = `/shops/${product.shopId ?? product.id}`;

  const playVideo = () => {
    if (media.type === "video" && videoRef.current) {
      void videoRef.current.play().catch(() => {});
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <article
      onMouseEnter={playVideo}
      onMouseLeave={pauseVideo}
      className="group relative mb-[10px] w-full min-w-0 break-inside-avoid"
    >
      {/* Original image card */}
      <div className="group-hover:scale-105 transition-transform duration-500 relative h-auto w-full overflow-hidden rounded-xl bg-neutral-100 sm:h-auto lg:h-auto">
        <Link
          href={productHref}
          aria-label={`View ${product.name}`}
          className="block h-full w-full"
        >
          {media.type === "video" ? (
            <video
              ref={videoRef}
              src={media.src}
              poster={media.poster}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <img
              src={media.src}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </Link>

        {/* Original gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80" />

        {/* Price and like button */}
        <div className="absolute bottom-3 left-2 right-2 z-10 flex items-center justify-between gap-2 sm:bottom-4 sm:left-3 sm:right-3">
          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-black shadow-sm sm:px-3 sm:text-sm">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <button
            type="button"
            aria-label={
              isFavorite ? "Remove from favourites" : "Add to favourites"
            }
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite((value) => !value)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/85 text-white transition hover:scale-105"
          >
            <Heart
              size={19}
              className={isFavorite ? "fill-rose-500 text-rose-500" : ""}
            />
          </button>
        </div>
      </div>

      {/* Desktop hover panel.
          Absolutely positioned so cards below never move. */}
      <div className="pointer-events-none absolute inset-x-0 top-[100%] z-50 hidden -translate-y-1 rounded-xl bg-[#171717] p-3 text-white opacity-0 shadow-2xl transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 md:block">
        {/* Shop owner and shop name */}
        <Link href={shopHref} className="flex min-w-0 items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-800 ring-1 ring-white/15">
            {product.shopOwner?.profileImage ? (
              <img
                src={product.shopOwner.profileImage}
                alt={product.shopOwner.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Store size={17} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold hover:underline">
              {product.brand}
            </p>

            {product.shopOwner?.name && (
              <p className="truncate text-xs text-neutral-400">
                {product.shopOwner.name}
              </p>
            )}
          </div>
        </Link>

        {/* Product details */}
        <div className="mt-3 border-t border-white/10 pt-3">
          <p className="text-xs text-neutral-400">{product.category}</p>

          <Link
            href={productHref}
            className="mt-1 block text-sm font-semibold hover:underline"
          >
            {product.name}
          </Link>

          <p className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
            <MapPin size={13} className="shrink-0" />
            <span>{product.location}</span>
          </p>

          <p className="mt-2 text-xs text-neutral-500">{postedAt}</p>
        </div>
      </div>
    </article>
  );
}
