"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
  className?: string;
}

export function ParticleField({
  count = 80,
  color = "139, 92, 246",
  className,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      size: Math.random() * 2 + 0.5,
    }));

    const draw = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = cw;
        if (p.x > cw) p.x = 0;
        if (p.y < 0) p.y = ch;
        if (p.y > ch) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute inset-0 pointer-events-none"}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
