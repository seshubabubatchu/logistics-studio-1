"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Dust from "./Dust";

/** Spring-smoothed skew driven by scroll velocity */
function useVelocitySkew(max = 8) {
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  return useTransform(v, [-3000, 3000], [-max, max]);
}

export const EASE = [0.16, 1, 0.3, 1] as const;

/** media query hook */
export function useMedia(q: string, initial = false) {
  const [m, setM] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const f = () => setM(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, [q]);
  return m;
}

/** Fade + rise on scroll */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Heading with per-word masked slide-up */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const show = immediate || inView;
  const words = text.split(" ");
  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="mask" aria-hidden>
          <motion.span
            initial={{ y: "110%" }}
            animate={show ? { y: 0 } : {}}
            transition={{ duration: 0.65, delay: delay + i * 0.03, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Words that light up as you scroll */
function Word({ w, p, range }: { w: string; p: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(p, range, [0.14, 1]);
  return (
    <motion.span className="w" style={{ opacity }}>
      {w}
    </motion.span>
  );
}
export function ScrollWords({ text, className = "statement" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

/** Magnetic wrapper */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16 });
  const sy = useSpring(y, { stiffness: 200, damping: 16 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Button({
  href,
  children,
  ghost,
}: {
  href: string;
  children: ReactNode;
  ghost?: boolean;
}) {
  return (
    <Magnetic strength={0.2}>
      <Link href={href} className={`btn${ghost ? " ghost" : ""}`}>
        <span data-scramble>{children}</span>
        <ArrowUpRight className="arr" size={18} />
      </Link>
    </Magnetic>
  );
}

/** Parallax wrapper: moves children by +/- range px relative to scroll */
export function Parallax({
  children,
  range = 80,
  className,
}: {
  children: ReactNode;
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  const skewX = useVelocitySkew(10);
  return (
    <div className="marquee" aria-hidden>
      <motion.div style={{ skewX }}>
        <div className="marquee-track">
          {row.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
          {row.map((t, i) => (
            <span key={"b" + i}>{t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/** Big words drifting horizontally with scroll */
export function ParallaxBand({ a, b }: { a: string; b: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-45%", "0%"]);
  const skew = useVelocitySkew(6);
  return (
    <div ref={ref} className="pband" aria-hidden>
      <motion.div className="pband-row" style={{ x: x1, skewX: skew }}>
        <span>{a}</span>
        <span className="outline-text">{a}</span>
        <span>{a}</span>
      </motion.div>
      <motion.div className="pband-row" style={{ x: x2, skewX: skew }}>
        <span className="outline-text">{b}</span>
        <span className="accent">{b}</span>
        <span className="outline-text">{b}</span>
      </motion.div>
    </div>
  );
}

export function CTA({
  title,
  text,
  button,
  href = "/contact",
}: {
  title: string;
  text: string;
  button: string;
  href?: string;
}) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <div className="cta">
            <SplitHeading text={title} className="h-lg" />
            <p>{text}</p>
            <Button href={href}>{button}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PageHero({
  kicker,
  title,
  text,
  hue = "#5B8CFF",
}: {
  kicker: string;
  title: string;
  text?: string;
  hue?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const o = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <header ref={ref} className="phero" style={{ ["--hue" as string]: hue }}>
      <motion.div className="phero-glow" style={{ y }} />
      <Dust hue={hue} />
      <motion.div className="container" style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]), opacity: o }}>
        <div className="crumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: "var(--text)" }}>{kicker}</span>
        </div>
        <SplitHeading as="h1" text={title} className="h-xl" immediate delay={0.05} />
        {text && (
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            {text}
          </motion.p>
        )}
      </motion.div>
    </header>
  );
}
