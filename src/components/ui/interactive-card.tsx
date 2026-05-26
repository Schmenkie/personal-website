"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
}

export function InteractiveCard({
  children,
  className,
  glareColor = "rgba(139, 92, 246, 0.15)",
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={cn("relative glow-purple-hover", className)}
    >
      {children}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(600px circle at ${mouseX.get() * 100}% ${mouseY.get() * 100}%, ${glareColor}, transparent 40%)`,
          }}
        />
      )}
    </motion.div>
  );
}
