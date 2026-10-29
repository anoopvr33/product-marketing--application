"use client";

import { useRef } from "react";
import { ImagePlus, Video, X } from "lucide-react";

type Props = {
  images: File[];
  video: File | null;
  onImagesChange: (files: File[]) => void;
  onVideoChange: (file: File | null) => void;
  imageUrls: string[];
};

export default function ProductMedia({
  images,
  video,
  onImagesChange,
  onVideoChange,
  imageUrls,
}: Props) {
  const imageInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);

  function handleImages(files: FileList | null) {
    if (!files) return;

    const selected = Array.from(files);
    const valid = selected.filter((file) => file.type.startsWith("image/"));

    if (valid.length !== selected.length) {
      alert("Please select image files only.");
    }

    const remaining = 5 - images.length;
    const next = valid.slice(0, remaining);

    if (valid.length > remaining) {
      alert("You can upload a maximum of 5 images.");
    }

    onImagesChange([...images, ...next]);
    if (imageInput.current) imageInput.current.value = "";
  }

  function handleVideo(file: File | null) {
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video file.");
      return;
    }

    onVideoChange(file);
    if (videoInput.current) videoInput.current.value = "";
  }

  return (
    <section className="space-y-5">
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-black">Product Media</h2>
          <span className="text-xs text-neutral-500">
            {images.length}/5 images
          </span>
        </div>

        <p className="mt-1 text-sm text-neutral-500">
          Add clear product photos and an optional video.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {images.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${index}`}
              className="relative h-28 w-24 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
            >
              {/* Local object URLs are supported by regular img elements. */}
              <img
                src={imageUrls[index]}
                alt={`Product image ${index + 1}`}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  onImagesChange(images.filter((_, i) => i !== index))
                }
                aria-label={`Remove image ${index + 1}`}
                className="absolute right-1 top-1 rounded-full bg-white p-1 text-black shadow-sm"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {images.length < 5 && (
            <button
              type="button"
              onClick={() => imageInput.current?.click()}
              className="flex h-28 w-24 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 text-neutral-600 transition hover:border-black hover:text-black"
            >
              <ImagePlus size={21} />
              <span className="text-xs">Add image</span>
            </button>
          )}
        </div>

        <input
          ref={imageInput}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(event) => handleImages(event.target.files)}
        />
      </div>

      <div className="rounded-xl border border-dashed border-neutral-300 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-neutral-200 p-3">
              <Video size={20} />
            </div>

            <div>
              <p className="text-sm font-medium text-black">Product video</p>
              <p className="mt-1 text-xs text-neutral-500">
                {video ? video.name : "One optional video per product"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {video && (
              <button
                type="button"
                onClick={() => onVideoChange(null)}
                className="text-sm text-neutral-600 underline"
              >
                Remove
              </button>
            )}

            <button
              type="button"
              onClick={() => videoInput.current?.click()}
              className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-black hover:border-black"
            >
              {video ? "Change video" : "Choose file"}
            </button>
          </div>
        </div>

        <input
          ref={videoInput}
          type="file"
          accept="video/*"
          hidden
          onChange={(event) => handleVideo(event.target.files?.[0] ?? null)}
        />
      </div>
    </section>
  );
}
