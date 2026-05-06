import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Product } from "@/Types/Product";
import { StarRating } from "./StarRating";

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs = ({ product }: ProductTabsProps) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-0">
        {["description", "info", "reviews"].map((tab) => {
          const labels: Record<string, string> = {
            description: "Description",
            info: "Informations",
            reviews: `Avis (${product.reviewCount})`,
          };
          return (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm font-medium"
            >
              {labels[tab]}
            </TabsTrigger>
          );
        })}
      </TabsList>

      <TabsContent value="description" className="mt-6 prose prose-sm max-w-none text-muted-foreground">
        <p>{product.description}</p>
        <p>
          Conçu pour offrir une expérience supérieure, ce produit associe design soigné et
          performance technique. Chaque détail a été pensé pour répondre aux besoins des
          utilisateurs les plus exigeants.
        </p>
      </TabsContent>

      <TabsContent value="info" className="mt-6">
        <table className="w-full text-sm">
          <tbody>
            {[
              ["Référence", product.sku],
              ["Disponibilité", product.availability === "available" ? "En stock" : "Limité"],
              ["Catégorie", product.category],
            ].map(([key, val]) => (
              <tr key={key} className="border-b border-border last:border-0">
                <td className="py-3 pr-6 font-medium text-foreground w-1/3">{key}</td>
                <td className="py-3 text-muted-foreground">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6 space-y-8">
        {/* Existing reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="flex gap-4 p-4 rounded-xl border border-border">
                <Avatar className="h-10 w-10 shrink-0">
                  {review.avatar && <AvatarImage src={review.avatar} alt={review.author} />}
                  <AvatarFallback>
                    {review.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-medium text-sm text-foreground">{review.author}</span>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <StarRating rating={review.rating} size={12} className="mt-1 mb-2" />
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add review form */}
        <div className="rounded-xl border border-border p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Laisser un avis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="review-name">Nom</Label>
              <Input id="review-name" placeholder="Votre nom" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="review-email">Email</Label>
              <Input id="review-email" type="email" placeholder="votre@email.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="review-comment">Commentaire</Label>
            <Textarea id="review-comment" placeholder="Votre avis sur le produit..." rows={4} />
          </div>
          <Button>Publier l'avis</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};