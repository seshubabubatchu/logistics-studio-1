"use client";

import { useEffect } from "react";

const CARD = ".pcard, .post, .feature-card";

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



    document.addEventListener("pointermove", move);
    return () => {
      document.removeEventListener("pointermove", move);
    };
  }, []);
  return null;
}
