"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { services } from "@/data/services";
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

const EDI_COL1_GROUPS = [
  {
    id: "col1-plan",
    phase: "PLAN",
    items: [{ num: "01", title: "EDI Strategy & Assessment", anchor: "strategy-assessment" }],
  },
  {
    id: "col1-connect",
    phase: "CONNECT",
    items: [
      { num: "02", title: "Trading Partner Onboarding", anchor: "onboarding" },
      { num: "04", title: "EDI Integration with ERP, WMS & TMS", anchor: "integration" },
      { num: "05", title: "Communication & Connectivity", anchor: "connectivity" },
    ],
  },
  {
    id: "col1-prove",
    phase: "PROVE",
    items: [{ num: "03", title: "EDI Mapping & Translation", anchor: "mapping" }],
  },
];

const EDI_COL2_GROUPS = [
  {
    id: "col2-prove",
    phase: "PROVE",
    items: [{ num: "06", title: "Testing, Certification & Compliance", anchor: "testing-compliance" }],
  },
  {
    id: "col2-run",
    phase: "RUN",
    items: [
      { num: "07", title: "EDI Support & Monitoring", anchor: "support-monitoring" },
      { num: "08", title: "Managed EDI Services", anchor: "managed-edi" },
    ],
  },
  {
    id: "col2-evolve",
    phase: "EVOLVE",
    items: [{ num: "09", title: "EDI Migration & Modernization", anchor: "migration" }],
  },
  {
    id: "col2-platforms",
    phase: "PLATFORMS & STANDARDS",
    items: [
      { num: "10", title: "Platforms We Work With", anchor: "platforms" },
      { num: "—", title: "Standards & Documents", anchor: "standards" },
    ],
  },
];

