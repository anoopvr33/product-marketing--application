
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="LocalStyle home"
      className="group flex shrink-0 items-center gap-2.5"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#edededaa] to-[#aaa] text-white shadow-sm transition-transform group-hover:scale-105">
        <ShoppingBag size={22} strokeWidth={2.2} />
        <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full border border-white bg-green-600" />
      </span>

      <span className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-stone-900">
          Local<span className="text-[#000000]">Style</span>
        </span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.19em] text-stone-500">
          Discover India
        </span>
      </span>
    </Link>
  );
}
