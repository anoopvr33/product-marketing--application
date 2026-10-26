import Link from "next/link";
import type { DetailProduct, DetailShop } from "@/types/product-detail";

interface Props {
  shop: DetailShop;
  products: DetailProduct[];
}

export default function ShopInfo({ shop, products }: Props) {
  return (
    <section className="rounded-2xl border border-neutral-800 p-4 sm:p-6">
      <div className="flex items-center gap-4">
        <img
          src={shop.image}
          alt={shop.name}
          className="h-14 w-14 rounded-full border border-neutral-800 object-cover sm:h-16 sm:w-16"
        />

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-black sm:text-lg">
            {shop.name}
          </h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-400">
            <span aria-hidden="true">⌖</span>
            {shop.location}
          </p>
        </div>

        <span className="hidden rounded-full border border-gray-500 px-3 py-1 text-xs text-gray-400 sm:inline-block">
          Shop
        </span>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-medium text-gray-400">
          More from this shop
        </h3>

        {products.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {products.slice(0, 5).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="w-24 shrink-0 sm:w-28"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="aspect-[3/4] w-full rounded-xl object-cover transition hover:opacity-80"
                />
                {/* <p className="mt-2 truncate text-xs text-neutral-300">
                  {product.name}
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  ₹{product.price.toLocaleString("en-IN")}
                </p> */}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">
            No other products available.
          </p>
        )}
      </div>
    </section>
  );
}
