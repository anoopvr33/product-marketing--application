
import Link from "next/link";
import { demoProducts, demoShops } from "@/constants/product-detail-demo";
import ProductInfo from "./ProductInfo";
import ShopInfo from "./ShopInfo";
import RelatedProducts from "./RelatedProducts";

interface Props {
  productId: string;
}

export default function ProductDetailsPage({ productId }: Props) {
  const product = demoProducts.find((item) => item.id === productId);

  if (!product) {
    return (
      <main className="min-h-screen bg-black px-4 py-24 text-center text-white">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="mt-3 text-sm text-gray-700">
          This product may have been removed or is unavailable.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
        >
          Browse products
        </Link>
      </main>
    );
  }

  const shop = demoShops.find((item) => item.id === product.shopId);

  const shopProducts = demoProducts.filter(
    (item) => item.shopId === product.shopId && item.id !== product.id,
  );

  const relatedProducts = demoProducts.filter(
    (item) => item.id !== product.id,
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 overflow-hidden text-sm text-neutral-500">
          <Link href="/products" className="shrink-0 hover:text-black">
            Products
          </Link>
          <span>/</span>
          <span className="truncate text-gray-400">{product.name}</span>
        </nav>

        <ProductInfo product={product} />

        {shop && (
          <div className="mt-12">
            <ShopInfo shop={shop} products={shopProducts} />
          </div>
        )}

        <div className="mt-14">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </main>
  );
}
