export interface DetailProduct {
  id: string;
  name: string;
  type: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  sizes: string[];
  available: boolean;
  images: string[];
  shopId: string;
  shopName: string;
  shopImage: string;
  location: string;
}

export interface DetailShop {
  id: string;
  name: string;
  image: string;
  location: string;
  products: string[];
}

