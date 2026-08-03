import { Badge } from "@/components/ui/Badge";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import type { Locale, SparePart } from "@/lib/types";
import { cn, t } from "@/lib/utils";

interface PartCardProps {
  part: SparePart;
  locale: Locale;
  selected?: boolean;
  onSelect?: (part: SparePart) => void;
  categoryLabel: string;
}

export function PartCard({
  part,
  locale,
  selected,
  onSelect,
  categoryLabel,
}: PartCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(part)}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-xl border bg-surface text-left shadow-sm transition-all",
        selected
          ? "border-accent ring-2 ring-accent/25 shadow-md"
          : "border-border hover:border-anthracite-300 hover:shadow-md"
      )}
    >
      <div className="relative aspect-[5/3] w-full">
        <ProductPlaceholder
          title={t(part.name, locale)}
          subtitle={part.partNumber}
          hint={part.imageHint}
          variant="part"
          className="rounded-none"
          dark={selected}
        />
        {part.level ? (
          <div className="absolute left-2 top-2">
            <Badge tone="accent">L{part.level}</Badge>
          </div>
        ) : null}
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-sm font-semibold text-anthracite-900">
          {t(part.name, locale)}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-anthracite-400">
            {part.partNumber}
          </span>
          <Badge tone="muted" className="shrink-0">
            {categoryLabel}
          </Badge>
        </div>
      </div>
    </button>
  );
}
