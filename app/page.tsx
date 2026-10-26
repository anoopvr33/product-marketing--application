import Hero from "@/components/home/Hero";
import FeaturedLooks from "@/components/home/FeaturedLooks";
import TrendingProducts from "@/components/home/TrendingProducts";
export default function HomePage() {
  return (
    <>
      {/* Keep your existing Navbar here */}

      <main className="min-h-screen bg-white text-black">
        <Hero />
        <FeaturedLooks />
        <TrendingProducts />
      </main>
    </>
  );
}
