import Link from "next/link";
import { Store } from "lucide-react";

export default function OwnerButton() {
  return (
    <Link
      href="/shop-verification"
      className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#080808ea] px-4 text-sm font-semibold text-white transition hover:bg-gray-400"
    >
      <Store size={18} />
      <span>shops</span>
    </Link>
  );
}
