import TrendingProductCard from "./TrendingProductCard";

const trendingProducts = [
  {
    id: 1,
    name: "Casual Shirt",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 2,
    name: "Denim Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 3,
    name: "Kurti",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 4,
    name: "Sneakers",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 5,
    name: "Handbag",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 6,
    name: "Dress",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 7,
    name: "Earrings",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 8,
    name: "Hoodie",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=85",
  },
];

export default function TrendingProducts() {
  return (
    <section className="bg-white px-3 py-6 text-black sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-5">
          <h2 className="text-lg font-bold sm:text-xl">Trending Products</h2>
          <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
            Most loved styles right now
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {trendingProducts.map((product) => (
            <TrendingProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
