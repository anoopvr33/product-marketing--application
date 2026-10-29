"use client";

import { useEffect, useState } from "react";
// import { useCreateProductMutation } from "@/features/products/productApi";
import ProductMedia from "./ProductMedia";
import ProductFields, { type ProductFormValues } from "./ProductFields";
import ProductPreview from "./ProductPreview";

const initialValues: ProductFormValues = {
  title: "",
  type: "",
  category: "",
  brand: "",
  price: "",
  discount: "0",
  availability: "In Stock",
  description: "",
  sizes: [],
  colors: [],
};

export default function AddProduct() {
  const [values, setValues] = useState(initialValues);
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //   const [createProduct, { isLoading }] = useCreateProductMutation();

  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  function handleImagesChange(files: File[]) {
    setImageUrls(files.map((file) => URL.createObjectURL(file)));
    setImages(files);
  }

  function updateField(
    field: keyof ProductFormValues,
    value: string | string[],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (images.length === 0) {
      setError("Please add at least one product image.");
      return;
    }

    if (!values.title.trim() || !values.type || !values.category) {
      setError("Please complete the product name, type and category.");
      return;
    }

    if (!Number.isFinite(Number(values.price)) || Number(values.price) <= 0) {
      setError("Enter a valid product price.");
      return;
    }

    if (values.description.trim().length < 10) {
      setError("Description must contain at least 10 characters.");
      return;
    }

    if (values.sizes.length === 0) {
      setError("Select at least one available size.");
      return;
    }

    setSuccess(
      "Product form validated successfully. API submission is not connected yet.",
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-7 flex flex-col justify-between gap-5 border-b border-neutral-200 pb-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Post Product
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Add product details and showcase your products to nearby
              customers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="rounded-lg border border-neutral-200 px-4 py-3">
              <p className="text-neutral-500">Daily post limit</p>
              <p className="mt-1 font-semibold">5 posts per day</p>
            </div>

            <div className="rounded-lg border border-neutral-200 px-4 py-3">
              <p className="text-neutral-500">Video limit</p>
              <p className="mt-1 font-semibold">1 video per day</p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.9fr)]">
            <div className="min-w-0 rounded-xl border border-neutral-200 p-4 sm:p-6">
              <ProductMedia
                images={images}
                video={video}
                imageUrls={imageUrls}
                onImagesChange={handleImagesChange}
                onVideoChange={setVideo}
              />

              <div className="mt-7">
                <ProductFields values={values} onChange={updateField} />
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-5 rounded-lg border border-neutral-300 px-4 py-3 text-sm text-black"
                >
                  {error}
                </p>
              )}

              {success && (
                <p
                  role="status"
                  className="mt-5 rounded-lg border border-neutral-300 px-4 py-3 text-sm text-black"
                >
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="mt-7 h-12 w-full rounded-lg bg-black px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Post Product
              </button>

              <p className="mt-3 text-center text-xs text-neutral-500">
                Daily quotas and permissions must be verified by the server.
              </p>
            </div>

            <ProductPreview
              values={values}
              imageUrls={imageUrls}
              video={video}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
