import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RelatedProduct } from "@/Types/product";
import { ProductBadge } from "./ProductBadge";
import { StarRating } from "./StarRating";


interface RelatedProductCardProps {
  product: RelatedProduct;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-SN", { style: "decimal", maximumFractionDigits: 0 }).format(price) +
  " F";

const RelatedProductCard = ({ product }: RelatedProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-3">
        {discount && (
          <div className="absolute top-2 left-2 z-10">
            <ProductBadge label={`-${discount}%`} variant="sale" />
          </div>
        )}
        {product.badge && (
          <div className="absolute top-2 left-2 z-10">
            <ProductBadge label={product.badge} variant="new" />
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-2 bottom-2 flex gap-1.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
          <Button size="sm" className="flex-1 gap-1.5 text-xs h-8">
            <ShoppingCart size={13} />
            Ajouter
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-background/90">
            <Heart size={13} />
          </Button>
        </div>
      </div>
      <span className="text-xs uppercase tracking-widest text-muted-foreground mb-0.5">
        {product.category}
      </span>
      <h3 className="text-sm font-medium text-foreground leading-snug mb-1 line-clamp-2">
        {product.name}
      </h3>
      <StarRating rating={product.rating} size={11} className="mb-2" />
      <div className="flex items-baseline gap-2 mt-auto">
        <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <span className="text-xs text-muted-foreground line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
      </div>
    </div>
  );
};

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (!products.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Produits <span className="text-muted-foreground font-normal">similaires</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <RelatedProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};