import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/Types/Product";

interface VariantSelectorProps {
  label: string;
  variants: ProductVariant[];
  selected: string;
  onChange: (value: string) => void;
  type?: "button" | "color";
}

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
  black: "bg-gray-900",
  white: "bg-white border border-border",
  gray: "bg-gray-400",
  yellow: "bg-yellow-400",
  pink: "bg-pink-400",
  purple: "bg-purple-500",
};

export const VariantSelector = ({
  label,
  variants,
  selected,
  onChange,
  type = "button",
}: VariantSelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {selected && (
          <span className="text-sm text-muted-foreground capitalize">{selected}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const isSelected = selected === v.value;
          const isUnavailable = v.available === false;

          if (type === "color") {
            return (
              <button
                key={v.value}
                title={v.label}
                disabled={isUnavailable}
                onClick={() => onChange(v.value)}
                className={cn(
                  "w-8 h-8 rounded-full transition-all ring-offset-background",
                  COLOR_MAP[v.value] ?? "bg-gray-300",
                  isSelected && "ring-2 ring-ring ring-offset-2",
                  isUnavailable && "opacity-30 cursor-not-allowed line-through"
                )}
              />
            );
          }

          return (
            <button
              key={v.value}
              disabled={isUnavailable}
              onClick={() => onChange(v.value)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md border transition-all",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary",
                isUnavailable && "opacity-30 cursor-not-allowed line-through"
              )}
            >
              {v.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};