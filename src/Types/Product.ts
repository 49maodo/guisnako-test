export interface ProductImage {
    src: string;
    alt: string;
  }
  
  export interface ProductVariant {
    label: string;
    value: string;
    available?: boolean;
  }
  
  export interface ProductReview {
    id: string;
    author: string;
    avatar?: string;
    rating: number;
    date: string;
    comment: string;
  }
  
  export interface RelatedProduct {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    badge?: string;
    rating: number;
  }
  
  export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    description: string;
    images: ProductImage[];
    sku: string;
    availability: "available" | "out_of_stock" | "limited";
    rating: number;
    reviewCount: number;
    sizes?: ProductVariant[];
    colors?: ProductVariant[];
    reviews?: ProductReview[];
    relatedProducts?: RelatedProduct[];
  }