import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRight, Search, Star, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

const INITIAL_CUSTOMERS = [
  { id: 1, name: "Aminata Diallo",  email: "aminata@gmail.com",  phone: "77 123 45 67", orders: 4, total: 85000,  status: "active" },
  { id: 2, name: "Ibrahima Sow",    email: "ibrahim@yahoo.fr",   phone: "76 987 65 43", orders: 1, total: 500000, status: "active" },
  { id: 3, name: "Fatou Ndiaye",    email: "fatou@hotmail.com",  phone: "78 456 78 90", orders: 7, total: 210000, status: "vip" },
  { id: 4, name: "Moussa Diop",     email: "moussa@orange.sn",   phone: "70 321 09 87", orders: 2, total: 45000,  status: "inactive" },
];

const fmt = (n: number) => new Intl.NumberFormat("fr-SN").format(n) + " F";

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; class: string }> = {
    active:   { label: "Actif",    class: "bg-[var(--color-success,#22c55e)]/10 text-[var(--color-success,#16a34a)]" },
    inactive: { label: "Inactif",  class: "bg-[var(--muted)] text-[var(--muted-foreground)]" },
    vip:      { label: "VIP",      class: "bg-amber-100 text-amber-700" },
  };
  const s = map[status] ?? map.active;
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s.class}`}>{s.label}</span>;
};

export function CustomersPage() {
  
  const [search, setSearch] = useState("");
  const [customers] = useState(INITIAL_CUSTOMERS);
 
  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );
 
  const initials = (name: string) =>
    name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
 
  const avatarColor = (name: string) => {
    const colors = [
      "bg-violet-100 text-violet-700",
      "bg-blue-100 text-blue-700",
      "bg-emerald-100 text-emerald-700",
      "bg-amber-100 text-amber-700",
    ];
    return colors[name.charCodeAt(0) % colors.length];
  };
 
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground text-sm mt-1">{customers.length} client{customers.length > 1 ? "s" : ""} enregistrés</p>
        </div>
      </div>
 
      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total clients", value: customers.length, icon: Users },
          { label: "Clients VIP",   value: customers.filter((c) => c.status === "vip").length, icon: Star },
          { label: "Clients actifs",value: customers.filter((c) => c.status === "active").length, icon: TrendingUp },
        ].map((s) => (
          <Card key={s.label} className="border-border/60">
            <CardContent className="p-4 flex items-center gap-3">
              <s.icon size={18} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
 
      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="pl-9 h-10" />
      </div>
 
      {/* Table */}
      <Card className="border-border/60">
        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="pl-6 text-xs">Client</TableHead>
              <TableHead className="text-xs hidden md:table-cell">Téléphone</TableHead>
              <TableHead className="text-xs hidden sm:table-cell">Commandes</TableHead>
              <TableHead className="text-xs">Total</TableHead>
              <TableHead className="text-xs hidden sm:table-cell">Statut</TableHead>
              <TableHead className="pr-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id} className="border-border/40 group">
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${avatarColor(c.name)}`}>
                      {initials(c.name)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{c.phone}</TableCell>
                <TableCell className="hidden sm:table-cell text-sm">{c.orders}</TableCell>
                <TableCell className="font-semibold text-sm">{fmt(c.total)}</TableCell>
                <TableCell className="hidden sm:table-cell"><StatusBadge status={c.status} /></TableCell>
                <TableCell className="pr-6">
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}