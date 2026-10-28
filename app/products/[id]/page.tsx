import { Suspense } from "react";
import ProductDetailsPage from "@/components/product-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function ProductContent({ params }: PageProps) {
  const { id } = await params;

  return <ProductDetailsPage productId={id} />;
}

function ProductDetailsFallback() {
  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white">
      <div className="mx-auto max-w-[1400px] animate-pulse">
        <div className="h-4 w-32 rounded bg-neutral-800" />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="aspect-[4/5] rounded-2xl bg-neutral-900" />
          <div className="space-y-5 py-4">
            <div className="h-4 w-24 rounded bg-neutral-800" />
            <div className="h-8 w-3/4 rounded bg-neutral-800" />
            <div className="h-6 w-32 rounded bg-neutral-800" />
            <div className="h-24 rounded bg-neutral-900" />
            <div className="h-12 w-full rounded-xl bg-neutral-800" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProductDetailsFallback />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
