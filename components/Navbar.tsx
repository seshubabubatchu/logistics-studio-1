"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
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

const EDI_MENU_GROUPS = [
  {
    phase: "PLAN",
    items: [{ num: "01", title: "EDI Strategy & Assessment", anchor: "strategy-assessment" }],
  },
  {
    phase: "CONNECT",
    items: [
      { num: "02", title: "Trading Partner Onboarding", anchor: "onboarding" },
      { num: "04", title: "EDI Integration with ERP, WMS & TMS", anchor: "integration" },
      { num: "05", title: "Communication & Connectivity", anchor: "connectivity" },
    ],
  },
  {
    phase: "PROVE",
    items: [
      { num: "03", title: "EDI Mapping & Translation", anchor: "mapping" },
      { num: "06", title: "Testing, Certification & Compliance", anchor: "testing-compliance" },
    ],
  },
  {
    phase: "RUN",
    items: [
      { num: "07", title: "EDI Support & Monitoring", anchor: "support-monitoring" },
      { num: "08", title: "Managed EDI Services", anchor: "managed-edi" },
    ],
  },
  {
    phase: "EVOLVE",
    items: [{ num: "09", title: "EDI Migration & Modernization", anchor: "migration" }],
  },
  {
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

  useEffect(() => {
    document.body.classList.toggle("locked", open);
    return () => document.body.classList.remove("locked");
  }, [open]);

  // Keyboard navigation (Esc closes menu or subpanel)
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
    setOpen(false);
    setEdiSubOpen(false);
  };

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
            <div className="menu-grid" style={{ gridTemplateColumns: ediSubOpen ? "1fr 1fr 1fr" : undefined }}>
              {/* Left Column: Main Pages */}
              <div className="menu-main">
                {[
                  ["/", "Home"],
                  ["/services", "Services"],
                  ["/about-us", "About us"],
                  ["/resources", "Resources"],
                  ["/contact", "Get in touch"],
                ].map(([h, l], i) => (
                  <motion.div key={h} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                    <Link href={h} onClick={closeMenu}>
                      <sup>0{i + 1}</sup>
                      {l}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Middle/Right Column: WHAT WE DO (6 Services) */}
              <motion.div className="menu-side" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <h4>What we do</h4>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {services.map((s) => {
                    const isEdi = s.slug === "edi-services";
                    return (
                      <div key={s.slug} style={{ borderBottom: "1px solid var(--line)" }}>
                        <div
                          onMouseEnter={() => isEdi && setEdiSubOpen(true)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "14px 0",
                            gap: 12,
                          }}
                        >
                          <Link
                            href={`/${s.slug}`}
                            onClick={closeMenu}
                            style={{
                              border: "none",
                              padding: 0,
                              fontSize: "1.1rem",
                              fontWeight: isEdi ? 600 : 400,
                              color: isEdi && ediSubOpen ? "var(--brand-orange)" : "inherit",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 10,
                              flex: 1,
                            }}
                          >
                            <span>{s.title}</span>
                            {isEdi && (
                              <span
                                style={{
                                  fontFamily: "var(--mono)",
                                  fontSize: "0.68rem",
                                  fontWeight: 600,
                                  background: "rgba(242, 101, 47, 0.12)",
                                  color: "var(--brand-orange)",
                                  border: "1px solid rgba(242, 101, 47, 0.3)",
                                  padding: "2px 8px",
                                  borderRadius: 12,
                                  letterSpacing: "0.04em",
                                }}
                              >
                                10 areas
                              </span>
                            )}
                          </Link>

                          {isEdi ? (
                            <button
                              onClick={() => setEdiSubOpen(!ediSubOpen)}
                              aria-expanded={ediSubOpen}
                              aria-label="Toggle 10 EDI areas subpanel"
                              style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: ediSubOpen ? "var(--brand-orange)" : "var(--muted)",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "4px 8px",
                                borderRadius: 6,
                              }}
                            >
                              <span style={{ fontFamily: "var(--mono)", fontSize: "0.85rem" }}>01</span>
                              <ChevronDown
                                size={16}
                                style={{
                                  transform: ediSubOpen ? "rotate(180deg)" : "rotate(0deg)",
                                  transition: "transform 0.2s ease",
                                }}
                              />
                            </button>
                          ) : (
                            <span style={{ fontFamily: "var(--mono)", fontSize: "0.85rem", color: "var(--muted)" }}>
                              {s.index}
                            </span>
                          )}
                        </div>

                        {/* Mobile Accordion Expansion */}
                        {isEdi && ediSubOpen && (
                          <div className="mobile-edi-accordion" style={{ padding: "10px 0 16px 12px", display: "flex", flexDirection: "column", gap: 14 }}>
                            {EDI_MENU_GROUPS.map((grp) => (
                              <div key={grp.phase}>
                                <div style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--brand-orange)", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 4 }}>
                                  {grp.phase}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                  {grp.items.map((it) => (
                                    <Link
                                      key={it.anchor}
                                      href={`/edi-services#${it.anchor}`}
                                      onClick={closeMenu}
                                      style={{
                                        border: "none",
                                        padding: "4px 0",
                                        fontSize: "0.88rem",
                                        color: "var(--fg)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                      }}
                                    >
                                      <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", opacity: 0.6 }}>{it.num}</span>
                                      <span>{it.title}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Desktop Sub-Panel: 10 EDI Areas Column */}
              <AnimatePresence>
                {ediSubOpen && (
                  <motion.div
                    className="desktop-edi-subpanel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--line)",
                      borderRadius: 16,
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      maxHeight: "75vh",
                      overflowY: "auto",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: 10 }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--brand-orange)", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase" }}>
                        EDI Sub-Areas (01–10)
                      </span>
                      <Link
                        href="/edi-services"
                        onClick={closeMenu}
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--brand-blue)",
                          fontWeight: 600,
                          textDecoration: "none",
                          border: "none",
                          padding: 0,
                        }}
                      >
                        All EDI →
                      </Link>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {EDI_MENU_GROUPS.map((grp) => (
                        <div key={grp.phase}>
                          <div style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--brand-orange)", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 6 }}>
                            {grp.phase}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {grp.items.map((it) => (
                              <Link
                                key={it.anchor}
                                href={`/edi-services#${it.anchor}`}
                                onClick={closeMenu}
                                style={{
                                  border: "none",
                                  padding: "5px 8px",
                                  borderRadius: 6,
                                  fontSize: "0.85rem",
                                  color: "var(--fg)",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  transition: "background 0.15s ease, color 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "rgba(242, 101, 47, 0.08)";
                                  e.currentTarget.style.color = "var(--brand-orange)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "transparent";
                                  e.currentTarget.style.color = "var(--fg)";
                                }}
                              >
                                <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", opacity: 0.6 }}>{it.num}</span>
                                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
