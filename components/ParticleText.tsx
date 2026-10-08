"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; hx: number; hy: number; vx: number; vy: number; c: number };

/**
 * Renders text as thousands of particles. The cursor repels and swirls them (distortion),
 * clicking bursts them apart, and a spring pulls them back home. Idle / touch devices get
 * an autopilot "ghost cursor" so the effect still plays.
 */
export default function ParticleText({
  lines,
  colors,
  height = "clamp(240px, 50svh, 560px)",
  align = "left",
  delay = 0,
  radius = 130,
  weight = 600,
  density = 42,
  hot = "#f2652f",
}: {
  lines: string[];
  colors: string[];
  height?: string;
  align?: "left" | "center";
  delay?: number;
  radius?: number;
  weight?: number;
  density?: number;
  hot?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current!;
    const canvas = cv.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      dpr = 1,
      step = 4,
      raf = 0,
      visible = true,
      dead = false,
      parts: P[] = [],
      builtW = 0;
    const start = performance.now() + delay;
    const mouse = { x: -9999, y: -9999 };
    let lastMove = 0;
    let burst = 0;
    const R = radius;

    const build = async () => {
      const fam = getComputedStyle(wrapEl).getPropertyValue("--display") || "sans-serif";
      try {
        await document.fonts.load(`${weight} 100px ${fam}`);
        await document.fonts.ready;
      } catch {}
      if (dead) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrapEl.clientWidth;
      h = wrapEl.clientHeight;
      builtW = w;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      const setFont = (fs: number) => {
        o.font = `${weight} ${fs}px ${fam}`;
        if ("letterSpacing" in o) (o as unknown as { letterSpacing: string }).letterSpacing = `${-0.04 * fs}px`;
      };
      setFont(100);
      const widest = Math.max(...lines.map((l) => o.measureText(l).width));
      const lh = 0.92;
      const fs = Math.min((100 * w * 0.985) / widest, h / (lines.length * lh));
      setFont(fs);
      o.textBaseline = "alphabetic";
      o.textAlign = align;
      step = Math.max(3, Math.round(fs / density));
      const block = lines.length * fs * lh;
      const top = (h - block) / 2;
      parts = [];
      lines.forEach((line, i) => {
        o.clearRect(0, 0, w, h);
        o.fillStyle = "#fff";
        const y = top + (i + 0.5) * fs * lh + fs * 0.33;
        o.fillText(line, align === "center" ? w / 2 : 0, y);
        const d = o.getImageData(0, 0, w, h).data;
        for (let py = 0; py < h; py += step)
          for (let px = 0; px < w; px += step) {
            if (d[(py * w + px) * 4 + 3] > 128)
              parts.push({
                x: Math.random() * w,
                y: Math.random() * h,
                hx: px,
                hy: py,
                vx: 0,
                vy: 0,
                c: i,
              });
          }
      });
      if (reduce) parts.forEach((p) => ((p.x = p.hx), (p.y = p.hy)));
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || !parts.length) return;
      const active = now >= start;
      // idle autopilot cursor
      if (now - lastMove > 2500 && active && !reduce) {
        const t = now / 1000;
        mouse.x = w * (0.5 + 0.38 * Math.sin(t * 0.7));
        mouse.y = h * (0.5 + 0.3 * Math.sin(t * 1.1 + 1));
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const size = step * 0.8;
      const R2 = R * R;
      const k = active ? (now - start < 1400 ? 0.04 : 0.075) : 0;
      let last = -1;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (!reduce) {
          if (active) {
            p.vx += (p.hx - p.x) * k;
            p.vy += (p.hy - p.y) * k;
          } else {
            p.vx += (Math.random() - 0.5) * 0.08;
            p.vy += (Math.random() - 0.5) * 0.08;
          }
          const dx = p.x - mouse.x,
            dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const rr = burst > 0 ? R2 * 3 : R2;
          if (d2 < rr && active) {
            const d = Math.sqrt(d2) || 1;
            const f = Math.pow(1 - d / Math.sqrt(rr), 2) * (burst > 0 ? 14 : 2.4);
            p.vx += (dx / d) * f - (dy / d) * f * 0.55;
            p.vy += (dy / d) * f + (dx / d) * f * 0.55;
          }
          p.vx *= 0.86;
          p.vy *= 0.86;
          p.x += p.vx;
          p.y += p.vy;
        }
        const disp = Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy);
        const ci = disp > 14 ? -1 : p.c;
        if (ci !== last) {
          ctx.fillStyle = ci === -1 ? hot : colors[p.c];
          last = ci;
        }
        ctx.fillRect(p.x, p.y, size, size);
      }
      if (burst > 0) burst--;
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      lastMove = performance.now();
    };
    const down = (e: PointerEvent) => {
      move(e);
      const r = canvas.getBoundingClientRect();
      if (e.clientY >= r.top && e.clientY <= r.bottom) burst = 6;
    };
    const leave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    let t: ReturnType<typeof setTimeout>;
    const resize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (wrapEl.clientWidth !== builtW) build();
      }, 200);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    build().then(() => {
      if (!dead) raf = requestAnimationFrame(frame);
    });
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    document.addEventListener("pointerleave", leave);
    window.addEventListener("resize", resize);
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      clearTimeout(t);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", resize);
    };
  }, [lines, colors, align, delay, radius, weight, density, hot]);

  return (
    <div ref={wrap} className="ptext" style={{ height }} aria-hidden>
      <canvas ref={cv} />
    </div>
  );
}
