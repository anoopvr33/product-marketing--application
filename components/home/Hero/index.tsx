import VideoCard from "./VideoCard";
import CategoryCard from "./CategoryCard";

const videos = [
  {
    title: "Summer Outfit Ideas 2025",
    duration: "02:15",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85",
  },
  {
    title: "Men's Casual Looks",
    duration: "01:48",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85",
  },
  {
    title: "Trendy Kurtis For You",
    duration: "02:32",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=85",
  },
  {
    title: "Chic Dress Styling",
    duration: "01:56",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=85",
  },
  {
    title: "Denim Looks You'll Love",
    duration: "02:20",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=85",
  },
];

const categories = [
  {
    name: "Shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Pants",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Churidar",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e4?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Kurtis",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Denim",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Bags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Jewellery",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "More",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80",
  },
];

export default function Hero() {
  return (
    <section className="bg-white px-3 py-5 text-black sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 xl:grid-cols-2 xl:gap-6">
        {/* Left: five fashion video cards */}
        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold sm:text-xl">Shop By Video</h2>
              <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                {/* Discover the latest fashion trends */}
              </p>
            </div>

            {/* <span className="text-xs font-medium sm:text-sm"></span> */}
          </div>

          <div className="grid h-[255px] grid-cols-5 gap-2 hidden sm:grid sm:h-[300px] sm:gap-3">
            {videos.map((video) => (
              <VideoCard key={video.title} {...video} />
            ))}
          </div>
           <div className="grid h-[255px] grid-cols-4 gap-2 sm:hidden sm:h-[300px] sm:gap-3">
            {videos.slice(0,4).map((video) => (
              <VideoCard key={video.title} {...video} />
            ))}
          </div>
        </div>

        {/* Right: five columns × two rows */}
        <div className="flex min-w-0 flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-bold sm:text-xl">Shop by Category</h2>
            <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
              {/* Explore your favourite fashion categories */}
            </p>
          </div>

          <div className="grid h-[255px] flex-1 grid-cols-5 grid-rows-2 gap-2 sm:h-[300px] sm:gap-3">
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
