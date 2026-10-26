type TrendingProductCardProps = {
  name: string;
  image: string;
};

export default function TrendingProductCard({
  name,
  image,
}: TrendingProductCardProps) {
  return (
    <article className="group min-w-0">
      <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-2 line-clamp-2 text-xs font-medium text-neutral-800 sm:text-sm">
        {name}
      </h3>
    </article>
  );
}
