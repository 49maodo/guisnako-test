import { ServiceCard, type Service } from "./ServiceCard";


// eslint-disable-next-line react-refresh/only-export-components
export const services: Service[] = [
  {
    id: 1,
    title: "Mitsubishi Pajero 2016 automatique",
    description:
      "Mitsubishi Pajero 2016 automatique essence venant de Dubai. Révision complète à 93000 km, couleur blanche intérieur tissus beige 7 places. Grand écran caméra de recul + radar, climatisation bizone.",
    price: "15 000 000 F",
    image: "https://dicorpsas.com/amnafi/public/assets/multi-auto.jpg",
    provider: "CMF SERVICES",
    link: "#",
  },
];

export default function ListService() {
  return (
    <div className="space-y-6 mt-8">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}