"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar";

import {
    Store,
    LayoutGrid,
    Package,
    Users,
    ChartColumnBig,
    ShoppingCart
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { NavUser } from "./NavUser";

const menu = [
    { label: "Statistique", icon: ChartColumnBig, href: "/seller" },
    { label: "Boutique", icon: Store, href: "/seller/store" },
    { label: "Catalogue", icon: LayoutGrid, href: "/seller/catalog" },
    { label: "Produits", icon: Package, href: "/seller/products" },
    { label: "Clients", icon: Users, href: "/seller/customers" },
    { label: "Commandes", icon: ShoppingCart, href: "/seller/orders" },
];
const user =
{
    name: "shadcn",
    email: "m@example.com",
    avatar: "/guisnako_logo.jpg",
}
    ;

export function SellerSidebar() {
    const { pathname } = useLocation();
    return (
        <Sidebar collapsible="icon" >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="cursor-pointer">
                            <Link to="/">
                                    <img src="/guisnako_logo.jpg" alt="guisnako" className="w-8 h-8" />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Guisnaako</span>
                                    <span className="truncate text-xs">Vendeur</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menu.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                                        <Link to={item.href}>
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}