
import Link from "next/link";
import { UserRound } from "lucide-react";

export default function LoginButton() {
  return (
    <Link
      href="/signin"
      className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-800 transition hover:border-orange-300 hover:bg-orange-50"
    >
      <UserRound size={18} />
      <span>Sign in</span>
    </Link>
  );
}
