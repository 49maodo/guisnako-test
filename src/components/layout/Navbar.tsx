"use client";

import { useState } from "react";
import {
  Search, ShoppingCart, Heart, User, Phone, ChevronDown,
  Home, Clock, Users, Store, LayoutDashboard, Package,
  FileText, DollarSign, GraduationCap, HeartPulse, MapPin,
  Trophy, Wifi, Zap, Shield, Leaf, ArrowUpRight, Truck,
  Factory, Sparkles, Menu, Trash2, Plus, Minus,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

interface NavLinkItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}
interface MegaColumn {
  label: string;
  items: NavLinkItem[];
}
interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

const HOME_ITEMS: NavLinkItem[] = [
  { label: "Accueil", href: "/", icon: <Home size={15} /> },
  { label: "Quoi de neuf ?", href: "/new", icon: <Clock size={15} /> },
  { label: "À propos de Guisnaako", href: "/about", icon: <Users size={15} /> },
];

const BOUTIQUE_ITEMS: NavLinkItem[] = [
  { label: "Créer une boutique", href: "#", icon: <Store size={15} />, badge: "Nouveau" },
  { label: "Tableau de bord", href: "/seller", icon: <LayoutDashboard size={15} /> },
  { label: "Mes produits", href: "/seller/products", icon: <Package size={15} /> },
  { label: "Suivi des commandes", href: "/seller/orders", icon: <FileText size={15} /> },
];

const CATEGORIES: MegaColumn[] = [
  {
    label: "Commerce",
    items: [
      { label: "Boutique", href: "#", icon: <Store size={14} /> },
      { label: "Import & Export", href: "#", icon: <Truck size={14} /> },
      { label: "Industrie & Artisanat", href: "#", icon: <Factory size={14} /> },
      { label: "Finance", href: "#", icon: <DollarSign size={14} /> },
    ],
  },
  {
    label: "Société",
    items: [
      { label: "Éducation", href: "#", icon: <GraduationCap size={14} /> },
      { label: "Santé", href: "#", icon: <HeartPulse size={14} /> },
      { label: "Tourisme & Culture", href: "#", icon: <MapPin size={14} /> },
      { label: "Sport & Divertissement", href: "#", icon: <Trophy size={14} /> },
    ],
  },
  {
    label: "Ressources",
    items: [
      { label: "Communication & TIC", href: "#", icon: <Wifi size={14} /> },
      { label: "Mine & Énergie", href: "#", icon: <Zap size={14} /> },
      { label: "Sécurité", href: "#", icon: <Shield size={14} /> },
      { label: "Agriculture", href: "#", icon: <Leaf size={14} /> },
    ],
  },
];

const SEARCH_CATEGORIES = [
  "Toutes rubriques", "Boutique", "Alimentation", "Beauté & soin",
  "Finance", "Agriculture", "Santé", "Éducation", "Transport",
];

const linksTopBar = [
  { label: "Inscription", path: "/register" },
  { label: "Connexion", path: "/login" },
  { label: "Comment adhérer ?", path: "/how-to-join" },
];

const INITIAL_CART: CartItem[] = [
  { id: 1, name: "Huile de palme bio 1L", price: 3500, qty: 2 },
  { id: 2, name: "Tisane détox Baobab", price: 1800, qty: 1 },
];

