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
