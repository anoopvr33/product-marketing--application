"use client";

import Link from "next/link";
import { useState } from "react";
import type { DetailProduct } from "@/types/product-detail";

interface Props {
  products: DetailProduct[];
}

export default function RelatedProducts({ products }: Props) {
  const [liked, setLiked] = useState<string[]>([]);

  if (products.length === 0) return null;

  function toggleLike(id: string) {
    setLiked((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  }

  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            You may also like
          </p>
          <h2 className="mt-2 text-xl font-semibold text-black sm:text-2xl">
            Related products
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
        {products.map((product) => {
          const isLiked = liked.includes(product.id);

          return (
            <article key={product.id} className="group min-w-0">
              <div className="relative overflow-hidden rounded-xl bg-neutral-900 sm:rounded-2xl">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => toggleLike(product.id)}
                  aria-label={isLiked ? "Unlike product" : "Like product"}
                  aria-pressed={isLiked}
                  className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-lg text-black backdrop-blur transition hover:bg-gray sm:right-3 sm:top-3"
                >
                  <span className={isLiked ? "text-red-400" : ""}>
                    {isLiked ? "♥" : "♡"}
                  </span>
                </button>

                <Link
                  href={`/products/${product.id}`}
                  className="absolute inset-x-0 bottom-0 hidden translate-y-full bg-black/75 p-3 text-xs text-white backdrop-blur transition-transform duration-300 group-hover:translate-y-0 md:block"
                >
                  View details
                </Link>
              </div>

              <Link href={`/products/${product.id}`} className="block">
                <p className="mt-3 truncate text-sm text-gray-400">
                  {product.name}
                </p>
                <p className="mt-1 text-sm font-semibold text-black">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <p className="mt-1 truncate text-xs text-gray-400">
                  {product.shopName}
                </p>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
