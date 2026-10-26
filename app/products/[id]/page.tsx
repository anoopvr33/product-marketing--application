import ProductDetailsPage from "@/components/product-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  return <ProductDetailsPage productId={id} />;
}
