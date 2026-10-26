import Image from "next/image";

type VideoCardProps = {
  image: string;
  title: string;
  duration: string;
};

export default function VideoCard({ image, title, duration }: VideoCardProps) {
  return (
    <article className="group relative h-full min-w-0 overflow-hidden rounded-xl bg-neutral-200">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* <Image
        fill
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      /> */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 text-white">
        <div className="mb-2 flex items-center gap-2 text-xs">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span>{duration}</span>
        </div>

        <h3 className="line-clamp-2 text-xs font-semibold leading-snug sm:text-sm">
          {title}
        </h3>
      </div>
    </article>
  );
}
