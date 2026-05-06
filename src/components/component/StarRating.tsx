import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export const StarRating = ({
  rating,
  max = 5,
  size = 14,
  showValue = false,
  className,
}: StarRatingProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;

        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star
              size={size}
              className="absolute text-muted-foreground/30"
              fill="currentColor"
              strokeWidth={0}
            />
            {(filled || partial) && (
              <span
                className="absolute overflow-hidden"
                style={{ width: partial ? `${(rating % 1) * 100}%` : "100%" }}
              >
                <Star
                  size={size}
                  className="text-amber-400"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>
            )}
          </span>
        );
      })}
      {showValue && (
        <span className="text-sm text-muted-foreground ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};