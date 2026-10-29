import Image from "next/image";
import {
  BadgeCheck,
  MapPin,
  Phone,
  Mail,
  Star,
  ExternalLink,
  InspectionPanel,
  FaceAngry,
  MessageCircle,
} from "lucide-react";

export default function ShopHeader() {
  return (
    <section className="mb-8 grid grid-cols-1 gap-6 rounded-xl  border-[#1c2735] bg-gradient-to-br from-[#f6f5ff] to-[#06224c13] p-4 sm:p-5 lg:grid-cols-[284px_minmax(0,1fr)_315px] lg:gap-7">
      {/* Shop picture */}
      <div className="relative aspect-[4/4.2] overflow-hidden rounded-xl  sm:aspect-[16/9] lg:aspect-auto lg:min-h-[285px]">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
          alt="Fashion Hub clothing store"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 284px"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
      </div>

      {/* Shop details */}
      <div className="flex min-w-0 flex-col justify-center lg:border-r lg:border-[#263142] lg:pr-7">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3 py-1 text-xs font-medium text-emerald-300">
            <BadgeCheck size={15} />
            Verified Shop
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
          Fashion Hub
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          “Trendy Styles <span className="mx-1.5">•</span> Better You”
        </p>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <Star size={19} className="fill-amber-400 text-amber-400" />
          <span className="font-semibold text-amber-400">4.6</span>
          <span className="text-gray-400">(124 reviews)</span>
        </div>

        <div className="mt-5 space-y-3 text-sm text-gray-500">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-gray-500" />
            <span>123 MG Road, Kochi, Kerala - 682016</span>
          </div>

          <a
            href="tel:+919876543210"
            className="flex items-center gap-3 transition hover:text-violet-300"
          >
            <Phone size={18} className="shrink-0" />
            <span>+91 98765 43210</span>
          </a>

          <a
            href="mailto:fashionhub@gmail.com"
            className="flex items-center gap-3 break-all transition hover:text-violet-300"
          >
            <Mail size={18} className="shrink-0" />
            <span>fashionhub@gmail.com</span>
          </a>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["Men's Wear", "Women's Wear", "Accessories", "Fashion"].map(
            (category) => (
              <span
                key={category}
                className="rounded-full border border-[#303b4d] bg-[#1b2535] px-3 py-1.5 text-xs text-gray-200"
              >
                {category}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Map and shop description */}
      <div className="flex min-w-0 flex-col justify-center">
        <div className="relative h-[135px] overflow-hidden rounded-xl border border-[#253247] bg-[#101b2b]">
          <iframe
            title="Fashion Hub location map"
            src="https://maps.google.com/maps?q=MG%20Road%2C%20Kochi%2C%20Kerala&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-full w-full opacity-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <a
            href="https://www.google.com/maps/search/?api=1&query=MG+Road+Kochi+Kerala"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-[#08101c]/95 px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-600"
          >
            View on Map
            <ExternalLink size={13} />
          </a>
        </div>

        <p className="mt-4 text-sm leading-[1.7] text-gray-500">
          Fashion Hub brings you the latest trends in clothing and accessories.
          Quality products, reasonable prices and a great shopping experience —
          all in one place.
        </p>

        <div className="mt-4 flex gap-3">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1b2535] text-gray-200 transition hover:bg-violet-600 hover:text-white"
          >
            <InspectionPanel size={21} />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1b2535] text-gray-200 transition hover:bg-violet-600 hover:text-white"
          >
            <FaceAngry size={21} />
          </a>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1b2535] text-gray-200 transition hover:bg-emerald-600 hover:text-white"
          >
            <MessageCircle size={21} />
          </a>
        </div>
      </div>
    </section>
  );
}
