import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  hover?: boolean;
};

export function Card({ className, children, hover = false, ...props }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-sm",
        hover && "card-lift",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
