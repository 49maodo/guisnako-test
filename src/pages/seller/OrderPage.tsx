import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, ChevronRight, Clock, CreditCard, Download, Eye, Filter, MapPin, MoreVertical, Package, PackageOpen, Phone, Search, ShoppingCart, Truck, XCircle } from "lucide-react";
import { useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat("fr-SN").format(n) + " F";

const STATUS_CONFIG = {
    pending: { label: "En attente", icon: Clock, bg: "bg-amber-50  dark:bg-amber-950/30", text: "text-amber-700  dark:text-amber-400", border: "border-amber-200  dark:border-amber-800" },
    confirmed: { label: "Confirmée", icon: CheckCircle2, bg: "bg-blue-50   dark:bg-blue-950/30", text: "text-blue-700   dark:text-blue-400", border: "border-blue-200   dark:border-blue-800" },
    shipped: { label: "Expédiée", icon: Truck, bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-400", border: "border-violet-200 dark:border-violet-800" },
    delivered: { label: "Livrée", icon: PackageOpen, bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
    cancelled: { label: "Annulée", icon: XCircle, bg: "bg-red-50    dark:bg-red-950/30", text: "text-red-700    dark:text-red-400", border: "border-red-200    dark:border-red-800" },
};

const PAYMENT_CONFIG: Record<string, { label: string; class: string }> = {
  paid: { label: "Payé", class: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  pending: { label: "En attente", class: "bg-amber-50 text-amber-700 border border-amber-200" },
  refunded: { label: "Remboursé", class: "bg-red-50 text-red-700 border border-red-200" },
};

const INITIAL_ORDERS = [
    {
        id: "CMD-2048", date: "2026-05-07", customer: { name: "Fatou Ndiaye", phone: "78 456 78 90", address: "Rue 10, Plateau, Dakar" },
        items: [{ name: "MacBook Air M2", qty: 1, price: 500000 }, { name: "Souris Magic", qty: 1, price: 18000 }],
        status: "delivered", payment: "paid",
    },
    {
        id: "CMD-2047", date: "2026-05-06", customer: { name: "Moussa Diop", phone: "70 321 09 87", address: "Liberté 6, Dakar" },
        items: [{ name: "Montre connectée", qty: 2, price: 10200 }],
        status: "shipped", payment: "paid",
    },
    {
        id: "CMD-2046", date: "2026-05-05", customer: { name: "Aminata Diallo", phone: "77 123 45 67", address: "Almadies, Dakar" },
        items: [{ name: "Écouteurs Pro", qty: 1, price: 35000 }],
        status: "confirmed", payment: "pending",
    },
    {
        id: "CMD-2045", date: "2026-05-04", customer: { name: "Ibrahima Sow", phone: "76 987 65 43", address: "Grand Yoff, Dakar" },
        items: [{ name: "Clavier mécanique", qty: 1, price: 45000 }, { name: "Tapis de souris XL", qty: 1, price: 8500 }],
        status: "pending", payment: "pending",
    },
    {
        id: "CMD-2044", date: "2026-05-03", customer: { name: "Aïssatou Ba", phone: "77 654 32 10", address: "Mermoz, Dakar" },
        items: [{ name: "Hub USB-C", qty: 3, price: 12000 }],
        status: "cancelled", payment: "refunded",
    },
    {
        id: "CMD-2043", date: "2026-05-02", customer: { name: "Ousmane Fall", phone: "76 111 22 33", address: "HLM, Dakar" },
        items: [{ name: "Webcam HD", qty: 1, price: 28000 }],
        status: "delivered", payment: "paid",
    },
];

const NEXT_STATUS = {
    pending: "confirmed",
    confirmed: "shipped",
    shipped: "delivered",
};

function StatusBadge({ status } : { status: string }) {
  const c = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
    if (!c) return null;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.bg} ${c.text} ${c.border}`}>
            <c.icon size={11} />
            {c.label}
        </span>
    );
}

function PaymentBadge({ payment } : { payment: string }) {
    const c = PAYMENT_CONFIG[payment];
    if (!c) return null;
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${c.class}`}>
            {c.label}
        </span>
    );
}

export default function OrderPage() {
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);

    // Stats
    const stats = [
        { label: "Total", value: orders.length, icon: ShoppingCart, color: "text-blue-600   bg-blue-50   dark:bg-blue-950/30" },
        { label: "En attente", value: orders.filter((o) => o.status === "pending").length, icon: Clock, color: "text-amber-600  bg-amber-50  dark:bg-amber-950/30" },
        { label: "Expédiées", value: orders.filter((o) => o.status === "shipped").length, icon: Truck, color: "text-violet-600 bg-violet-50 dark:bg-violet-950/30" },
        { label: "Livrées", value: orders.filter((o) => o.status === "delivered").length, icon: PackageOpen, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" },
    ];

    const revenue = orders
        .filter((o) => o.status !== "cancelled")
        .reduce((s, o) => s + o.items.reduce((ss, i) => ss + i.qty * i.price, 0), 0);

    // Filtering
    const filtered = orders.filter((o) => {
        const matchSearch =
            o.id.toLowerCase().includes(search.toLowerCase()) ||
            o.customer.name.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || o.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const handleStatusChange = (orderId: string, newStatus: string) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === orderId
                    ? { ...o, status: newStatus, payment: newStatus === "cancelled" && o.payment === "paid" ? "refunded" : o.payment }
                    : o
            )
        );
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderTotal = (order: any) => order.items.reduce((s: number, i: any) => s + i.qty * i.price, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Commandes</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {orders.length} commande{orders.length > 1 ? "s" : ""} · Revenu total{" "}
                        <span className="font-semibold text-foreground">{fmt(revenue)}</span>
                    </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
                    <Download size={13} /> Exporter
                </Button>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((s) => (
                    <Card
                        key={s.label}
                        className={`border-border/60 cursor-pointer transition-shadow hover:shadow-sm ${filterStatus === (s.label === "Total" ? "all" : Object.keys(STATUS_CONFIG).find((k) => STATUS_CONFIG[k as keyof typeof STATUS_CONFIG].label === s.label) ?? "all") ? "ring-2 ring-violet-500/30" : ""}`}
                        onClick={() => {
                            const statusKey = Object.keys(STATUS_CONFIG).find((k) => STATUS_CONFIG[k as keyof typeof STATUS_CONFIG].label === s.label);
                            setFilterStatus(s.label === "Total" ? "all" : statusKey ?? "all");
                        }}
                    >
                        <CardContent className="p-4 flex items-center gap-3">
                            <span className={`p-2 rounded-lg ${s.color} shrink-0`}>
                                <s.icon size={15} />
                            </span>
                            <div>
                                <p className="text-xs text-muted-foreground">{s.label}</p>
                                <p className="text-xl font-bold leading-tight">{s.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="N° commande ou client..."
                        className="pl-9 h-10"
                    />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-44 h-10">
                        <div className="flex items-center gap-2">
                            <Filter size={13} className="text-muted-foreground" />
                            <SelectValue placeholder="Statut" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                            <SelectItem key={key} value={key}>
                                <div className="flex items-center gap-2">
                                    <cfg.icon size={12} />
                                    {cfg.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <Card className="border-border/60">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border/60 hover:bg-transparent">
                            <TableHead className="pl-6 text-xs">Commande</TableHead>
                            <TableHead className="text-xs">Client</TableHead>
                            <TableHead className="text-xs hidden md:table-cell">Articles</TableHead>
                            <TableHead className="text-xs">Montant</TableHead>
                            <TableHead className="text-xs hidden sm:table-cell">Statut</TableHead>
                            <TableHead className="text-xs hidden lg:table-cell">Paiement</TableHead>
                            <TableHead className="pr-6 text-xs hidden sm:table-cell">Date</TableHead>
                            <TableHead className="pr-4 w-10" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-16 text-muted-foreground">
                                    <ShoppingCart size={32} className="mx-auto mb-3 opacity-30" />
                                    <p className="text-sm">Aucune commande trouvée.</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((order) => (
                                <TableRow
                                    key={order.id}
                                    className="border-border/40 group cursor-pointer hover:bg-muted/30"
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onClick={() => { setSelectedOrder(order as any); setDetailOpen(true); }}
                                >
                                    <TableCell className="pl-6">
                                        <span className="font-mono text-xs font-semibold text-muted-foreground">{order.id}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-7 w-7 rounded-full bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-[10px] font-bold text-violet-700 dark:text-violet-300 shrink-0">
                                                {order.customer.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
                                            </div>
                                            <span className="text-sm font-medium whitespace-nowrap">{order.customer.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <span className="text-xs text-muted-foreground">
                                            {order.items.length} article{order.items.length > 1 ? "s" : ""}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-semibold text-sm whitespace-nowrap">{fmt(orderTotal(order))}</span>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <StatusBadge status={order.status} />
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <PaymentBadge payment={order.payment} />
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground pr-6 whitespace-nowrap">
                                        {new Date(order.date).toLocaleDateString("fr-SN", { day: "2-digit", month: "short" })}
                                    </TableCell>
                                    <TableCell className="pr-4" onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreVertical size={13} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                <DropdownMenuItem className="gap-2" onClick={() => { setSelectedOrder(order as any); setDetailOpen(true); }}>
                                                    <Eye size={13} /> Voir les détails
                                                </DropdownMenuItem>
                                                {NEXT_STATUS[order.status as keyof typeof NEXT_STATUS] && (
                                                    <DropdownMenuItem
                                                        className="gap-2"
                                                        onClick={() => handleStatusChange(order.id, NEXT_STATUS[order.status as keyof typeof NEXT_STATUS]!)}
                                                    >
                                                        <ChevronRight size={13} />
                                                        → {STATUS_CONFIG[NEXT_STATUS[order.status as keyof typeof NEXT_STATUS]! as keyof typeof STATUS_CONFIG].label}
                                                    </DropdownMenuItem>
                                                )}
                                                {order.status !== "cancelled" && order.status !== "delivered" && (
                                                    <>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="gap-2 text-destructive focus:text-destructive"
                                                            onClick={() => handleStatusChange(order.id, "cancelled")}
                                                        >
                                                            <XCircle size={13} /> Annuler
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>

            {/* Detail dialog */}
            <OrderDetailDialog
                order={selectedOrder}
                open={detailOpen}
                onClose={() => setDetailOpen(false)}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OrderDetailDialog({ order, open, onClose, onStatusChange } : { order: any; open: boolean; onClose: () => void; onStatusChange: (orderId: string, newStatus: string) => void }) {
    if (!order) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const total = order.items.reduce((s: number, i: any) => s + i.qty * i.price, 0);
    const nextStatus = NEXT_STATUS[order.status as keyof typeof NEXT_STATUS];
   
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="font-mono text-base">{order.id}</DialogTitle>
              <StatusBadge status={order.status} />
            </div>
          </DialogHeader>
   
          <div className="space-y-5 pt-1">
            {/* Timeline */}
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">Progression</p>
              <OrderTimeline status={order.status} />
            </div>
   
            <Separator />
   
            {/* Customer */}
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">Client</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-xs font-semibold text-violet-700 dark:text-violet-300 shrink-0">
                    {order.customer.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{order.customer.name}</p>
                  </div>
                </div>
                <div className="pl-10 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone size={12} /> {order.customer.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={12} /> {order.customer.address}
                  </div>
                </div>
              </div>
            </div>
   
            <Separator />
   
            {/* Items */}
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">Articles</p>
              <div className="space-y-2">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-background border border-border flex items-center justify-center">
                        <Package size={13} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qté : {item.qty}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">{fmt(item.qty * item.price)}</p>
                  </div>
                ))}
              </div>
            </div>
   
            <Separator />
   
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Sous-total</span><span>{fmt(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Livraison</span><span className="text-emerald-600 font-medium">Gratuit</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span><span>{fmt(total)}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CreditCard size={12} /> Paiement
                </div>
                <PaymentBadge payment={order.payment} />
              </div>
            </div>
   
            {/* Actions */}
            {nextStatus && (
              <Button
                className="w-full gap-2"
                onClick={() => { onStatusChange(order.id, nextStatus); onClose(); }}
              >
                <ChevronRight size={14} />
                Passer à : <strong>{STATUS_CONFIG[nextStatus as keyof typeof STATUS_CONFIG].label}</strong>
              </Button>
            )}
            {order.status !== "cancelled" && order.status !== "delivered" && (
              <Button
                variant="outline"
                className="w-full gap-2 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5"
                onClick={() => { onStatusChange(order.id, "cancelled"); onClose(); }}
              >
                <XCircle size={14} /> Annuler la commande
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  function OrderTimeline({ status } : { status: string }) {
    const steps = ["pending", "confirmed", "shipped", "delivered"] as const;
    const currentIdx = steps.findIndex((s) => s === status);
    const isCancelled = status === "cancelled";
   
    if (isCancelled) {
      return (
        <div className="flex items-center gap-2 py-3 px-4 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-100 dark:border-red-900">
          <XCircle size={15} className="text-red-500" />
          <span className="text-sm text-red-600 dark:text-red-400 font-medium">Commande annulée</span>
        </div>
      );
    }
   
    return (
      <div className="flex items-center gap-0">
        {steps.map((step, idx) => {
          const cfg = STATUS_CONFIG[step];
          const done = idx <= currentIdx;
          const active = idx === currentIdx;
          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                  done
                    ? active
                      ? "border-violet-500 bg-violet-500 text-white"
                      : "border-emerald-500 bg-emerald-500 text-white"
                    : "border-border bg-background text-muted-foreground"
                }`}>
                  <cfg.icon size={14} />
                </div>
                <span className={`text-[10px] font-medium whitespace-nowrap ${done ? "text-foreground" : "text-muted-foreground"}`}>
                  {cfg.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 mb-4 rounded transition-colors ${idx < currentIdx ? "bg-emerald-400" : "bg-border"}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }