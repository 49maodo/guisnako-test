import { Card, CardContent } from "@/components/ui/card";

export type Service = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    provider: string;
    link: string;
  };
  
type Props = {
  service: Service;
};

export function ServiceCard({ service }: Props) {
  return (
    <Card className="overflow-hidden rounded-2xl hover:shadow-md transition">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          
          {/* Image */}
          <div className="relative w-full md:w-48 h-40 shrink-0">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover rounded-xl"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center rounded-xl">
              <span className="text-white text-sm font-semibold">
                {service.provider}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
              <h3 className="text-lg font-medium">
                <a href={service.link} className="hover:underline">
                  {service.title}
                </a>
              </h3>

              <span className="text-primary font-semibold whitespace-nowrap">
                {service.price}
              </span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3">
              {service.description}
            </p>

            <div>
              <a
                href={service.link}
                className="text-sm text-primary font-medium hover:underline"
              >
                Voir plus →
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}