// Unified distinct phases for mobile accordion without duplicate keys
const ALL_EDI_GROUPS = [
  {
    id: "mob-plan",
    phase: "PLAN",
    items: [{ num: "01", title: "EDI Strategy & Assessment", anchor: "strategy-assessment" }],
  },
  {
    id: "mob-connect",
    phase: "CONNECT",
    items: [
      { num: "02", title: "Trading Partner Onboarding", anchor: "onboarding" },
      { num: "04", title: "EDI Integration with ERP, WMS & TMS", anchor: "integration" },
      { num: "05", title: "Communication & Connectivity", anchor: "connectivity" },
    ],
  },
  {
    id: "mob-prove",
    phase: "PROVE",
    items: [
      { num: "03", title: "EDI Mapping & Translation", anchor: "mapping" },
      { num: "06", title: "Testing, Certification & Compliance", anchor: "testing-compliance" },
    ],
  },
  {
    id: "mob-run",
    phase: "RUN",
    items: [
      { num: "07", title: "EDI Support & Monitoring", anchor: "support-monitoring" },
      { num: "08", title: "Managed EDI Services", anchor: "managed-edi" },
    ],
  },
  {
    id: "mob-evolve",
    phase: "EVOLVE",
    items: [{ num: "09", title: "EDI Migration & Modernization", anchor: "migration" }],
  },
  {
    id: "mob-platforms",
    phase: "PLATFORMS & STANDARDS",
    items: [
      { num: "10", title: "Platforms We Work With", anchor: "platforms" },
      { num: "—", title: "Standards & Documents", anchor: "standards" },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [ediSubOpen, setEdiSubOpen] = useState(false);

  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const ediWrapperRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

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
    setEdiSubOpen(false);
  }, [pathname]);

  // Lock body scroll on menu open; restored on close
  useEffect(() => {
    document.body.classList.toggle("locked", open);
    return () => {
      document.body.classList.remove("locked");
    };
  }, [open]);

  const handleEdiMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setEdiSubOpen(true);
  };

  const handleEdiMouseLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setEdiSubOpen(false);
    }, 150);
  };

  const handleOtherServiceMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setEdiSubOpen(false);
  };

  const handleEdiFocus = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setEdiSubOpen(true);
  };

  const handleEdiBlur = (e: React.FocusEvent) => {
    if (!ediWrapperRef.current?.contains(e.relatedTarget as Node)) {
      setEdiSubOpen(false);
    }
  };

  // Keyboard navigation inside the popup panel
  const handlePopupKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setEdiSubOpen(false);
      ediWrapperRef.current?.querySelector("button")?.focus();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const focusable = popupRef.current?.querySelectorAll<HTMLAnchorElement>("a");
      if (!focusable || focusable.length === 0) return;
      const list = Array.from(focusable);
      const currentIndex = list.indexOf(document.activeElement as HTMLAnchorElement);
      let nextIndex = 0;
      if (e.key === "ArrowDown") {
        nextIndex = currentIndex < list.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : list.length - 1;
      }
      list[nextIndex]?.focus();
    }
  };

  // Global escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (ediSubOpen) {
          setEdiSubOpen(false);
        } else if (open) {
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, ediSubOpen]);

  const closeMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(false);
    setEdiSubOpen(false);
  };

  const otherServices = services.slice(1);
  const ediService = services[0];

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
            {/* Exactly 2 columns with natural cohesive spacing like before */}
            <div className="menu-grid">
              {/* Left Column: Big Nav Links (never wraps, 5 items fit comfortably in 100dvh) */}
              <div className="menu-main">
                {[
                  ["/", "Home"],
                  ["/services", "Services"],
                  ["/about-us", "About us"],
                  ["/resources", "Resources"],
                  ["/contact", "Get in touch"],
                ].map(([h, l], i) => (
                  <motion.div
                    key={h}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href={h} onClick={closeMenu}>
                      <sup>0{i + 1}</sup>
                      {l}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Right Column: "WHAT WE DO" */}
              <motion.div className="menu-side" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                <h4>What we do</h4>
                <div className="menu-services-list">
                  {/* EDI Services Wrapper (row + popup near parent) */}
                  <div
                    ref={ediWrapperRef}
                    className="edi-menu-wrapper"
                    onMouseEnter={handleEdiMouseEnter}
                    onMouseLeave={handleEdiMouseLeave}
                    onFocus={handleEdiFocus}
                    onBlur={handleEdiBlur}
                  >
                    <div className={`menu-service-item edi-row${ediSubOpen ? " is-active" : ""}`}>
                      <Link
                        href={`/${ediService.slug}`}
                        onClick={closeMenu}
                        className="service-title-link"
                      >
                        <span>{ediService.title}</span>
                        <span className="edi-badge">10 areas</span>
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEdiSubOpen(!ediSubOpen);
                        }}
                        aria-expanded={ediSubOpen}
                        aria-controls="edi-subpanel-content"
                        aria-label="Toggle EDI sub-areas"
                        className="edi-chevron-btn"
                      >
                        <span className="service-idx">01</span>
                        <ChevronDown
                          size={16}
                          className="chevron-icon"
                          style={{
                            transform: ediSubOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                          }}
                        />
                      </button>
                    </div>

                    {/* Desktop Popup Near Parent (anchored directly under EDI Services row) */}
                    <AnimatePresence>
                      {ediSubOpen && (
                        <motion.div
                          ref={popupRef}
                          id="edi-subpanel-content"
                          className="desktop-edi-popup"
                          initial={{
                            opacity: 0,
                            y: -8,
                            scale: 0.98,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: -6,
                            scale: 0.98,
                          }}
                          transition={{
                            duration: 0.18,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          onKeyDown={handlePopupKeyDown}
                          role="region"
                          aria-label="EDI Sub-Areas (01–10)"
                        >
                          {/* Header */}
                          <div className="flyout-header">
                            <span className="flyout-badge">EDI SUB-AREAS (01–10)</span>
                            <Link href="/edi-services" onClick={closeMenu} className="flyout-all-link">
                              All EDI →
                            </Link>
                          </div>

                          {/* 2-Column Balanced Grid */}
                          <div className="flyout-columns">
                            {/* Column 1: PLAN + CONNECT + PROVE (01–05) */}
                            <div className="flyout-col">
                              {EDI_COL1_GROUPS.map((grp) => (
                                <div key={grp.id} className="flyout-group">
                                  <div className="flyout-phase-label">{grp.phase}</div>
                                  <div className="flyout-items">
                                    {grp.items.map((it) => (
                                      <Link
                                        key={it.anchor}
                                        href={`/edi-services#${it.anchor}`}
                                        onClick={closeMenu}
                                        className="flyout-item"
                                        title={it.title}
                                      >
                                        <span className="item-num">{it.num}</span>
                                        <span className="item-title">{it.title}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Column 2: PROVE + RUN + EVOLVE + PLATFORMS & STANDARDS (06–10) */}
                            <div className="flyout-col">
                              {EDI_COL2_GROUPS.map((grp) => (
                                <div key={grp.id} className="flyout-group">
                                  <div className="flyout-phase-label">{grp.phase}</div>
                                  <div className="flyout-items">
                                    {grp.items.map((it) => (
                                      <Link
                                        key={it.anchor}
                                        href={`/edi-services#${it.anchor}`}
                                        onClick={closeMenu}
                                        className="flyout-item"
                                        title={it.title}
                                      >
                                        <span className="item-num">{it.num}</span>
                                        <span className="item-title">{it.title}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Mobile Inline Accordion (<1024px only) */}
                    {ediSubOpen && (
                      <div className="mobile-edi-accordion">
                        {ALL_EDI_GROUPS.map((grp) => (
                          <div key={grp.id} className="mobile-group">
                            <div className="mobile-phase-label">{grp.phase}</div>
                            <div className="mobile-items">
                              {grp.items.map((it) => (
                                <Link
                                  key={it.anchor}
                                  href={`/edi-services#${it.anchor}`}
                                  onClick={closeMenu}
                                  className="mobile-item"
                                >
                                  <span className="item-num">{it.num}</span>
                                  <span>{it.title}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* The other 5 service rows (hovering any of them closes the EDI popup immediately) */}
                  {otherServices.map((s) => (
                    <div
                      key={s.slug}
                      className="menu-service-item other-service"
                      onMouseEnter={handleOtherServiceMouseEnter}
                    >
                      <Link href={`/${s.slug}`} onClick={closeMenu} className="service-title-link">
                        <span>{s.title}</span>
                      </Link>
                      <span className="service-idx">{s.index}</span>
                    </div>
                  ))}
                </div>
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
