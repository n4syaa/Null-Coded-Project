"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "rgba(14, 165, 233,",
      "rgba(125, 211, 252,",
      "rgba(56, 189, 248,",
      "rgba(186, 230, 253,",
      "rgba(255, 255, 255,",
    ];

    const createParticle = (): Particle => {
      const maxLife = 120 + Math.random() * 180;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(0.3 + Math.random() * 0.7),
        size: 0.5 + Math.random() * 2,
        opacity: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife,
      };
    };

    for (let i = 0; i < 30; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    let frameCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      if (frameCount % 3 === 0 && particlesRef.current.length < 60) {
        particlesRef.current.push(createParticle());
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.1) {
          p.opacity = lifeRatio * 10;
        } else if (lifeRatio > 0.8) {
          p.opacity = (1 - lifeRatio) * 5;
        } else {
          p.opacity = 0.6 + Math.random() * 0.4;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();

        if (p.size > 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity * 0.2})`;
          ctx.fill();
        }

        return p.life < p.maxLife && p.y > -20;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
