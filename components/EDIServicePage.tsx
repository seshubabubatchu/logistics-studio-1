"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  Layers,
  Search,
  Server,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  ediAreas,
  ediPlatforms,
  standardsCategories,
  docClosingCTA,
  type EdiArea,
} from "@/data/services";
import { CTA, PageHero, Reveal } from "./ui";

const navGroups = [
  {
    phase: "PLAN",
    items: [{ num: "01", title: "EDI Strategy & Assessment", anchor: "strategy-assessment" }],
  },
  {
    phase: "CONNECT",
    items: [
      { num: "02", title: "Trading Partner Onboarding", anchor: "onboarding" },
      { num: "04", title: "Integration with ERP, WMS & TMS", anchor: "integration" },
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

export default function EDIServicePage() {
  const [activeAnchor, setActiveAnchor] = useState<string>("strategy-assessment");
  const [openAccordion, setOpenAccordion] = useState<Record<string, boolean>>({
    "strategy-assessment": true,
    onboarding: true,
    mapping: true,
    integration: true,
    connectivity: true,
    "testing-compliance": true,
    "support-monitoring": true,
    "managed-edi": true,
    migration: true,
  });

  // Standards search and filter state
  const [standardsTab, setStandardsTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle URL hash on initial load and hashchange
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveAnchor(hash);
        setOpenAccordion((prev) => ({ ...prev, [hash]: true }));
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            const top = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: "smooth" });
          }, 150);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Scroll spy observer for sticky sidebar
  useEffect(() => {
    const allAnchors = [
      ...ediAreas.map((a) => a.anchor),
      "platforms",
      "standards",
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = allAnchors.length - 1; i >= 0; i--) {
        const id = allAnchors[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveAnchor(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAccordion = (anchor: string) => {
    setOpenAccordion((prev) => ({
      ...prev,
      [anchor]: !prev[anchor],
    }));
  };

  const scrollToAnchor = (anchor: string) => {
    setActiveAnchor(anchor);
    setOpenAccordion((prev) => ({ ...prev, [anchor]: true }));
    const el = document.getElementById(anchor);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
      window.history.replaceState(null, "", `#${anchor}`);
    }
  };

  // Filtered standards
  const filteredStandards = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return standardsCategories
      .map((cat) => {
        if (standardsTab !== "All" && cat.area !== standardsTab) {
          return null;
        }
        const matches = cat.documents.filter(
          (doc) =>
            doc.code.toLowerCase().includes(q) ||
            doc.name.toLowerCase().includes(q)
        );
        if (q && matches.length === 0) return null;
        return {
          ...cat,
          documents: q ? matches : cat.documents,
        };
      })
      .filter(Boolean) as typeof standardsCategories;
  }, [standardsTab, searchQuery]);

  return (
    <>
      <PageHero
        kicker="01 — EDI Services"
        title="We cover the whole EDI lifecycle"
        text="Planning, onboarding, mapping, integration, connectivity, testing, support, full management and modernization. A logistics company might trade with 40 partners or 400. Each partner has its own spec, its own preferred connection and its own idea of what 'on time' means. Most providers handle one part of that. We handle all of it, on the platforms you already run."
        hue="#1368F6"
      />

      {/* Target Audience & Key Metrics */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 40 }}>
        <div className="container">
          <div
            style={{
              padding: "24px 32px",
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              borderRadius: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.75rem",
                  color: "var(--brand-orange)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Who it&apos;s for
              </span>
              <p style={{ margin: "6px 0 0", fontSize: "1.05rem", fontWeight: 500, color: "var(--fg)" }}>
                3PLs, freight forwarders, carriers and warehouse operators that send and receive large volumes of EDI with customers, carriers, vendors and retailers.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            <div
              style={{
                padding: "24px",
                background: "var(--bg-card)",
                border: "1px solid var(--line)",
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--brand-blue)", fontFamily: "var(--display)" }}>
                14 years
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: 4 }}>
                Logistics-only industry focus
              </div>
            </div>

            <div
              style={{
                padding: "24px",
                background: "var(--bg-card)",
                border: "1px solid var(--line)",
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--brand-orange)", fontFamily: "var(--display)" }}>
                400
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: 4 }}>
                Engineers fluent in logistics & EDI
              </div>
            </div>

            <div
              style={{
                padding: "24px",
                background: "var(--bg-card)",
                border: "1px solid var(--line)",
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: "2.4rem", fontWeight: 700, color: "#3DE0C5", fontFamily: "var(--display)" }}>
                10 areas
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: 4 }}>
                Complete lifecycle under one roof
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout: Left Mini-Nav (Scroll-Spy) + Right Content */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 48, alignItems: "start" }}>
          
          {/* Sticky Left Mini-Nav */}
          <aside className="edi-mini-nav-sticky" style={{ position: "sticky", top: 100, maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
            <div style={{ padding: "8px 0 16px", borderBottom: "1px solid var(--line)", marginBottom: 16 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", letterSpacing: "0.15em", color: "var(--muted)", textTransform: "uppercase" }}>
                EDI Lifecycle Navigation
              </span>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {navGroups.map((g) => (
                <div key={g.phase}>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.14em",
                      color: "var(--brand-orange)",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    {g.phase}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {g.items.map((item) => {
                      const isActive = activeAnchor === item.anchor;
                      return (
                        <button
                          key={item.anchor}
                          onClick={() => scrollToAnchor(item.anchor)}
                          style={{
                            textAlign: "left",
                            background: isActive ? "rgba(19, 104, 246, 0.08)" : "transparent",
                            border: "none",
                            borderLeft: isActive ? "3px solid var(--brand-blue)" : "3px solid transparent",
                            padding: "6px 12px",
                            borderRadius: "0 8px 8px 0",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            color: isActive ? "var(--brand-blue)" : "var(--fg)",
                            fontWeight: isActive ? 600 : 400,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            transition: "all 0.15s ease",
                          }}
                        >
                          <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", opacity: 0.65 }}>
                            {item.num}
                          </span>
                          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          {/* Right Main Content */}
          <div className="edi-main-content" style={{ minWidth: 0 }}>
            {/* The 10 Areas in Doc Order */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {ediAreas.map((area) => {
                const isOpen = openAccordion[area.anchor] ?? true;
                return (
                  <article
                    key={area.anchor}
                    id={area.anchor}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--line)",
                      borderRadius: 16,
                      overflow: "hidden",
                      scrollMarginTop: 100,
                      transition: "box-shadow 0.2s ease",
                    }}
                  >
                    {/* Header / Accordion trigger */}
                    <div
                      onClick={() => toggleAccordion(area.anchor)}
                      style={{
                        padding: "24px 28px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "var(--bg-2)",
                        borderBottom: isOpen ? "1px solid var(--line)" : "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: "var(--brand-blue)",
                            background: "rgba(19, 104, 246, 0.1)",
                            padding: "4px 10px",
                            borderRadius: 6,
                          }}
                        >
                          {area.num}
                        </span>
                        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--fg)" }}>
                          {area.title}
                        </h2>
                        <span
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.68rem",
                            letterSpacing: "0.12em",
                            padding: "3px 8px",
                            borderRadius: 4,
                            background: "var(--line)",
                            color: "var(--muted)",
                          }}
                        >
                          {area.phase}
                        </span>
                      </div>
                      <ChevronDown
                        size={20}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.25s ease",
                          color: "var(--muted)",
                          flexShrink: 0,
                        }}
                      />
                    </div>

                    {/* Content Section */}
                    {isOpen && (
                      <div style={{ padding: "28px" }}>
                        {/* 4 Labeled Blocks */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
                          {/* Block 1: What it is */}
                          <div style={{ borderLeft: "3px solid var(--brand-blue)", paddingLeft: 16 }}>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--brand-blue)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                              What it is
                            </div>
                            <p style={{ margin: "4px 0 0", fontSize: "0.98rem", lineHeight: 1.6, color: "var(--fg)" }}>
                              {area.whatItIs}
                            </p>
                          </div>

                          {/* Block 2: Who it's for */}
                          <div style={{ borderLeft: "3px solid var(--brand-orange)", paddingLeft: 16 }}>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--brand-orange)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                              Who it&apos;s for
                            </div>
                            <p style={{ margin: "4px 0 0", fontSize: "0.98rem", lineHeight: 1.6, color: "var(--fg)" }}>
                              {area.whoItsFor}
                            </p>
                          </div>

                          {/* Block 3: How we deliver it */}
                          <div style={{ borderLeft: "3px solid #3DE0C5", paddingLeft: 16 }}>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "#3DE0C5", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                              How we deliver it
                            </div>
                            <p style={{ margin: "4px 0 0", fontSize: "0.98rem", lineHeight: 1.6, color: "var(--fg)" }}>
                              {typeof area.howWeDeliver === "string" ? area.howWeDeliver : area.howWeDeliver.join(" ")}
                            </p>

                            {/* SPECIAL TREATMENT: Onboarding 6 steps vertical timeline */}
                            {area.steps && (
                              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                                {area.steps.map((st, sidx) => (
                                  <div
                                    key={sidx}
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: 14,
                                      background: "var(--bg-2)",
                                      padding: "12px 16px",
                                      borderRadius: 8,
                                      border: "1px solid var(--line)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "var(--mono)",
                                        fontSize: "0.75rem",
                                        fontWeight: 700,
                                        color: "var(--brand-blue)",
                                        background: "rgba(19, 104, 246, 0.12)",
                                        width: 26,
                                        height: 26,
                                        borderRadius: "50%",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                      }}
                                    >
                                      {sidx + 1}
                                    </span>
                                    <span style={{ fontSize: "0.92rem", lineHeight: 1.5 }}>{st}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* SPECIAL TREATMENT: Connectivity 5 tiles */}
                            {area.tiles && (
                              <div
                                style={{
                                  marginTop: 20,
                                  display: "grid",
                                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                  gap: 12,
                                }}
                              >
                                {area.tiles.map((tile) => (
                                  <div
                                    key={tile.title}
                                    style={{
                                      background: "var(--bg-2)",
                                      border: "1px solid var(--line)",
                                      padding: "14px 16px",
                                      borderRadius: 10,
                                    }}
                                  >
                                    <div style={{ fontWeight: 600, color: "var(--brand-blue)", fontSize: "0.95rem" }}>
                                      {tile.title}
                                    </div>
                                    <div style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: 4, lineHeight: 1.4 }}>
                                      {tile.desc}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* SPECIAL TREATMENT: Testing compliance tags (997, 999, TA1) */}
                            {area.tags && (
                              <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                                <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>Acknowledgments handled:</span>
                                {area.tags.map((tg) => (
                                  <span
                                    key={tg}
                                    style={{
                                      fontFamily: "var(--mono)",
                                      fontSize: "0.78rem",
                                      fontWeight: 600,
                                      padding: "4px 10px",
                                      background: "rgba(61, 224, 197, 0.12)",
                                      color: "#059669",
                                      borderRadius: 6,
                                      border: "1px solid rgba(61, 224, 197, 0.3)",
                                    }}
                                  >
                                    {tg}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* SPECIAL TREATMENT: Support 6 bullets checklist */}
                            {area.checklist && (
                              <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
                                {area.checklist.map((item, cidx) => (
                                  <div
                                    key={cidx}
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: 10,
                                      background: "var(--bg-2)",
                                      padding: "10px 14px",
                                      borderRadius: 8,
                                      border: "1px solid var(--line)",
                                    }}
                                  >
                                    <CheckCircle2 size={18} style={{ color: "var(--brand-blue)", flexShrink: 0, marginTop: 2 }} />
                                    <span style={{ fontSize: "0.88rem", lineHeight: 1.4 }}>{item}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Block 4: Why it matters */}
                          <div style={{ borderLeft: "3px solid #B28CFF", paddingLeft: 16 }}>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "#B28CFF", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                              Why it matters
                            </div>
                            <p style={{ margin: "4px 0 0", fontSize: "0.98rem", lineHeight: 1.6, color: "var(--fg)" }}>
                              {area.whyItMatters}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}

              {/* Area 10: Platforms We Work With (#platforms) */}
              <article
                id="platforms"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "32px",
                  scrollMarginTop: 100,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "var(--brand-blue)",
                      background: "rgba(19, 104, 246, 0.1)",
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    10
                  </span>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
                    Platforms We Work With
                  </h2>
                </div>

                <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.6, marginBottom: 28 }}>
                  We have deep production experience on the platforms most logistics EDI runs on. Most of our clients run two or three of these side by side, often with older versions in the mix.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
                  {ediPlatforms.map((plat) => (
                    <div
                      key={plat.name}
                      style={{
                        padding: "24px",
                        background: "var(--bg-2)",
                        border: "1px solid var(--line)",
                        borderRadius: 12,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                          <Server size={18} style={{ color: "var(--brand-blue)" }} />
                          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>{plat.name}</h3>
                        </div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--brand-orange)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                          What we do on it
                        </div>
                        <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
                          {plat.whatWeDo}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              {/* Area 11: Standards and documents we handle (#standards) */}
              <article
                id="standards"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "32px",
                  scrollMarginTop: 100,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--brand-orange)",
                      background: "rgba(242, 101, 47, 0.12)",
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    STANDARDS
                  </span>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
                    Standards and documents we handle
                  </h2>
                </div>

                <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 24 }}>
                  Browse X12 and EDI transaction sets by logistics domain, or search by transaction number or description.
                </p>

                {/* Search Bar + Tab Filter */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                  <div style={{ position: "relative" }}>
                    <Search
                      size={18}
                      style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}
                    />
                    <input
                      type="text"
                      placeholder="Search EDI code or name (e.g. 204, Load Tender, 856, ASN)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 16px 12px 46px",
                        background: "var(--bg-2)",
                        border: "1px solid var(--line)",
                        borderRadius: 10,
                        color: "var(--fg)",
                        fontSize: "0.92rem",
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["All", ...standardsCategories.map((c) => c.area)].map((tab) => {
                      const isSelected = standardsTab === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setStandardsTab(tab)}
                          style={{
                            padding: "7px 16px",
                            borderRadius: 20,
                            fontSize: "0.84rem",
                            border: isSelected ? "1px solid #081c54" : "1px solid var(--line)",
                            background: isSelected ? "#081c54" : "var(--bg-2)",
                            color: isSelected ? "#ffffff" : "#081c54",
                            cursor: "pointer",
                            fontWeight: isSelected ? 600 : 500,
                            transition: "all 0.15s ease",
                            boxShadow: isSelected ? "0 2px 8px rgba(8, 28, 84, 0.2)" : "none",
                          }}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Document Chip Groups */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {filteredStandards.map((cat) => (
                    <div key={cat.area} style={{ background: "var(--bg-2)", padding: "20px", borderRadius: 12, border: "1px solid var(--line)" }}>
                      <div
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.75rem",
                          letterSpacing: "0.08em",
                          color: "var(--brand-blue)",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          marginBottom: 12,
                        }}
                      >
                        {cat.area}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {cat.documents.map((doc) => (
                          <div
                            key={doc.code}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              background: "var(--bg-card)",
                              border: "1px solid var(--line)",
                              borderRadius: 8,
                              padding: "6px 12px",
                              fontSize: "0.85rem",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--mono)",
                                fontWeight: 700,
                                color: "var(--brand-orange)",
                                fontSize: "0.82rem",
                              }}
                            >
                              {doc.code}
                            </span>
                            <span style={{ color: "var(--fg)" }}>{doc.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {filteredStandards.length === 0 && (
                    <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
                      No EDI document matches found for &ldquo;{searchQuery}&rdquo;.
                    </div>
                  )}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA from Closing Document Paragraph */}
      <CTA
        title={docClosingCTA.title}
        text={docClosingCTA.text}
        button={docClosingCTA.button}
      />
    </>
  );
}
