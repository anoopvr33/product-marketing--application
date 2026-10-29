import ShopHeader from "./ShopHeader";
import ShopProducts from "./ShopProducts";

export default function ShopProfile() {
  return (
    <main className="min-h-screen bg-[#ffffff] pb-12 text-black">
      <div className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-3 text-sm text-gray-400">
          <span>Home</span>
          <span className="text-gray-600">›</span>
          <span>Shops</span>
          <span className="text-gray-600">›</span>
          <span className="text-gray-400">Fashion Hub</span>
        </div>

        {/* Shop information */}
        <ShopHeader />

        {/* Products */}
        <ShopProducts />
      </div>
    </main>
  );
}
