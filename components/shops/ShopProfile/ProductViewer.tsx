"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Store,
  MessageCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import type { ShopProduct } from "./ProductCard";

interface ProductViewerProps {
  products: ShopProduct[];
  initialIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

export default function ProductViewer({
  products,
  initialIndex,
  onClose,
  onNavigate,
}: ProductViewerProps) {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const wheelLock = useRef(false);

  const product = products[initialIndex];

  const previousProduct = useCallback(() => {
    if (initialIndex > 0) {
      onNavigate(initialIndex - 1);
    }
  }, [initialIndex, onNavigate]);

  const nextProduct = useCallback(() => {
    if (initialIndex < products.length - 1) {
      onNavigate(initialIndex + 1);
    }
  }, [initialIndex, products.length, onNavigate]);

  useEffect(() => {
    setSelectedSize("M");
    setSelectedColor(0);
    setImageLoaded(false);
  }, [initialIndex]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") previousProduct();
      if (event.key === "ArrowRight") nextProduct();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, previousProduct, nextProduct]);

  if (!product) return null;

  const liked = likedProducts.includes(product.id);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  const toggleLike = () => {
    setLikedProducts((current) =>
      current.includes(product.id)
        ? current.filter((id) => id !== product.id)
        : [...current, product.id],
    );
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (wheelLock.current || Math.abs(event.deltaY) < 35) return;

    wheelLock.current = true;

    if (event.deltaY > 0) nextProduct();
    else previousProduct();

    window.setTimeout(() => {
      wheelLock.current = false;
    }, 450);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    if (Math.abs(deltaY) > 65 && Math.abs(deltaY) > Math.abs(deltaX) * 1.2) {
      if (deltaY < 0) nextProduct();
      else previousProduct();
    } else if (
      Math.abs(deltaX) > 70 &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.2
    ) {
      if (deltaX < 0) nextProduct();
      else previousProduct();
    }

    touchStart.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/65 backdrop-blur-md"
      onClick={onClose}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Viewer panel: full-screen on mobile, centered on desktop */}
      <section
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="relative flex h-[100dvh] w-full flex-col overflow-y-auto border-[#263142] bg-[#080e18] shadow-2xl sm:h-auto sm:max-h-[88vh] sm:max-w-[1100px] sm:rounded-2xl sm:border lg:flex-row lg:overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product viewer"
          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/65 text-white backdrop-blur-md transition hover:bg-violet-600 sm:right-4 sm:top-4"
        >
          <X size={21} />
        </button>

