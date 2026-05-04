import type { LostItem } from "./LostItemCard";


 const lostItems: LostItem[] = [
  {
    id: 1,
    type: "CNI",
    title: "Jean Pierre Bakhoum",
    location: "Trouvé Police de Dieuppeul, Dakar",
    date: "Il y a 2h",
    ref: "ID: ****8921",
    link: "#",
  },
  {
    id: 2,
    type: "Passeport",
    title: "Aminata Fall",
    location: "Trouvé Aéroport AIBD",
    date: "Hier",
    ref: "SN: ****KL90",
    link: "#",
  },
  {
    id: 3,
    type: "Carte Grise",
    title: "Véhicule : AB-123-SN",
    location: "Trouvé Parking LSS, Parcelles",
    date: "Le 10/05",
    ref: "VIN: ****5678",
    link: "#",
  },
  {
    id: 4,
    type: "Permis",
    title: "Mamadou Sow",
    location: "Trouvé Centre-ville, Thiès",
    date: "Le 09/05",
    ref: "PC: ****2231",
    link: "#",
  },
];

import { LostItemCard } from "./LostItemCard";


export default function ListLost() {
  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-light mb-2">
          Résultats de recherche
        </h2>

        <p className="text-muted-foreground">
          Nous avons trouvé{" "}
          <span className="font-semibold text-foreground">
            {lostItems.length} documents
          </span>{" "}
          correspondant à vos critères.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {lostItems.map((item) => (
          <LostItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}