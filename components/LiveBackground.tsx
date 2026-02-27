'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

export default function LiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];

    const STAR_COLORS = [
      'rgba(255,255,255,',
      'rgba(200,180,255,',
      'rgba(180,130,255,',
    ];

    const initStars = () => {
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 4000);
      for (let i = 0; i < count; i++) {
        const colorBase = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.7 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: colorBase,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    resize();
    window.addEventListener('resize', resize);

    const TWINKLE_FRAME_MULTIPLIER = 60; // converts per-frame twinkle speed to animation cycles
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle purple nebula glow
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.4, 0,
        canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.5
      );
      gradient.addColorStop(0, 'rgba(109,40,217,0.06)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.75, canvas.height * 0.6, 0,
        canvas.width * 0.75, canvas.height * 0.6, canvas.width * 0.4
      );
      gradient2.addColorStop(0, 'rgba(124,58,237,0.04)');
      gradient2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      for (const star of stars) {
        const twinkle = Math.sin(t * star.twinkleSpeed * TWINKLE_FRAME_MULTIPLIER + star.twinkleOffset);
        const alpha = star.opacity + twinkle * 0.3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${Math.max(0.05, Math.min(1, alpha))})`;
        ctx.fill();
      }

      t++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
