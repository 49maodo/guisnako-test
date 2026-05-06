import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export type Product = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
  };

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition flex flex-col">
      {/* Image */}
      <div className="relative group">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-52 object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-4">
          <p className="text-white text-sm text-center">
            {product.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 flex-1">
        <h3 className="font-semibold text-sm line-clamp-2">
          {product.title}
        </h3>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <span className="font-bold text-primary">
          {product.price}
        </span>

        <Button
          
          className="rounded-md px-4"
          onClick={() => navigate(`/product-item-detail/${product.id}`)}
        >
          Voir plus
        </Button>
      </CardFooter>
    </Card>
  );
}



