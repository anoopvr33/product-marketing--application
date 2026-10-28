export type ProductMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  location: string;
  media: ProductMedia[];

  shopId?: string;

  shopOwner?: {
    name: string;
    profileImage?: string;
  };
};

export interface ShopProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
}
export interface ProductCardProps {
  product: ShopProduct;
  onClick: () => void;
}
