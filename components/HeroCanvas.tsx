"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; z: number; vx: number; vy: number };

/** Animated logistics network: nodes, routes and travelling packets with mouse parallax. */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0,
      h = 0,
      raf = 0,
      visible = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    const packets: { e: number; t: number; s: number; dir: 1 | -1 }[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 700 ? 38 : w < 1100 ? 54 : 78;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.3 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
      edges = [];
      const maxD = Math.min(w, h) * 0.28;
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < maxD && edges.length < count * 2.2) edges.push([i, j]);
        }
      packets.length = 0;
      for (let i = 0; i < Math.min(26, edges.length); i++)
        packets.push({ e: (Math.random() * edges.length) | 0, t: Math.random(), s: 0.002 + Math.random() * 0.004, dir: Math.random() > 0.5 ? 1 : -1 });
    };

    const pos = (n: Node) => ({
      x: n.x + mouse.x * 40 * n.z,
      y: n.y + mouse.y * 30 * n.z,
    });

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, w, h);

      // soft grid
      ctx.strokeStyle = "rgba(150,180,255,0.045)";
      ctx.lineWidth = 1;
      const g = 80;
      const ox = (mouse.x * 14) % g,
        oy = (mouse.y * 10) % g;
      ctx.beginPath();
      for (let x = ox; x < w; x += g) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = oy; y < h; y += g) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      if (!reduce)
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }

      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const p = pos(nodes[a]),
          q = pos(nodes[b]);
        ctx.strokeStyle = "rgba(120,160,255,0.16)";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
      for (const n of nodes) {
        const p = pos(n);
        ctx.fillStyle = `rgba(190,210,255,${0.25 + n.z * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 + n.z * 1.4, 0, 7);
        ctx.fill();
      }
      for (const k of packets) {
        k.t += k.s * k.dir;
        if (k.t > 1 || k.t < 0) {
          k.e = (Math.random() * edges.length) | 0;
          k.t = k.dir === 1 ? 0 : 1;
        }
        const [a, b] = edges[k.e] || [0, 0];
        const p = pos(nodes[a]),
          q = pos(nodes[b]);
        const x = p.x + (q.x - p.x) * k.t,
          y = p.y + (q.y - p.y) * k.t;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 14);
        grd.addColorStop(0, "rgba(198,255,61,0.9)");
        grd.addColorStop(1, "rgba(198,255,61,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, 7);
        ctx.fill();
        ctx.fillStyle = "#c6ff3d";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, 7);
        ctx.fill();
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    build();
    draw();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden />;
}
