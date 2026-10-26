type CategoryCardProps = {
  name: string;
  image: string;
};

export default function CategoryCard({ name, image }: CategoryCardProps) {
  return (
    <a
      href={`/categories/${encodeURIComponent(name.toLowerCase())}`}
      className="group flex min-w-0 flex-col items-center justify-center overflow-hidden rounded-xl bg-neutral-100 p-2 transition-colors hover:bg-neutral-200 sm:p-3"
    >
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full max-h-24 w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-28"
        />
      </div>

      <span className="mt-1 line-clamp-1 w-full text-center text-xs font-semibold text-black sm:text-sm">
        {name}
      </span>
    </a>
  );
}
