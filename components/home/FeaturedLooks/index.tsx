import FeaturedLookCard from "./FeaturedLookCard";

const featuredLooks = [
  {
    id: 1,
    alt: "Women's floral outfit",
    price: "₹1,299",
    postedAt: "2hr ago",
    widthClass: "col-span-2 sm:col-span-3",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 2,
    alt: "Men's casual fashion",
    price: "₹899",
    postedAt: "2hr ago",
    widthClass: "col-span-1 sm:col-span-2",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    alt: "Pink women's dress",
    price: "₹1,799",
    postedAt: "2hr ago",
    widthClass: "col-span-1 sm:col-span-2",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    alt: "White casual sneakers",
    price: "₹699",
    postedAt: "2hr ago",
    widthClass: "col-span-1 sm:col-span-2",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 5,
    alt: "Women's summer fashion",
    price: "₹2,199",
    postedAt: "2hr ago",
    widthClass: "col-span-1 sm:col-span-3",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85",
  },
];

export default function FeaturedLooks() {
  return (
    <section className="bg-white px-3 py-6 text-black sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-5">
          <h2 className="text-lg font-bold sm:text-xl">Featured Looks</h2>
          <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
            Fresh styles, real people, everyday fashion
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-12 sm:gap-2">
          {featuredLooks.map((look) => (
            <FeaturedLookCard key={look.id} {...look} />
          ))}
        </div>
      </div>
    </section>
  );
}
