import Logo from "./Logo";
import LocationSelector from "./LocationSelector";
import SearchBar from "./SearchBar";
import FavoritesButton from "./FavoritesButton";
import LoginButton from "./LoginButton";
import OwnerButton from "./OwnerButton";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50  bg-[#ffffff]  backdrop-blur-xl">
      <div className="mx-auto max-w-[1500px] px-3 sm:px-5 lg:px-8">
        {/* Desktop navbar */}
        <div className="hidden min-h-[84px] items-center gap-4 lg:flex">
          <Logo />

          <div className="h-9 w-px shrink-0 bg-stone-200" />

          <LocationSelector />

          <SearchBar />
          <Link
            href="/products"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
          >
            All Products
          </Link>

          <div className="flex shrink-0 items-center gap-1">
            <FavoritesButton />
            <LoginButton />
            <OwnerButton />
          </div>
        </div>

        {/* Mobile and tablet navbar */}
        <div className="flex flex-col gap-3 py-3 lg:hidden">
          <div className="flex items-center justify-between gap-2">
            <Logo />

            <div className="flex min-w-0 items-center gap-2">
              <LocationSelector />
              <MobileMenu />
            </div>
          </div>

          <div className="w-full">
            <SearchBar />
          </div>
        </div>

        {/* Indian-inspired accent */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 flex h-[2px] w-full"
        >
          {/* <span className="w-1/3 bg-[#000a]" />
          <span className="w-1/3 bg-[#000a]" />
          <span className="w-1/3 bg-[#000a]" /> */}
        </div>
      </div>
    </header>
  );
}
