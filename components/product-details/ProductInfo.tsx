"use client";

import { useState } from "react";
import type { DetailProduct } from "@/types/product-detail";

interface Props {
  product: DetailProduct;
}

export default function ProductInfo({ product }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  return (
    <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <div className="overflow-hidden md:w-150 md:h-150 rounded-2xl ">
          <img
            src={product.images[activeImage]}
            alt={product.name}
            className="aspect-[4/5] h-full m-auto object-cover"
          />
        </div>

        {product.images.length > 1 && (
          <div className="mt-3 flex gap-3 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`View product image ${index + 1}`}
                className={`w-16 shrink-0 overflow-hidden rounded-lg border-2 sm:w-20 ${
                  activeImage === index ? "border-gray" : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="aspect-[4/5] w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <p className="text-sm text-gray-400">
          {product.type} / {product.brand}
        </p>

        <h1 className="mt-3 text-2xl font-semibold leading-tight text-black sm:text-3xl">
          {product.name}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-2xl font-semibold text-black">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <span className="text-neutral-500 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}

          {discount > 0 && (
            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200">
              {discount}% off
            </span>
          )}
        </div>

        <p
          className={`mt-4 text-sm ${
            product.available ? "text-green-400" : "text-red-400"
          }`}
        >
          {product.available ? "● In stock" : "● Currently unavailable"}
        </p>

        <div className="mt-7">
          <h2 className="text-sm font-medium text-black">Available sizes</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
                className={`min-w-11 rounded-lg border px-3 py-2 text-sm transition ${
                  selectedSize === size
                    ? "border-black bg-white text-black"
                    : "border-neutral-700 text-neutral-300 hover:border-neutral-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <h2 className="text-sm font-medium text-black">Description</h2>
          <p className="mt-2 text-sm leading-7 text-gray-400">
            {product.description}
          </p>
        </div>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `Hi, I'm interested in ${product.name} (Product ID: ${product.id})${selectedSize ? `, Size: ${selectedSize}` : ""}. Is it available?`,
          )}`}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!product.available}
          onClick={(event) => {
            if (!product.available) event.preventDefault();
          }}
          className={`mt-8 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition ${
            product.available
              ? "bg-black text-white hover:bg-neutral-200"
              : "pointer-events-none bg-neutral-800 text-neutral-500"
          }`}
        >
          Enquire on WhatsApp
        </a>

        <p className="mt-2 text-xs text-neutral-500">
          Contact the shop to confirm the final price and availability.
        </p>
      </div>
    </section>
  );
}
