"use client";

import { useEffect, useRef } from "react";

/** Ambient floating dust that is repelled by the cursor and links up when close. */
export default function Dust({ hue = "#5B8CFF" }: { hue?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = 0,
      h = 0,
      raf = 0,
      visible = true;
    let dots: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const m = { x: -999, y: -999 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 700 ? 34 : 80;
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.35 - 0.05,
        r: Math.random() * 1.8 + 0.6,
      }));
    };
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        if (!reduce) {
          const dx = d.x - m.x,
            dy = d.y - m.y,
            dist = Math.hypot(dx, dy);
          if (dist < 160) {
            const f = (1 - dist / 160) * 2.2;
            d.x += (dx / dist) * f;
            d.y += (dy / dist) * f;
          }
          d.x += d.vx;
          d.y += d.vy;
          if (d.y < -10) d.y = h + 10;
          if (d.x < -10) d.x = w + 10;
          if (d.x > w + 10) d.x = -10;
        }
        ctx.fillStyle = "rgba(220,230,255,.55)";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 7);
        ctx.fill();
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++)
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i],
            b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.strokeStyle = hue + Math.floor((1 - dist / 100) * 70).toString(16).padStart(2, "0");
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
    };
    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    build();
    draw();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", move);
    };
  }, [hue]);

  return <canvas ref={ref} className="dust" aria-hidden />;
}
