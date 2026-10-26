
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Heart,
  MoreHorizontal,
  Store,
  UserRound,
  X,
} from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const menuItems = [
    { href: "/favorites", label: "My wishlist", icon: Heart },
    { href: "/signin", label: "Sign in / Account", icon: UserRound },
    { href: "/owner", label: "I'm a shop owner", icon: Store },
  ];

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
          open
            ? "border-orange-300 bg-orange-50 text-orange-600"
            : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
        }`}
      >
        {open ? <X size={20} /> : <MoreHorizontal size={23} />}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-xl">
          <div className="border-b border-stone-100 px-3 py-3">
            <p className="text-sm font-bold text-stone-900">
              Your account
            </p>
            <p className="mt-1 text-xs text-stone-500">
              Shop local. Discover more.
            </p>
          </div>

          {menuItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-700 transition hover:bg-orange-50 hover:text-orange-700"
            >
              <Icon size={19} />
              {label}
            </Link>
          ))}

          <div className="mx-2 mb-1 mt-2 h-1 overflow-hidden rounded-full bg-stone-100">
            <div className="h-full w-1/3 bg-orange-500" />
            <div className="h-full w-1/3 bg-white" />
            <div className="h-full w-1/3 bg-green-700" />
          </div>
        </div>
      )}
    </div>
  );
}
