"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

export function GradientText({
  children,
  className,
  from = "from-purple",
  via = "via-cyan",
  to = "to-pink",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent animate-gradient",
        from,
        via,
        to,
        className
      )}
    >
      {children}
    </span>
  );
}
