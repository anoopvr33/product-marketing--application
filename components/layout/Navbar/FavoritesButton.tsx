import Link from "next/link";
import { Heart } from "lucide-react";

export default function FavoritesButton() {
  return (
    <Link
      href="/favorites"
      aria-label="Wishlist"
      title="Wishlist"
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-stone-600 transition hover:bg-gray-500 hover:text-black-600"
    >
      <Heart size={21} strokeWidth={1.8} />
    </Link>
  );
}
