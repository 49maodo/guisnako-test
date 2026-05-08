import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Camera, Mail, MapPin, Phone, Save, Store, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function StorePage()  {
  const [store, setStore] = useState({
    name: "TechShop Dakar",
    phone: "77 800 00 00",
    address: "Rue 10, Plateau, Dakar",
    description: "Votre boutique de référence pour l'électronique et l'informatique à Dakar.",
    email: "contact@techshopdakar.sn",
  });
  const [saved, setSaved] = useState(false);
 
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
 
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ma boutique</h1>
        <p className="text-muted-foreground text-sm mt-1">Gérez les informations visibles par vos clients.</p>
      </div>
 
      {/* Avatar / cover */}
      <Card className="border-border/60 overflow-hidden">
        <div className="h-24 bg-linear-to-r from-violet-500/20 to-blue-500/20 relative">
          <button className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/80 hover:bg-background text-muted-foreground hover:text-foreground transition-colors">
            <Camera size={14} />
          </button>
        </div>
        <CardContent className="pt-0 pb-4 px-6">
          <div className="-mt-8 flex items-end gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl border-4 border-background bg-violet-100 flex items-center justify-center">
                <Store size={24} className="text-violet-600" />
              </div>
              <button className="absolute -bottom-1 -right-1 p-1 rounded-full bg-background border border-border shadow-sm hover:bg-muted transition-colors">
                <Upload size={10} />
              </button>
            </div>
            <div className="pb-1">
              <p className="font-semibold">{store.name || "Nom de la boutique"}</p>
              <p className="text-xs text-muted-foreground">{store.address || "Adresse"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
 
      {/* Form */}
      <Card className="border-border/60">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Nom de la boutique</Label>
              <Input
                value={store.name}
                onChange={(e) => setStore({ ...store, name: e.target.value })}
                placeholder="Ex: TechShop Dakar"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</Label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={store.email}
                  onChange={(e) => setStore({ ...store, email: e.target.value })}
                  placeholder="contact@boutique.sn"
                  className="h-10 pl-9"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Téléphone</Label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={store.phone}
                  onChange={(e) => setStore({ ...store, phone: e.target.value })}
                  placeholder="77 000 00 00"
                  className="h-10 pl-9"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Adresse</Label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={store.address}
                  onChange={(e) => setStore({ ...store, address: e.target.value })}
                  placeholder="Rue, quartier, ville"
                  className="h-10 pl-9"
                />
              </div>
            </div>
          </div>
 
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</Label>
            <Textarea
              value={store.description}
              onChange={(e) => setStore({ ...store, description: e.target.value })}
              placeholder="Décrivez votre boutique en quelques mots..."
              className="resize-none min-h-22.5"
            />
          </div>
 
          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} className="gap-2" disabled={saved}>
              {saved ? (
                <><AlertCircle size={14} /> Enregistré !</>
              ) : (
                <><Save size={14} /> Enregistrer</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}