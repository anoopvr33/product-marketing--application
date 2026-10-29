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
      className="group relative min-w-0"
    >
      {/* Product image: identical dimensions for every card */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100">
        <Link
          href={productHref}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 block"
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

        {media.type === "video" && (
          <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium text-white">
            VIDEO
          </span>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between gap-2 sm:bottom-3 sm:left-3 sm:right-3">
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
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-sm transition hover:scale-105"
          >
            <Heart
              size={18}
              className={isFavorite ? "fill-rose-500 text-rose-500" : ""}
            />
          </button>
        </div>
      </div>

      {/* Normal card details */}
      {/* <div className="pt-2">
        <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
          {product.brand}
        </p>
        <p className="mt-0.5 truncate text-xs text-neutral-500">
          {product.name}
        </p>
      </div> */}

      {/* Hover details: directly below the image, without covering
          another grid column or creating a dark empty area */}
      <div className="pointer-events-none absolute left-0 right-0 top-full z-50 hidden rounded-xl border border-neutral-200 bg-white p-3 text-neutral-900 opacity-0 shadow-xl transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-1 group-focus-within:opacity-100 md:block dark:border-neutral-700 dark:bg-neutral-900 dark:text-white">
        <Link href={shopHref} className="flex min-w-0 items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
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
            <p className="truncate text-sm font-semibold">{product.brand}</p>
            {product.shopOwner?.name && (
              <p className="truncate text-xs text-neutral-500">
                {product.shopOwner.name}
              </p>
            )}
          </div>
        </Link>

        <div className="mt-3 border-t border-neutral-200 pt-3 dark:border-neutral-700">
          <p className="text-xs text-neutral-500">{product.category}</p>

          <Link
            href={productHref}
            className="mt-1 block text-sm font-semibold hover:underline"
          >
            {product.name}
          </Link>

          <p className="mt-2 flex items-start gap-1.5 text-xs text-neutral-500">
            <MapPin size={13} className="mt-0.5 shrink-0" />
            <span>{product.location}</span>
          </p>

          <p className="mt-2 text-xs text-neutral-400">{postedAt}</p>
        </div>
      </div>
    </article>
  );
}