function TopBar() {
  return (
    <div className="hidden md:flex container mx-auto items-center justify-between px-5 py-2 border-b border-border text-xs text-muted-foreground">
      <div className="flex items-center gap-4 lg:gap-5">
        {linksTopBar.map((link) => (
          <Link key={link.label} to={link.path}
            className="hover:text-primary transition-colors whitespace-nowrap">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3 lg:gap-4">
        {["Contactez-nous", "Aide & FAQ"].map((label) => (
          <Link key={label} to="#" className="hover:text-primary transition-colors whitespace-nowrap">
            {label}
          </Link>
        ))}
        <Badge className="text-[10px] px-2 py-0.5 rounded-full border-0">FCFA</Badge>
        <Badge className="text-[10px] px-2 py-0.5 rounded-full border-0">FR</Badge>
      </div>
    </div>
  );
}

function SearchBar({ className }: { className?: string }) {
  return (
    <div className={cn(
      "flex items-center border border-border rounded-lg overflow-hidden bg-muted/40 focus-within:border-primary transition-colors",
      className
    )}>
      {/* Category select — hidden on small screens */}
      <div className="hidden lg:flex">
        <Select defaultValue="all">
          <SelectTrigger className="w-36 xl:w-40 shrink-0 border-0 border-r border-border rounded-none bg-transparent text-xs text-muted-foreground focus:ring-0 h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SEARCH_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat === "Toutes rubriques" ? "all" : cat} className="text-xs">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Input
        type="search"
        placeholder="Rechercher des produits, boutiques..."
        className="flex-1 border-0 bg-transparent text-sm focus-visible:ring-0 h-10 rounded-none min-w-0"
      />
      <button aria-label="Rechercher"
        className="flex items-center justify-center w-10 h-10 bg-primary shrink-0">
        <Search size={14} className="text-white" />
      </button>
    </div>
  );
}

function CartSheet({ count }: { count: number }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

  const updateQty = (id: number, delta: number) =>
    setItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon"
          className="relative h-9 w-9 border-border hover:border-primary hover:text-primary"
          aria-label="Panier">
          <ShoppingCart size={16} />
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-white">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-base font-semibold">
            <ShoppingCart size={17} className="text-primary" />
            Mon panier
            <Badge className="ml-1 text-[10px] px-1.5 py-0">{items.length}</Badge>
          </SheetTitle>
        </SheetHeader>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm gap-2">
              <ShoppingCart size={32} className="opacity-30" />
              <p>Votre panier est vide</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                {/* Placeholder image */}
                <div className="w-14 h-14 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <Package size={20} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight truncate">{item.name}</p>
                  <p className="text-primary text-sm font-semibold mt-0.5">
                    {(item.price * item.qty).toLocaleString("fr-FR")} FCFA
                  </p>
                  {/* Qty controls */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <button onClick={() => updateQty(item.id, -1)}
                      className="w-6 h-6 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                      <Minus size={10} />
                    </button>
                    <span className="text-xs font-medium w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, +1)}
                      className="w-6 h-6 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
                <button onClick={() => remove(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors shrink-0 p-1">
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <SheetFooter className="flex flex-col gap-3 px-5 py-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-semibold">{total.toLocaleString("fr-FR")} FCFA</span>
            </div>
            <Separator />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 text-sm h-10" asChild>
                <Link to="/cart">Voir le panier</Link>
              </Button>
              <Button className="flex-1 text-sm h-10" asChild>
                <Link to="/checkout">Commander</Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

function PhoneInfo() {
  return (
    <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-border shrink-0">
      <Phone size={14} className="text-primary" />
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Appelez-nous</span>
        <strong className="text-sm font-medium text-foreground whitespace-nowrap">(+221) 33 892 66 14</strong>
      </div>
    </div>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9" aria-label="Menu">
          <Menu size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm p-0 flex flex-col">
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <img src="/guisnako_logo.jpg" alt="Logo" className="h-7 w-7 rounded" />
            <span className="text-primary font-bold">Guisnaako</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {/* Top bar links */}
          <div className="flex flex-wrap gap-2 mb-4">
            {linksTopBar.map((link) => (
              <Link key={link.label} to={link.path}
                className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <Separator className="mb-3" />

          <Accordion type="multiple" className="w-full">
            {/* Guisnaako */}
            <AccordionItem value="home" className="border-none">
              <AccordionTrigger className="py-2.5 text-sm font-medium hover:no-underline">
                <span className="flex items-center gap-2 text-primary font-semibold">
                  <Home size={15} /> Guisnaako
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <div className="flex flex-col gap-0.5 pl-2">
                  {HOME_ITEMS.map((item) => (
                    <Link key={item.label} to={item.href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      <span className="text-primary">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Boutique */}
            <AccordionItem value="boutique" className="border-none">
              <AccordionTrigger className="py-2.5 text-sm font-medium hover:no-underline">
                <span className="flex items-center gap-2">
                  <Store size={15} className="text-primary" /> Gérer votre boutique
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <div className="flex flex-col gap-0.5 pl-2">
                  {BOUTIQUE_ITEMS.map((item) => (
                    <Link key={item.label} to={item.href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      <span className="text-primary">{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && <Badge className="text-[10px] h-4 px-1.5">{item.badge}</Badge>}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Categories */}
            {CATEGORIES.map((col) => (
              <AccordionItem key={col.label} value={col.label} className="border-none">
                <AccordionTrigger className="py-2.5 text-sm font-medium hover:no-underline">
                  <span className="flex items-center gap-2">
                    <Package size={15} className="text-primary" /> {col.label}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-1">
                  <div className="flex flex-col gap-0.5 pl-2">
                    {col.items.map((item) => (
                      <Link key={item.label} to={item.href}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <span className="text-primary">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Separator className="my-3" />

          <Link to="/new"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Clock size={15} className="text-primary" /> Quoi de neuf ?
          </Link>
          <Link to="#"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-primary hover:bg-muted/60 transition-colors">
            <Sparkles size={14} /> Offre Spéciale <ArrowUpRight size={12} />
          </Link>

          <Separator className="my-3" />

          {/* Phone in mobile */}
          <div className="flex items-center gap-2 px-3 py-2">
            <Phone size={14} className="text-primary" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Appelez-nous</span>
              <strong className="text-sm">(+221) 33 892 66 14</strong>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SimpleDropdown({
  trigger, items, hasSeparator = false,
}: {
  trigger: React.ReactNode;
  items: NavLinkItem[];
  hasSeparator?: boolean;
}) {
  const separatorIndex = hasSeparator ? 2 : -1;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground transition-colors outline-none data-[state=open]:bg-muted data-[state=open]:text-foreground whitespace-nowrap">
          {trigger}
          <ChevronDown size={12} className="transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-1.5 rounded-xl border-border shadow-lg" align="start">
        {items.map((item, i) => (
          <div key={item.label}>
            {i === separatorIndex && <DropdownMenuSeparator className="my-1" />}
            {i === separatorIndex && (
              <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 pb-1">
                Commandes
              </DropdownMenuLabel>
            )}
            <DropdownMenuItem asChild>
              <Link to={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm">
                <span className="text-primary shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && <Badge className="text-[10px] h-4 px-1.5 font-medium">{item.badge}</Badge>}
              </Link>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-auto px-3 py-3 text-sm font-medium text-muted-foreground rounded-lg bg-transparent hover:bg-muted hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground whitespace-nowrap">
            Catégories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-3 gap-0 w-135 xl:w-150 p-2 rounded-xl">
              {CATEGORIES.map((col, colIdx) => (
                <div key={col.label}
                  className={cn("p-2", colIdx < CATEGORIES.length - 1 && "border-r border-border")}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 pb-1 pt-1">
                    {col.label}
                  </p>
                  {col.items.map((item) => (
                    <Link key={item.label} to={item.href}
                      className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
                      <span className="text-primary shrink-0">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function Navbar() {
  const cartCount = INITIAL_CART.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border border-border rounded-xl overflow-visible shadow-sm">
      <div className="container mx-auto">

        {/* Top bar — desktop only */}
        <TopBar />

        {/* Main bar */}
        <div className="flex items-center gap-2 md:gap-4 px-3 md:px-5 py-3 border-b border-border">

          {/* Hamburger — mobile/tablet */}
          <MobileMenu />

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src="/guisnako_logo.jpg" alt="Logo" className="h-8 w-8 rounded" />
          </Link>

          {/* Search — hidden on xs, visible from sm */}
          <SearchBar className="hidden sm:flex flex-1 min-w-0" />

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto sm:ml-0">
            <Button variant="outline" size="icon"
              className="h-9 w-9 border-border hover:border-primary hover:text-primary"
              aria-label="Favoris">
              <Heart size={16} />
            </Button>
            <Button variant="outline" size="icon"
              className="hidden sm:flex h-9 w-9 border-border hover:border-primary hover:text-primary"
              aria-label="Mon compte">
              <User size={16} />
            </Button>
            <CartSheet count={cartCount} />
          </div>

          {/* Phone */}
          <PhoneInfo />
        </div>

        {/* Mobile search bar — xs only */}
        <div className="sm:hidden px-3 py-2 border-b border-border">
          <SearchBar className="w-full" />
        </div>

        {/* Bottom navigation — desktop only */}
        <div className="hidden lg:flex items-center px-5 gap-1 overflow-x-auto scrollbar-none">
          <SimpleDropdown
            trigger={<span className="text-primary font-semibold">Guisnaako</span>}
            items={HOME_ITEMS}
          />
          <SimpleDropdown
            trigger="Gérer votre boutique"
            items={BOUTIQUE_ITEMS}
            hasSeparator
          />
          <MegaMenu />
          <div className="flex-1" />
          <Link to="/new"
            className="px-3 py-3 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap">
            Quoi de neuf ?
          </Link>
          <Link to="#"
            className="flex items-center gap-1.5 px-3.5 py-2 my-1.5 text-sm font-semibold text-primary rounded-lg transition-colors whitespace-nowrap">
            <Sparkles size={13} className="text-primary" />
            Offre Spéciale
            <ArrowUpRight size={12} className="text-primary" />
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;