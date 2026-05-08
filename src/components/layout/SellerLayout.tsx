import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SellerSidebar } from "./SellerSidebar";


export function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SellerSidebar />
        <main className="flex-1 px-6 mb-6">
          <div className="sticky top-0 flex shrink-0 items-center justify-start gap-4 border-b py-2">
          <SidebarTrigger variant={"default"} />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}