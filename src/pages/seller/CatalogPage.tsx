import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Edit, MoreVertical, Plus, Tag, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const INITIAL_CATEGORIES = [
    { id: 1, name: "Électronique",  count: 12, color: "bg-blue-100 text-blue-700" },
    { id: 2, name: "Informatique",  count: 8,  color: "bg-purple-100 text-purple-700" },
    { id: 3, name: "Audio",         count: 5,  color: "bg-amber-100 text-amber-700" },
    { id: 4, name: "Accessoires",   count: 19, color: "bg-green-100 text-green-700" },
  ];

export function CatalogPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [newCat, setNewCat] = useState("");
  const [open, setOpen] = useState(false);
 
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-amber-100 text-amber-700",
    "bg-green-100 text-green-700",
    "bg-rose-100 text-rose-700",
    "bg-cyan-100 text-cyan-700",
  ];
 
  const addCategory = () => {
    if (!newCat.trim()) return;
    setCategories([...categories, {
      id: Date.now(),
      name: newCat.trim(),
      count: 0,
      color: colors[categories.length % colors.length],
    }]);
    setNewCat("");
    setOpen(false);
  };
 
  const deleteCategory = (id: number) => setCategories(categories.filter((c) => c.id !== id));
 
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Catalogue</h1>
          <p className="text-muted-foreground text-sm mt-1">{categories.length} catégorie{categories.length > 1 ? "s" : ""}</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus size={14} /> Ajouter</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nouvelle catégorie</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label>Nom de la catégorie</Label>
                <Input
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  placeholder="Ex: Téléphones, Mode..."
                  onKeyDown={(e) => e.key === "Enter" && addCategory()}
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
                <Button onClick={addCategory} disabled={!newCat.trim()}>Créer</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Card key={cat.id} className="border-border/60 group hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`p-2.5 rounded-xl ${cat.color} font-bold text-sm`}>
                    <Tag size={16} />
                  </span>
                  <div>
                    <p className="font-semibold">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.count} produit{cat.count !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2"><Edit size={13} /> Modifier</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive" onClick={() => deleteCategory(cat.id)}>
                      <Trash2 size={13} /> Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
 
        {/* Empty state placeholder card */}
        <button
          onClick={() => setOpen(true)}
          className="border-2 border-dashed border-border/50 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-border hover:text-foreground hover:bg-muted/30 transition-all min-h-24"
        >
          <Plus size={20} />
          <span className="text-sm font-medium">Nouvelle catégorie</span>
        </button>
      </div>
    </div>
  );
}