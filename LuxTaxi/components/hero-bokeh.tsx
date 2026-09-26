"use client";

import { useEffect, useRef } from "react";

type Orb = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
  twinkleSpeed: number;
  hue: number;
};

// Soft, out-of-focus city lights drifting slowly upward — the same warm
// amber as the street lamps in the hero photo, so they read as part of the
// scene rather than as a generic particle effect.
export function HeroBokeh({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let orbs: Orb[] = [];

    const spawn = (anywhere: boolean): Orb => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : height + 20,
      // Mostly small, distant points with the odd large, close blur.
      r: 1.5 + Math.pow(Math.random(), 2.4) * 16,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(0.04 + Math.random() * 0.16),
      alpha: 0.14 + Math.random() * 0.36,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.4 + Math.random() * 0.8,
      hue: 30 + Math.random() * 14,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(40, width / 34));
      orbs = Array.from({ length: count }, () => spawn(true));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const o of orbs) {
        const a = o.alpha * (0.6 + 0.4 * Math.sin(o.phase + (time / 1000) * o.twinkleSpeed));
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue}, 90%, 80%, ${a})`);
        g.addColorStop(0.45, `hsla(${o.hue}, 85%, 65%, ${a * 0.4})`);
        g.addColorStop(1, `hsla(${o.hue}, 80%, 55%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let running = false;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(now - last, 50) / 16.67;
      last = now;
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        o.x += o.vx * dt;
        o.y += o.vy * dt;
        if (o.y < -o.r * 2 || o.x < -40 || o.x > width + 40) orbs[i] = spawn(false);
      }
      draw(now);
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw(0);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    // Only animate while the hero is on screen.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibility.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
