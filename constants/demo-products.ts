import type { Product } from "@/types/product";
import { type ShopProduct } from "@/types/product";

export const demoProducts: Product[] = [
  {
    id: "1",
    name: "Oversized Streetwear Tee",
    brand: "Urban Threads",
    price: 799,
    category: "Men",
    location: "Thrissur, Kerala",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },
  {
    id: "2",
    name: "Elegant Summer Dress",
    brand: "Studio Vogue",
    price: 1499,
    category: "Women",
    location: "Thrissur, Kerala",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },
  {
    id: "3",
    name: "Everyday Sneakers",
    brand: "Sole Society",
    price: 2199,
    category: "Shoes",
    location: "Irinjalakuda, Kerala",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
      },
      {
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        poster:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },
  {
    id: "4",
    name: "Traditional Kurti",
    brand: "Maya Collections",
    price: 1299,
    category: "Women",
    location: "Thrissur, Kerala",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1741847639057-b51a25d42892?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      },
    ],
  },
  {
    id: "5",
    name: "Classic Denim Jacket",
    brand: "Denim District",
    price: 1899,
    category: "Men",
    location: "Koratty, Kerala",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },
  {
    id: "6",
    name: "Everyday Handbag",
    brand: "The Style Edit",
    price: 2499,
    category: "Accessories",
    location: "Thrissur, Kerala",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },
  {
    id: "7",
    name: "Printed Co-ord Set",
    brand: "Label Mira",
    price: 1799,
    category: "Women",
    location: "Thrissur, Kerala",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },
  {
    id: "8",
    name: "Relaxed Fit Trousers",
    brand: "Street Lab",
    price: 1199,
    category: "Men",
    location: "Irinjalakuda, Kerala",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },
  {
    id: "9",
    name: "Minimal Gold Accessories",
    brand: "Aura Accessories",
    price: 599,
    category: "Accessories",
    location: "Thrissur, Kerala",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },
  {
    id: "10",
    name: "Linen Casual Shirt",
    brand: "Coast Clothing",
    price: 999,
    category: "Men",
    location: "Koratty, Kerala",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },
];

export const products: ShopProduct[] = [
  {
    id: 1,
    name: "Men's Casual Shirt",
    category: "Men",
    price: 1299,
    originalPrice: 1899,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85",
    isNew: true,
  },
  {
    id: 2,
    name: "Women's Maxi Dress",
    category: "Women",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "Sneakers",
    category: "Accessories",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    isNew: true,
  },
  {
    id: 4,
    name: "Denim Jacket",
    category: "Men",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 5,
    name: "Handbag",
    category: "Accessories",
    price: 1599,
    originalPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 6,
    name: "Hoodie",
    category: "Men",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 7,
    name: "Linen Shirt",
    category: "Men",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=85",
    isNew: true,
  },
  {
    id: 8,
    name: "Sunglasses",
    category: "Accessories",
    price: 899,
    originalPrice: 1059,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 9,
    name: "Summer Dress",
    category: "Women",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85",
    isNew: true,
  },
  {
    id: 10,
    name: "Wrist Watch",
    category: "Accessories",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=85",
  },
];
