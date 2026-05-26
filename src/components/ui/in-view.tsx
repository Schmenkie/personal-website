"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variant } from "framer-motion";
import { cn } from "@/lib/utils";

interface InViewProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const variants: Record<string, { hidden: Variant; visible: Variant }> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function InView({
  children,
  className,
  variant = "slide-up",
  delay = 0,
  duration = 0.6,
  once = true,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={v}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
