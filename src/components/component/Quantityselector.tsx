import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export const QuantitySelector = ({
  value,
  min = 1,
  max = 99,
  onChange,
}: QuantitySelectorProps) => {
  return (
    <div className="flex items-center border border-border rounded-lg overflow-hidden w-fit">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none border-r border-border hover:bg-muted"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuer la quantité"
      >
        <Minus size={14} />
      </Button>
      <span className="w-12 text-center text-sm font-medium tabular-nums">{value}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none border-l border-border hover:bg-muted"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Augmenter la quantité"
      >
        <Plus size={14} />
      </Button>
    </div>
  );
};