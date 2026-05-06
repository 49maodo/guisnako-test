import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CategorySidebar } from "../layout/Categorysidebar";
import { ProductGallery } from "./Productgallery";
import { ProductInfo } from "./Productinfo";
import { ProductTabs } from "./Producttabs";
import { RelatedProducts } from "./Relatedproducts";
import type { Product } from "@/Types/product";


const DEMO_PRODUCT: Product = {
  id: "1",
  name: "Porto Headphone Pro",
  category: "Accessoires",
  price: 15000,
  originalPrice: 20000,
  description:
    "Casque audio haute fidélité conçu pour les amateurs de musique exigeants. Drivers 40 mm, réponse en fréquence 20 Hz–20 kHz, confort optimal pour des sessions longues durée.",
  sku: "1234567890",
  availability: "available",
  rating: 4,
  reviewCount: 2,
  images: [
    {
      src: "https://dicorpsas.com/amnafi/shop/public/assets/img/products/headphones-in-bluee-01.jpg",
      alt: "Porto Headphone Pro - vue principale",
    },
    {
      src: "https://dicorpsas.com/amnafi/shop/public/assets/img/products/headphones-in-noir-02.jpg",
      alt: "Porto Headphone Pro - vue noir",
    },
    {
      src: "https://dicorpsas.com/amnafi/shop/public/assets/img/products/headphones-in-blue-01.jpg",
      alt: "Porto Headphone Pro - vue blue",
    },
  ],
  sizes: [
    { label: "S", value: "s" },
    { label: "M", value: "m" },
    { label: "L", value: "l" },
    { label: "XL", value: "xl", available: false },
  ],
  colors: [
    { label: "Bleu", value: "blue" },
    { label: "Noir", value: "black" },
    { label: "Rouge", value: "red" },
  ],
  reviews: [
    {
      id: "r1",
      author: "Jack Doe",
      rating: 4,
      date: "12 avril 2026",
      comment:
        "Excellente qualité sonore, très confortable. Je recommande vivement ce produit pour un usage quotidien.",
    },
    {
      id: "r2",
      author: "John Doe",
      rating: 3,
      date: "5 mars 2026",
      comment:
        "Bon produit globalement, mais le câble pourrait être plus long. Son de bonne qualité.",
    },
  ],
  relatedProducts: [
    {
      id: "r1",
      name: "Photo Camera Pro",
      category: "Électronique",
      price: 6900,
      originalPrice: 7900,
      image:
        "https://dicorpsas.com/amnafi/shop/public/assets/img/products/headphones-in-noir-01.jpg",
      badge: "NEW",
      rating: 5,
    },
    {
      id: "r2",
      name: "Porto Headphone Blue",
      category: "Accessoires",
      price: 8900,
      originalPrice: 9900,
      image:
        "https://dicorpsas.com/amnafi/shop/public/assets/img/products/headphones-in-blue-01.jpg",
      badge: "NEW",
      rating: 5,
    },
    {
      id: "r3",
      name: "Golf Bag Premium",
      category: "Sport",
      price: 2900,
      originalPrice: 3900,
      image:
        "https://dicorpsas.com/amnafi/shop/public/assets/img/products/headphones-in-blue-03.jpg",
      rating: 4,
    },
    {
      id: "r4",
      name: "Workout Kit",
      category: "Sport",
      price: 3000,
      originalPrice: 4000,
      image:
        "https://dicorpsas.com/amnafi/shop/public/assets/img/products/headphones-in-bluee-01.jpg",
      rating: 5,
    },
  ],
};

const Breadcrumb = ({ product }: { product: Product }) => (
  <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap">
    {["Accueil", "Boutique", product.category, product.name].map((item, i, arr) => (
      <span key={item} className="flex items-center gap-1.5">
        <span
          className={
            i === arr.length - 1
              ? "text-foreground font-medium truncate max-w-40"
              : "hover:text-foreground cursor-pointer transition-colors"
          }
        >
          {item}
        </span>
        {i < arr.length - 1 && <ChevronRight size={12} />}
      </span>
    ))}
  </nav>
);

export const ProductDetailLayout = () => {
  const product = DEMO_PRODUCT;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <CategorySidebar activeCategory={product.category} />
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <Breadcrumb product={product} />

            {/* Product main section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-10">
              <ProductGallery images={product.images} />
              <ProductInfo product={product} />
            </div>

            <Separator className="my-8" />

            {/* Tabs */}
            <ProductTabs product={product} />

            {/* Related products */}
            {product.relatedProducts && (
              <RelatedProducts products={product.relatedProducts} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailLayout;