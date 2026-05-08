import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreVertical,
  Package,
  Plus,
  Search,
  Trash2,
  Edit,
  Star,
  ImagePlus,
  X,
  Upload,
} from "lucide-react";
import { useState, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
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
  stock: number;
  availability: "available" | "out_of_stock" | "limited";
  rating: number;
  reviewCount: number;
  sizes?: ProductVariant[];
  colors?: ProductVariant[];
  reviews?: ProductReview[];
  relatedProducts?: RelatedProduct[];
}

// ─── Constants ────────────────────────────────────────────────────────────────
const fmt = (n: number) => new Intl.NumberFormat("fr-SN").format(n) + " F";

const CATEGORIES = [
  "Electronique",
  "Informatique",
  "Audio",
  "Accessoires",
  "Telephonie",
  "Jeux video",
  "Photo & Video",
  "Reseau",
];

/** Regle metier : stock => availability */
function stockToAvailability(stock: number): Product["availability"] {
  if (stock === 0) return "out_of_stock";
  if (stock <= 5) return "limited";
  return "available";
}

const AVAILABILITY_CONFIG: Record<
  Product["availability"],
  { label: string; badgeClass: string; dot: string }
> = {
  available:    { label: "Disponible",   badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  limited:      { label: "Stock limite", badgeClass: "bg-amber-50   text-amber-700   border-amber-200",   dot: "bg-amber-500"   },
  out_of_stock: { label: "Rupture",      badgeClass: "bg-red-50     text-red-700     border-red-200",      dot: "bg-red-500"     },
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Montre connectee",
    category: "Electronique",
    price: 10200,
    originalPrice: 12500,
    description: "Montre connectee avec suivi d'activite, notifications et autonomie 7 jours.",
    images: [{ src: "", alt: "Montre connectee" }],
    sku: "ELC-001",
    stock: 14,
    availability: "available",
    rating: 4.2,
    reviewCount: 18,
  },
  {
    id: "2",
    name: "MacBook Air M2",
    category: "Informatique",
    price: 500000,
    description: "Ordinateur portable Apple MacBook Air avec puce M2, 8 Go RAM, 256 Go SSD.",
    images: [{ src: "", alt: "MacBook Air M2" }],
    sku: "INF-002",
    stock: 3,
    availability: "limited",
    rating: 4.9,
    reviewCount: 47,
  },
  {
    id: "3",
    name: "Ecouteurs Pro",
    category: "Audio",
    price: 35000,
    description: "Ecouteurs sans fil a reduction de bruit active, autonomie 30h.",
    images: [{ src: "", alt: "Ecouteurs Pro" }],
    sku: "AUD-003",
    stock: 0,
    availability: "out_of_stock",
    rating: 4.5,
    reviewCount: 32,
  },
];

type FormState = {
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  description: string;
  stock: string;
  imagePreview: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  category: "",
  price: "",
  originalPrice: "",
  description: "",
  stock: "",
  imagePreview: "",
};

// ─── AvailabilityBadge ────────────────────────────────────────────────────────
function AvailabilityBadge({ availability }: { availability: Product["availability"] }) {
  const cfg = AVAILABILITY_CONFIG[availability];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.badgeClass}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── StarRating ───────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={11} className="fill-amber-400 text-amber-400" />
      <span className="text-xs font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

