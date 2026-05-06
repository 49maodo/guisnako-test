import { useState } from "react";
import { ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/Types/Product";
import { ProductBadge } from "./ProductBadge";
import { StarRating } from "./StarRating";
import { VariantSelector } from "./Variantselector";
import { QuantitySelector } from "./Quantityselector";


interface ProductInfoProps {
  product: Product;
}

const AVAILABILITY_LABELS = {
  available: { label: "En stock", color: "text-emerald-600" },
  out_of_stock: { label: "Rupture de stock", color: "text-destructive" },
  limited: { label: "Stock limité", color: "text-amber-600" },
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-SN", { style: "decimal", maximumFractionDigits: 0 }).format(price) +
  " F";

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.value ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.value ?? "");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const avail = AVAILABILITY_LABELS[product.availability];

  return (
    <div className="space-y-5">
      {/* Category & badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
          {product.category}
        </span>
        {discount && <ProductBadge label={`-${discount}%`} variant="sale" />}
      </div>

      {/* Name */}
      <h1 className="text-2xl font-bold leading-tight text-foreground">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <StarRating rating={product.rating} showValue />
        <Separator orientation="vertical" className="h-4" />
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {product.reviewCount} avis
        </button>
        <Separator orientation="vertical" className="h-4" />
        <span className={`text-sm font-medium ${avail.color}`}>{avail.label}</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
      </div>

      <Separator />

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

      {/* Variants */}
      {product.colors && product.colors.length > 0 && (
        <VariantSelector
          label="Couleur"
          variants={product.colors}
          selected={selectedColor}
          onChange={setSelectedColor}
          type="color"
        />
      )}
      {product.sizes && product.sizes.length > 0 && (
        <VariantSelector
          label="Taille"
          variants={product.sizes}
          selected={selectedSize}
          onChange={setSelectedSize}
        />
      )}

      {/* Quantity + CTA */}
      <div className="flex items-center gap-3 flex-wrap">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <Button
          size="lg"
          className="flex-1 min-w-45 gap-2"
          disabled={product.availability === "out_of_stock"}
        >
          <ShoppingCart size={18} />
          Ajouter au panier
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11"
          onClick={() => setIsWishlisted((v) => !v)}
          aria-label="Ajouter aux favoris"
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-rose-500 text-rose-500" : ""}
          />
        </Button>
        <Button variant="outline" size="icon" className="h-11 w-11" aria-label="Partager">
          <Share2 size={18} />
        </Button>
      </div>

      <Separator />

      {/* Trust signals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: Truck, label: "Livraison rapide", sub: "2–5 jours ouvrés" },
          { icon: RotateCcw, label: "Retour facile", sub: "Sous 30 jours" },
          { icon: ShieldCheck, label: "Paiement sécurisé", sub: "100% protégé" },
        ].map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50"
          >
            <Icon size={16} className="mt-0.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SKU */}
      <p className="text-xs text-muted-foreground">
        Référence : <span className="text-foreground">{product.sku}</span>
      </p>
    </div>
  );
};