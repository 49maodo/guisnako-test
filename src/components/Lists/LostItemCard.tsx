export type LostItem = {
    id: number;
    type: "CNI" | "Passeport" | "Carte Grise" | "Permis";
    title: string;
    location: string;
    date: string;
    ref: string;
    link: string;
  };

  // eslint-disable-next-line react-refresh/only-export-components
  export const typeStyles: Record<LostItem["type"], string> = {
    CNI: "bg-blue-50 text-blue-600",
    Passeport: "bg-red-50 text-red-600",
    "Carte Grise": "bg-emerald-50 text-emerald-600",
    Permis: "bg-orange-50 text-orange-600",
  };

  import { Card, CardContent, CardFooter } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";

  
  type Props = {
    item: LostItem;
  };
  
  export function LostItemCard({ item }: Props) {
    return (
      <Card className="rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <Badge className={`${typeStyles[item.type]} uppercase text-[10px] tracking-widest`}>
              {item.type}
            </Badge>
            <span className="text-gray-400 text-xs italic">{item.date}</span>
          </div>
  
          <h3 className="text-lg font-medium mb-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground italic">{item.location}</p>
        </CardContent>
  
        <CardFooter className="flex justify-between items-center border-t p-4">
          <span className="text-xs text-muted-foreground font-mono">
            {item.ref}
          </span>
  
          <a
            href={item.link}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Détails
          </a>
        </CardFooter>
      </Card>
    );
  }