"use client";

import type { ProductFormValues } from "./ProductFields";
import { ImageIcon, Heart, Video } from "lucide-react";

type Props = {
  values: ProductFormValues;
  imageUrls: string[];
  video: File | null;
};

export default function ProductPreview({ values, imageUrls, video }: Props) {
  const price = Number(values.price);
  const discount = Number(values.discount) || 0;
  const originalPrice =
    Number.isFinite(price) && price > 0 ? price / (1 - discount / 100) : 0;

  return (
    <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-4">
      <h2 className="font-semibold text-black">Product Preview</h2>

      <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200 p-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100">
          {imageUrls[0] ? (
            <img
              src={imageUrls[0]}
              alt={values.title || "Product preview"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-neutral-400">
              <ImageIcon size={32} />
              <span className="text-sm">Product image preview</span>
            </div>
          )}

          <button
            type="button"
            aria-label="Favourite preview"
            className="absolute right-3 top-3 rounded-full bg-white p-2 text-black"
          >
            <Heart size={17} />
          </button>

          {discount > 0 && (
            <span className="absolute bottom-3 left-3 rounded-md bg-white px-2 py-1 text-xs font-medium text-black">
              {discount}% OFF
            </span>
          )}
        </div>

        <div className="space-y-3 pt-4">
          <h3 className="font-medium text-black">
            {values.title || "Product name"}
          </h3>

          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-lg font-semibold text-black">
              {price > 0
                ? `₹${Math.round(price * (1 - discount / 100)).toLocaleString("en-IN")}`
                : "₹0"}
            </span>

            {discount > 0 && price > 0 && (
              <span className="text-sm text-neutral-400 line-through">
                ₹{Math.round(price).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {discount > 0 && originalPrice > 0 && (
            <p className="text-xs text-neutral-500">
              Original price: ₹
              {Math.round(originalPrice).toLocaleString("en-IN")}
            </p>
          )}

          <div className="flex flex-wrap gap-2 text-xs text-neutral-500">
            {values.type && <span>{values.type}</span>}
            {values.category && <span>· {values.category}</span>}
            {values.brand && <span>· {values.brand}</span>}
          </div>

          {values.sizes.length > 0 && (
            <p className="text-xs text-neutral-600">
              Sizes: {values.sizes.join(", ")}
            </p>
          )}

          {values.colors.length > 0 && (
            <p className="text-xs text-neutral-600">
              Colours: {values.colors.join(", ")}
            </p>
          )}

          <p className="text-xs text-neutral-500">
            {values.availability || "Availability not selected"}
          </p>

          {imageUrls.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {imageUrls.slice(1).map((url, index) => (
                <img
                  key={`${url}-${index}`}
                  src={url}
                  alt={`Additional product image ${index + 2}`}
                  className="h-14 w-12 shrink-0 rounded-md border border-neutral-200 object-cover"
                />
              ))}
            </div>
          )}

          {video && (
            <p className="flex items-center gap-2 text-xs text-neutral-600">
              <Video size={15} />
              Video selected
            </p>
          )}
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-neutral-500">
        This is a preview. The published product may look different depending on
        its final display and shop details.
      </p>
    </aside>
  );
}