        {/* LEFT / TOP: Product image */}
        <div className="relative flex w-full shrink-0 flex-col bg-[#050a12] p-3 sm:p-4 lg:w-[51%] lg:border-r lg:border-[#263142]">
          <div className="relative aspect-[4/4.1] w-full overflow-hidden rounded-xl bg-[#111827] sm:aspect-[4/3.5] lg:aspect-auto lg:min-h-0 lg:flex-1">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
              onLoad={() => setImageLoaded(true)}
              className={`object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-[#111827]" />
            )}

            {product.isNew && (
              <span className="absolute left-3 top-3 rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-white">
                New
              </span>
            )}

            <button
              type="button"
              onClick={toggleLike}
              aria-label={liked ? "Remove favourite" : "Add favourite"}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-black/80"
            >
              <Heart
                size={20}
                className={liked ? "fill-rose-500 text-rose-500" : ""}
              />
            </button>

            {/* Previous product */}
            <button
              type="button"
              disabled={initialIndex === 0}
              onClick={previousProduct}
              aria-label="Previous product"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next product */}
            <button
              type="button"
              disabled={initialIndex === products.length - 1}
              onClick={nextProduct}
              aria-label="Next product"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={24} />
            </button>

            <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-3 py-1 text-xs text-white backdrop-blur-md">
              {initialIndex + 1} / {products.length}
            </span>
          </div>

          {/* Image strip: ready for additional product images later */}
          <div className="mt-3 flex items-center gap-2">
            <div className="relative h-[58px] w-[58px] overflow-hidden rounded-lg border-2 border-violet-500">
              <Image
                src={product.image}
                alt={`${product.name} preview`}
                fill
                sizes="58px"
                className="object-cover"
              />
            </div>

            <p className="text-xs text-gray-500">
              Use the arrows or scroll to explore more products.
            </p>
          </div>
        </div>

        {/* RIGHT / BOTTOM: Product details */}
        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6 lg:max-h-[88vh] lg:overflow-y-auto lg:p-7">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
            Fashion Hub
          </p>

          <h2 className="pr-10 text-xl font-bold text-white sm:text-2xl">
            {product.name}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-2xl font-bold text-white">
              {formatPrice(product.price)}
            </span>

            {product.originalPrice && discount > 0 && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            className="mt-4 flex w-fit items-center gap-2 text-sm text-gray-300 transition hover:text-violet-300"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#354052] bg-violet-500 font-semibold text-white">
              F
            </span>
            <span>Fashion Hub</span>
            <ChevronRight size={16} />
          </button>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <Star size={17} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-amber-400">4.6</span>
            <span className="text-gray-500">(124 reviews)</span>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <p className="mb-3 text-sm font-medium text-gray-200">Size</p>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-10 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    selectedSize === size
                      ? "border-violet-500 bg-violet-600/20 text-white"
                      : "border-[#303b4d] text-gray-300 hover:border-violet-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mt-5">
            <p className="mb-3 text-sm font-medium text-gray-200">Color</p>
            <div className="flex gap-3">
              {[
                { name: "Black", color: "#171923" },
                { name: "White", color: "#e5e7eb" },
                { name: "Grey", color: "#555b65" },
                { name: "Blue", color: "#244875" },
              ].map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  title={item.name}
                  aria-label={item.name}
                  aria-pressed={selectedColor === index}
                  onClick={() => setSelectedColor(index)}
                  className={`h-7 w-7 rounded-full border-2 transition ${
                    selectedColor === index
                      ? "border-violet-500 ring-2 ring-violet-500/30"
                      : "border-[#3b4555] hover:border-white/70"
                  }`}
                  style={{ backgroundColor: item.color }}
                />
              ))}
            </div>
          </div>

          {/* Primary action */}
          <button
            type="button"
            onClick={() => {
              window.open(
                "https://wa.me/919876543210?text=" +
                  encodeURIComponent(
                    `Hi Fashion Hub, I'm interested in ${product.name}, size ${selectedSize}.`,
                  ),
                "_blank",
                "noopener,noreferrer",
              );
            }}
            className="mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            <ShoppingBag size={18} />
            Enquire About Product
          </button>

          {/* Contact actions */}
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <a
              href="tel:+919876543210"
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#303b4d] px-3 py-3 text-sm text-gray-200 transition hover:bg-[#151e2d]"
            >
              <MessageCircle size={17} />
              Call / Chat with Shop
            </a>

            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi Fashion Hub, I'm interested in ${product.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#303b4d] px-3 py-3 text-sm text-gray-200 transition hover:bg-[#151e2d]"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
          </div>

          {/* Benefits */}
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#263142] pt-5">
            <div className="flex flex-col items-center gap-2 text-center">
              <Truck size={19} className="text-gray-300" />
              <p className="text-[11px] font-medium text-gray-300">
                Shop Delivery
              </p>
              <p className="text-[10px] text-gray-500">Ask the shop</p>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <RotateCcw size={19} className="text-gray-300" />
              <p className="text-[11px] font-medium text-gray-300">
                Easy Returns
              </p>
              <p className="text-[10px] text-gray-500">Confirm policy</p>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <ShieldCheck size={19} className="text-gray-300" />
              <p className="text-[11px] font-medium text-gray-300">
                Shop Verified
              </p>
              <p className="text-[10px] text-gray-500">Verified profile</p>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-xl border border-[#263142] bg-[#0c1420] p-3">
            <MapPin size={17} className="mt-0.5 shrink-0 text-violet-400" />
            <p className="text-xs leading-5 text-gray-400">
              Visit Fashion Hub, MG Road, Kochi, Kerala, or contact the shop to
              confirm availability, sizes, delivery, and return conditions.
            </p>
          </div>

          {/* Mobile navigation */}
          <div className="mt-5 grid grid-cols-2 gap-3 pb-2 lg:hidden">
            <button
              type="button"
              disabled={initialIndex === 0}
              onClick={previousProduct}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#303b4d] px-3 py-3 text-sm text-white disabled:opacity-30"
            >
              <ChevronLeft size={17} />
              Previous
            </button>

            <button
              type="button"
              disabled={initialIndex === products.length - 1}
              onClick={nextProduct}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#303b4d] px-3 py-3 text-sm text-white disabled:opacity-30"
            >
              Next
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
