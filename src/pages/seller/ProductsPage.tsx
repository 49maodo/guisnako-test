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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Package, Plus, Search, Trash2, Edit } from "lucide-react";
import { useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat("fr-SN").format(n) + " F";
 
const INITIAL_PRODUCTS = [
  { id: 1, name: "Montre connectée", price: 10200, category: "Électronique", stock: 14, status: "active" },
  { id: 2, name: "MacBook Air M2",   price: 500000, category: "Informatique", stock: 3,  status: "active" },
  { id: 3, name: "Écouteurs Pro",    price: 35000, category: "Audio",        stock: 22, status: "inactive" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; class: string }> = {
    active:   { label: "Actif",    class: "bg-[var(--color-success,#22c55e)]/10 text-[var(--color-success,#16a34a)]" },
    inactive: { label: "Inactif",  class: "bg-[var(--muted)] text-[var(--muted-foreground)]" },
    vip:      { label: "VIP",      class: "bg-amber-100 text-amber-700" },
  };
  const s = map[status] ?? map.active;
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s.class}`}>{s.label}</span>;
};

export function ProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", price: "", category: "", stock: "" });

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", price: "", category: "", stock: "" });
    setOpen(true);
  };

  const openEdit = (p: { id: number; name: string; price: number; category: string; stock: number }) => {
    setEditing(p.id);
    setForm({ name: p.name, price: String(p.price), category: p.category, stock: String(p.stock) });
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setProducts(products.map((p) =>
        p.id === editing
          ? { ...p, name: form.name, price: parseInt(form.price) || 0, category: form.category, stock: parseInt(form.stock) || 0 }
          : p
      ));
    } else {
      setProducts([...products, {
        id: Date.now(),
        name: form.name,
        price: parseInt(form.price) || 0,
        category: form.category,
        stock: parseInt(form.stock) || 0,
        status: "active",
      }]);
    }
    setOpen(false);
  };

  const deleteProduct = (id: number) => setProducts(products.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Produits</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} produit{products.length > 1 ? "s" : ""} au catalogue</p>
        </div>
        <Button onClick={openAdd} className="gap-2"><Plus size={14} /> Ajouter</Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un produit..."
          className="pl-9 h-10"
        />
      </div>

      {/* Table */}
      <Card className="border-border/60">
        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="pl-6 text-xs">Produit</TableHead>
              <TableHead className="text-xs hidden sm:table-cell">Catégorie</TableHead>
              <TableHead className="text-xs">Prix</TableHead>
              <TableHead className="text-xs hidden md:table-cell">Stock</TableHead>
              <TableHead className="text-xs hidden sm:table-cell">Statut</TableHead>
              <TableHead className="pr-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  Aucun produit trouvé.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id} className="border-border/40 group">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Package size={15} className="text-muted-foreground" />
                      </div>
                      <span className="font-medium text-sm">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">{p.category}</span>
                  </TableCell>
                  <TableCell className="font-semibold text-sm">{fmt(p.price)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`text-sm font-medium ${p.stock <= 5 ? "text-amber-600" : "text-foreground"}`}>
                      {p.stock}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusBadge status={p.status} />
                  </TableCell>
                  <TableCell className="pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => openEdit(p)}><Edit size={13} /> Modifier</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => deleteProduct(p.id)}>
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier le produit" : "Ajouter un produit"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Nom du produit</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: iPhone 15 Pro" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Prix (F CFA)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0" />
              </div>
              <div className="space-y-1.5">
                <Label>Stock</Label>
                <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="0" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Catégorie</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Ex: Électronique" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button onClick={handleSave} disabled={!form.name.trim()}>
                {editing ? "Mettre à jour" : "Ajouter"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

