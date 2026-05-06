import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Gouvernement du SENEGAL",
  "Boutique",
  "Alimentation",
  "Beauté et soin du corps",
  "Finance",
  "Justice",
  "Tourisme et Culture",
  "Education",
  "Agriculture",
  "Industrie et Artisanat",
  "Elevage",
  "Peche",
  "Transport et Mécanique",
  "Sport et Divertissement",
  "Maison",
  "Eau et Assainissement",
  "Communication et TIC",
  "Mine et Énergie",
  "Sécurité",
  "Santé",
  "Organisme",
  "Association",
  "Import et Export",
  "Autres",
];

interface CategorySidebarProps {
  activeCategory?: string;
  onSelect?: (cat: string) => void;
}

export const CategorySidebar = ({ activeCategory, onSelect }: CategorySidebarProps) => {
  return (
    <aside className="w-full">
      <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 pt-4">
        Rubriques
      </h2>
      <nav>
        <ul className="space-y-0.5">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onSelect?.(cat)}
                className={cn(
                  "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                  activeCategory === cat
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};