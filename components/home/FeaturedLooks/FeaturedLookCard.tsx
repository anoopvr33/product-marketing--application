type FeaturedLookCardProps = {
  image: string;
  price: string;
  postedAt: string;
  alt: string;
  widthClass: string;
};

export default function FeaturedLookCard({
  image,
  price,
  postedAt,
  alt,
  widthClass,
}: FeaturedLookCardProps) {
  return (
    <article
      className={`group relative h-[230px] min-w-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-[300px] lg:h-[320px] ${widthClass}`}
    >
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80" />

      <div className="absolute bottom-3 left-2 flex flex-wrap items-center gap-1.5 sm:bottom-4 sm:left-3">
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-black shadow-sm sm:px-3 sm:text-sm">
          {price}
        </span>

        <span className="rounded-full bg-black/85 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm sm:px-3 sm:text-xs">
          {postedAt}
        </span>
      </div>
    </article>
  );
}
