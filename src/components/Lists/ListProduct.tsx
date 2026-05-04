import { PaginationProduct } from "./PagninationProduction";
import type { Product } from "./ProductCard";

// eslint-disable-next-line react-refresh/only-export-components
export const products: Product[] = [
  {
    id: 1,
    title: "Montre connectée",
    description:
      "Une montre connectée élégante avec suivi santé en temps réel.",
    price: "10 200 F",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    link: "#",
  },
  {
    id: 2,
    title: "Macbook Air M2 13 pouces 256",
    description: "Ultrabook performant avec puce Apple M2.",
    price: "500 000 F",
    image: "https://dicorpsas.com/amnafi/public/assets/pc-01.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Ampoule caméra WiFi",
    description: "Caméra de sécurité intégrée dans une ampoule.",
    price: "10 200 F",
    image: "https://dicorpsas.com/amnafi/public/assets/camera-sur.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Casque Bluetooth",
    description: "Casque sans fil avec réduction de bruit.",
    price: "15 000 F",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    link: "#",
  },
];

import { ProductCard } from "./ProductCard";


export default function ListProduct() {
  return (
    <div className="container mx-auto py-4">
      
      {/* Résultats */}
      <div className="mb-4">
        <p className="text-sm text-center text-muted-foreground">
          Environ {products.length} résultats (0,42 secondes)
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination shadcn */}
      <PaginationProduct currentPage={1} totalPages={2} />
    </div>
  );
}