import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Users,
  TrendingUp,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

const fmt = (n) => new Intl.NumberFormat("fr-SN").format(n) + " F";

export default function SellerStat() {
  const stats = [
    { label: "Revenus ce mois", value: "1 240 000 F", icon: TrendingUp, delta: "+12%",  color: "text-emerald-600 bg-emerald-50" },
    { label: "Commandes",       value: "48",           icon: ShoppingBag, delta: "+5%",  color: "text-blue-600 bg-blue-50" },
    { label: "Produits actifs", value: "24",           icon: Package,     delta: "0",    color: "text-violet-600 bg-violet-50" },
    { label: "Clients",         value: "134",          icon: Users,       delta: "+8%",  color: "text-amber-600 bg-amber-50" },
  ];
 
  const recent = [
    { id: "#2048", client: "Fatou Ndiaye",    product: "MacBook Air M2",   amount: 500000, date: "Aujourd'hui" },
    { id: "#2047", client: "Moussa Diop",     product: "Montre connectée", amount: 10200,  date: "Hier" },
    { id: "#2046", client: "Aminata Diallo",  product: "Écouteurs Pro",    amount: 35000,  date: "03 mai" },
  ];
 
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm mt-1">Bienvenue 👋 — voici un aperçu de votre activité.</p>
      </div>
 
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{s.label}</p>
                  <p className="text-2xl font-bold mt-1">{s.value}</p>
                  {s.delta !== "0" && (
                    <p className="text-xs text-emerald-600 font-medium mt-1">{s.delta} ce mois</p>
                  )}
                </div>
                <span className={`p-2.5 rounded-xl ${s.color}`}>
                  <s.icon size={18} />
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
 
      {/* Recent orders */}
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Commandes récentes</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
              Voir tout <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="text-xs pl-6">N° Commande</TableHead>
                <TableHead className="text-xs">Client</TableHead>
                <TableHead className="text-xs hidden md:table-cell">Produit</TableHead>
                <TableHead className="text-xs text-right">Montant</TableHead>
                <TableHead className="text-xs text-right pr-6 hidden sm:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((r) => (
                <TableRow key={r.id} className="border-border/40">
                  <TableCell className="pl-6 font-mono text-xs text-muted-foreground">{r.id}</TableCell>
                  <TableCell className="font-medium text-sm">{r.client}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{r.product}</TableCell>
                  <TableCell className="text-right text-sm font-semibold">{fmt(r.amount)}</TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground pr-6 hidden sm:table-cell">{r.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}