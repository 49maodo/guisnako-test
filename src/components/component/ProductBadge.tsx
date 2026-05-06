import { cn } from "@/lib/utils";

interface ProductBadgeProps {
  label: string;
  variant?: "new" | "sale" | "limited" | "default";
  className?: string;
}

const variantStyles: Record<string, string> = {
  new: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  sale: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  limited: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  default: "bg-secondary text-secondary-foreground",
};

export const ProductBadge = ({ label, variant = "default", className }: ProductBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium tracking-wide uppercase",
      variantStyles[variant],
      className
    )}
  >
    {label}
  </span>
);