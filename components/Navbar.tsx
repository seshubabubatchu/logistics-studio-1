"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { services } from "@/lib/data";
import { Button } from "./ui";

export function Logo() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <Link href="/" className="logo" aria-label="Logistics Studio home">
      <img src={`${basePath}/logo.png`} alt="Logistics Studio Logo" style={{ height: "40px", width: "auto" }} />
    </Link>
  );
}

const links = [
  { href: "/services", label: "Services" },
  { href: "/about-us", label: "About" },
  { href: "/resources", label: "Resources" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const isSolid = solid && !open;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  useEffect(() => {
    setOpen(false);
    setSolid(false);
  }, [pathname]);
  useEffect(() => {
    document.body.classList.toggle("locked", open);
    return () => document.body.classList.remove("locked");
  }, [open]);

  return (
    <>
      <motion.nav
        className={`nav${isSolid ? " solid" : ""}`}
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={open ? { background: "transparent", backdropFilter: "none", borderColor: "transparent" } : undefined}
      >
        <div className="container nav-inner">
          <Logo />
          <div className="nav-links">
            {links.map((l) => (
              <Link key={l.href} href={l.href} data-scramble className={`link${pathname.startsWith(l.href) ? " active" : ""}`}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="nav-right">
            <Button href="/contact">Get in touch</Button>
            <button className={`burger${open ? " open" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
              <i />
              <i />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: "circle(0% at calc(100% - 60px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 60px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 60px) 40px)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <div className="menu-grid">
              <div className="menu-main">
                {[
                  ["/", "Home"],
                  ["/services", "Services"],
                  ["/about-us", "About us"],
                  ["/resources", "Resources"],
                  ["/contact", "Get in touch"],
                ].map(([h, l], i) => (
                  <motion.div key={h} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                    <Link href={h}>
                      <sup>0{i + 1}</sup>
                      {l}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div className="menu-side" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <h4>What we do</h4>
                {services.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`}>
                    <span data-scramble>{s.title}</span>
                    <span>{s.index}</span>
                  </Link>
                ))}
              </motion.div>
            </div>
            <div className="menu-foot">
              <span>info@logisticsstudio.com</span>
              <span>Bentonville, AR</span>
              <span>+1 (216) 293 7917</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
