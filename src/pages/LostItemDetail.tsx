import LostItemDetailCard, { type LostItemDetailType } from "@/components/Lists/LostItemDetailCard";


// eslint-disable-next-line react-refresh/only-export-components
export const lostItem: LostItemDetailType = {
  id: 1,
  type: "CNI",
  name: "Ndiaye Mamadou",
  ref: "**** 4589",
  date: "12 Avril 2026",
  location: "Dakar, Plateau",
  contact: "+221 77 000 00 00",
  description:
    "Carte trouvée devant une banque. Merci de contacter le numéro ci-dessus pour récupération.",
  status: "trouvé",
  lat: 14.7167,
  lng: -17.4667
};

export default function LostItemDetail() {
  return (
    <div className="container mx-auto py-8">
      <LostItemDetailCard item={lostItem} />
    </div>
  );
}