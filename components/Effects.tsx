"use client";

import { useEffect } from "react";

const CARD = ".pcard, .post, .feature-card";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/+";

/** Global delegated interaction effects: card tilt + spotlight, text scramble, click ripples. */
export default function Effects() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current: HTMLElement | null = null;
    const reset = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.classList.remove("is-hot");
    };

    const move = (e: PointerEvent) => {
      if (!fine || reduce) return;
      const card = (e.target as HTMLElement).closest<HTMLElement>(CARD);
      if (current && current !== card) reset(current);
      current = card;
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
      card.style.setProperty("--ry", `${(px - 0.5) * 12}deg`);
      card.style.setProperty("--rx", `${-(py - 0.5) * 12}deg`);
      card.classList.add("is-hot");
    };

    const running = new WeakSet<HTMLElement>();
    const over = (e: PointerEvent) => {
      if (reduce) return;
      const t = e.target as HTMLElement;
      const host = t.closest<HTMLElement>("[data-scramble], a, button");
      if (!host) return;
      const el = host.matches("[data-scramble]") ? host : host.querySelector<HTMLElement>("[data-scramble]");
      if (!el || running.has(el)) return;
      const orig = el.dataset.orig ?? (el.dataset.orig = el.textContent || "");
      running.add(el);
      let n = 0;
      const id = setInterval(() => {
        n += 0.6;
        el.textContent = orig
          .split("")
          .map((c, i) => (c === " " || i < n ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join("");
        if (n >= orig.length) {
          clearInterval(id);
          el.textContent = orig;
          running.delete(el);
        }
      }, 28);
    };

    const down = (e: PointerEvent) => {
      if (reduce) return;
      const d = document.createElement("span");
      d.className = "ripple";
      d.style.left = e.clientX + "px";
      d.style.top = e.clientY + "px";
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 800);
    };

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerdown", down);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerdown", down);
    };
  }, []);
  return null;
}