// ─── ImageUploadZone ──────────────────────────────────────────────────────────
function ImageUploadZone({
  preview,
  onChange,
  onClear,
}: {
  preview: string;
  onChange: (base64: string) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) onChange(e.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  if (preview) {
    return (
      <div className="relative group rounded-xl overflow-hidden border border-border/60 bg-muted/30 h-40 w-full">
        <img src={preview} alt="Apercu" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="gap-1.5 text-xs h-8"
            onClick={() => inputRef.current?.click()}
          >
            <Upload size={12} /> Changer
          </Button>
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="h-8 w-8 p-0"
            onClick={onClear}
          >
            <X size={12} />
          </Button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`
        cursor-pointer rounded-xl border-2 border-dashed transition-all
        flex flex-col items-center justify-center gap-2 h-40
        ${dragging
          ? "border-violet-400 bg-violet-50/50 dark:bg-violet-950/20 scale-[1.01]"
          : "border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-border"
        }
      `}
    >
      <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
        <ImagePlus size={18} className="text-muted-foreground" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">Glisser-deposer ou cliquer</p>
        <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, WebP</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
      />
    </div>
  );
}

// ─── StockField with live availability preview ────────────────────────────────
function StockField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const stock = parseInt(value);
  const hasValue = value !== "" && !isNaN(stock);
  const availability = hasValue ? stockToAvailability(stock) : null;
  const cfg = availability ? AVAILABILITY_CONFIG[availability] : null;

  return (
    <div className="space-y-1.5">
      <Label>
        Stock <span className="text-destructive">*</span>
      </Label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="flex-1"
        />
        {cfg && (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap shrink-0 ${cfg.badgeClass}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        Disponibilite automatique : <strong>0</strong> = Rupture · <strong>1–5</strong> = Limite · <strong>6+</strong> = Disponible
      </p>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : "",
      description: p.description,
      stock: String(p.stock),
      imagePreview: p.images[0]?.src ?? "",
    });
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.category || form.stock === "") return;
    const stock = parseInt(form.stock) || 0;
    const availability = stockToAvailability(stock);
    const imageEntry: ProductImage[] = form.imagePreview
      ? [{ src: form.imagePreview, alt: form.name }]
      : [];

    if (editing) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editing
            ? {
                ...p,
                name: form.name,
                category: form.category,
                price: parseInt(form.price) || 0,
                originalPrice: form.originalPrice ? parseInt(form.originalPrice) : undefined,
                description: form.description,
                stock,
                availability,
                images: imageEntry.length ? imageEntry : p.images,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: String(Date.now()),
        name: form.name,
        category: form.category,
        price: parseInt(form.price) || 0,
        originalPrice: form.originalPrice ? parseInt(form.originalPrice) : undefined,
        description: form.description,
        images: imageEntry,
        sku: `SKU-${Date.now().toString().slice(-5)}`,
        stock,
        availability,
        rating: 0,
        reviewCount: 0,
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setOpen(false);
  };

  const deleteProduct = (id: string) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  const usedCategories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Produits</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {products.length} produit{products.length > 1 ? "s" : ""} au catalogue
          </p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus size={14} /> Ajouter
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nom ou reference..."
            className="pl-9 h-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48 h-10">
            <SelectValue placeholder="Categorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les categories</SelectItem>
            {usedCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border-border/60">
        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="pl-6 text-xs">Produit</TableHead>
              <TableHead className="text-xs hidden sm:table-cell">Categorie</TableHead>
              <TableHead className="text-xs">Prix</TableHead>
              <TableHead className="text-xs hidden md:table-cell">Stock</TableHead>
              <TableHead className="text-xs hidden sm:table-cell">Disponibilite</TableHead>
              <TableHead className="text-xs hidden lg:table-cell">Note</TableHead>
              <TableHead className="pr-6 w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-14 text-muted-foreground">
                  <Package size={28} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Aucun produit trouve.</p>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id} className="border-border/40 group">
                  {/* Image + name */}
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted border border-border/40 flex items-center justify-center shrink-0 overflow-hidden">
                        {p.images[0]?.src ? (
                          <img
                            src={p.images[0].src}
                            alt={p.images[0].alt}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package size={15} className="text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm leading-tight">{p.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{p.sku}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                      {p.category}
                    </span>
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    <div>
                      <p className="font-semibold text-sm">{fmt(p.price)}</p>
                      {p.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">{fmt(p.originalPrice)}</p>
                      )}
                    </div>
                  </TableCell>

                  {/* Stock */}
                  <TableCell className="hidden md:table-cell">
                    <span className={`text-sm font-semibold tabular-nums ${
                      p.stock === 0
                        ? "text-red-500"
                        : p.stock <= 5
                        ? "text-amber-600"
                        : "text-foreground"
                    }`}>
                      {p.stock}
                    </span>
                  </TableCell>

                  {/* Availability */}
                  <TableCell className="hidden sm:table-cell">
                    <AvailabilityBadge availability={p.availability} />
                  </TableCell>

                  {/* Rating */}
                  <TableCell className="hidden lg:table-cell">
                    {p.reviewCount > 0 ? (
                      <div className="flex flex-col gap-0.5">
                        <StarRating rating={p.rating} />
                        <span className="text-[10px] text-muted-foreground">{p.reviewCount} avis</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => openEdit(p)}>
                          <Edit size={13} /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-destructive"
                          onClick={() => deleteProduct(p.id)}
                        >
                          <Trash2 size={13} /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Add / Edit dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Modifier le produit" : "Ajouter un produit"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 pt-2">
            {/* Image upload */}
            <div className="space-y-1.5">
              <Label>Image du produit</Label>
              <ImageUploadZone
                preview={form.imagePreview}
                onChange={(base64) => setForm({ ...form, imagePreview: base64 })}
                onClear={() => setForm({ ...form, imagePreview: "" })}
              />
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <Label>Nom du produit <span className="text-destructive">*</span></Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: iPhone 15 Pro"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label>Categorie <span className="text-destructive">*</span></Label>
              <Select
                value={form.category}
                onValueChange={(val) => setForm({ ...form, category: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selectionner une categorie" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price + original price */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Prix (F CFA) <span className="text-destructive">*</span></Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1">
                  Prix barre
                  <span className="text-xs text-muted-foreground font-normal">(optionnel)</span>
                </Label>
                <Input
                  type="number"
                  value={form.originalPrice}
                  onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Stock with live availability */}
            <StockField
              value={form.stock}
              onChange={(v) => setForm({ ...form, stock: v })}
            />

            {/* Description */}
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Decrivez le produit..."
                className="resize-none min-h-20"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-1">
              <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button
                onClick={handleSave}
                disabled={!form.name.trim() || !form.category || form.stock === ""}
              >
                {editing ? "Mettre a jour" : "Ajouter"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}