"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./Navbar";
import Effects from "./Effects";

function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 9 + 3;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(onDone, 350);
      }
      setN(Math.floor(v));
    }, 70);
    return () => clearInterval(id);
  }, [onDone]);
  return (
    <motion.div
      className="preloader"
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="pl-top">
        <span>Logistics Studio</span>
        <span>Innovate / Automate / Predict</span>
      </div>
      <div>
        <div className="pl-count">{n}</div>
        <div className="pl-bar">
          <motion.i animate={{ scaleX: n / 100 }} transition={{ ease: "linear", duration: 0.1 }} />
        </div>
      </div>
    </motion.div>
  );
}

function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      el.current?.classList.toggle("hover", !!t.closest("a, button, .pcard, .post, .feature-card"));
    };
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (el.current) el.current.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    loop();
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={el} className="cursor" aria-hidden />;
}

export default function Shell({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);
  const { scrollYProgress } = useScroll();
  const prog = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    if (sessionStorage.getItem("ls-loaded")) setLoading(false);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("locked", loading);
  }, [loading]);

  useEffect(() => {
    const l = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.current = l;
    let raf = 0;
    const loop = (t: number) => {
      l.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
    };
  }, []);

  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <Preloader
            onDone={() => {
              sessionStorage.setItem("ls-loaded", "1");
              setLoading(false);
            }}
          />
        )}
      </AnimatePresence>
      <Cursor />
      <Effects />
      <motion.div className="progress" style={{ scaleX: prog }} />
      <Navbar />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
    </>
  );
}
