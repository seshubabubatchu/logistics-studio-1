"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Layers, Server, CheckCircle2 } from "lucide-react";
import {
  services,
  ediPlatforms,
  howWeWorkModels,
  howWeWorkSteps,
} from "@/data/services";
import { Reveal } from "./ui";

const EDI_LIFECYCLE_TRACK = [
  {
    phase: "Plan",
    areas: [
      { num: "01", name: "Strategy & Assessment", anchor: "strategy-assessment" },
    ],
  },
  {
    phase: "Connect",
    areas: [
      { num: "02", name: "Partner Onboarding", anchor: "onboarding" },
      { num: "04", name: "ERP, WMS & TMS Integration", anchor: "integration" },
      { num: "05", name: "Connectivity & MFT", anchor: "connectivity" },
    ],
  },
  {
    phase: "Prove",
    areas: [
      { num: "03", name: "Mapping & Translation", anchor: "mapping" },
      { num: "06", name: "Testing & Compliance", anchor: "testing-compliance" },
    ],
  },
  {
    phase: "Run",
    areas: [
      { num: "07", name: "Support & Monitoring", anchor: "support-monitoring" },
      { num: "08", name: "Managed EDI", anchor: "managed-edi" },
    ],
  },
  {
    phase: "Evolve",
    areas: [
      { num: "09", name: "Migration & Modernization", anchor: "migration" },
    ],
  },
];

export default function ServicesView() {
  const [activeModelTab, setActiveModelTab] = useState<number>(0);

  const ediService = services[0];
  const otherServices = services.slice(1);

  return (
    <div className="services-container" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      {/* 1. Featured Card 01: EDI Services */}
      <Reveal delay={0.05}>
        <div
          className="edi-featured-card"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--line)",
            borderTop: "4px solid var(--brand-blue)",
            borderRadius: 20,
            padding: "36px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {/* Header Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "var(--brand-blue)",
                    background: "rgba(19, 104, 246, 0.1)",
                    padding: "3px 10px",
                    borderRadius: 6,
                  }}
                >
                  {ediService.index}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.72rem",
                    color: "var(--brand-orange)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                  }}
                >
                  Featured Capability • 10 Areas
                </span>
              </div>
              <h2 style={{ fontSize: "2.1rem", fontWeight: 700, margin: 0, fontFamily: "var(--display)" }}>
                {ediService.title}
              </h2>
            </div>

            <Link
              href={`/${ediService.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--brand-blue)",
                fontWeight: 600,
                fontSize: "1.05rem",
                textDecoration: "none",
                background: "rgba(19, 104, 246, 0.08)",
                padding: "10px 20px",
                borderRadius: 30,
                transition: "all 0.2s ease",
              }}
            >
              Explore EDI Services <ArrowUpRight size={18} />
            </Link>
          </div>

          {/* Description & Best Fit */}
          <div style={{ maxWidth: "800px" }}>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "var(--fg)", margin: 0 }}>
              {ediService.short}
            </p>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--brand-orange)", fontWeight: 600 }}>
                BEST FIT:
              </span>
              <span style={{ fontSize: "0.95rem", color: "var(--muted)" }}>
                {ediService.bestFit}
              </span>
            </div>
          </div>

          {/* Connected Horizontal Track of the 5 Lifecycle Phases */}
          <div
            className="lifecycle-track-wrapper"
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              borderRadius: 16,
              padding: "24px 28px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)" }}>
                End-to-End EDI Lifecycle Track
              </span>
              <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                Click any area to jump directly
              </span>
            </div>

            <div
              className="lifecycle-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 20,
                position: "relative",
              }}
            >
              {EDI_LIFECYCLE_TRACK.map((phase, pidx) => (
                <div key={phase.phase} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "var(--brand-orange)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "var(--brand-blue)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {phase.phase}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {phase.areas.map((a) => (
                      <Link
                        key={a.anchor}
                        href={`/edi-services#${a.anchor}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 10px",
                          background: "var(--bg-card)",
                          border: "1px solid var(--line)",
                          borderRadius: 8,
                          fontSize: "0.82rem",
                          color: "var(--fg)",
                          textDecoration: "none",
                          transition: "border-color 0.15s, color 0.15s",
                        }}
                      >
                        <span style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--brand-orange)", fontWeight: 600 }}>
                          {a.num}
                        </span>
                        <span>{a.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Under EDI track: Platform Chip Row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", paddingTop: 8 }}>
            <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Server size={16} /> Supported Platforms:
            </span>
            {ediPlatforms.map((plat) => (
              <Link
                key={plat.name}
                href="/edi-services#platforms"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.8rem",
                  padding: "5px 14px",
                  borderRadius: 20,
                  background: "var(--bg-2)",
                  border: "1px solid var(--line)",
                  color: "var(--fg)",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
              >
                {plat.name}
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 2. Balanced Grid of the Other 5 Services (02 - 06) */}
      <div
        className="services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        {otherServices.map((s, idx) => (
          <Reveal key={s.slug} delay={idx * 0.08}>
            <Link
              href={`/${s.slug}`}
              className="feature-card"
              style={{
                ["--hue" as string]: s.hue,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 340,
                padding: "32px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span className="fi">{s.index}</span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.68rem",
                      color: "var(--muted)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Service {s.index}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.45rem", fontWeight: 700, marginBottom: 12, lineHeight: 1.25 }}>
                  {s.title}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.55, margin: 0 }}>
                  {s.short}
                </p>

                <div style={{ marginTop: 18, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--brand-orange)", fontWeight: 600, marginBottom: 4 }}>
                    BEST FIT
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--fg)", lineHeight: 1.4 }}>
                    {s.bestFit}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <span
                  style={{
                    display: "inline-flex",
                    gap: 8,
                    alignItems: "center",
                    color: s.hue,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                >
                  Explore <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* 3. Compact "How We Work" Strip */}
      <Reveal delay={0.1}>
        <section
          className="how-we-work-strip"
          style={{
            background: "var(--bg-2)",
            border: "1px solid var(--line)",
            borderRadius: 20,
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          {/* Header */}
          <div>
            <div className="eyebrow">Engagement Models</div>
            <h2 className="h-md" style={{ margin: "8px 0 0" }}>How we work</h2>
            <p style={{ color: "var(--muted)", marginTop: 8, fontSize: "1rem" }}>
              You can work with us in three ways, and move between them as your needs change.
            </p>
          </div>

          {/* Model Tabs: Project / Dedicated team / Managed service */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", borderBottom: "1px solid var(--line)", paddingBottom: 12 }}>
              {howWeWorkModels.map((m, midx) => {
                const isActive = activeModelTab === midx;
                return (
                  <button
                    key={m.model}
                    onClick={() => setActiveModelTab(midx)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 8,
                      border: "none",
                      background: isActive ? "var(--brand-blue)" : "transparent",
                      color: isActive ? "#ffffff" : "var(--fg)",
                      fontWeight: isActive ? 600 : 500,
                      cursor: "pointer",
                      fontSize: "0.92rem",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {m.model}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                background: "var(--bg-card)",
                padding: "24px 28px",
                borderRadius: 14,
                border: "1px solid var(--line)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 20,
              }}
            >
              <div>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--brand-orange)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                  How it works
                </span>
                <p style={{ margin: "6px 0 0", fontSize: "1.05rem", fontWeight: 500 }}>
                  {howWeWorkModels[activeModelTab].howItWorks}
                </p>
              </div>

              <div>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--brand-blue)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                  Good for
                </span>
                <p style={{ margin: "6px 0 0", fontSize: "1.05rem", color: "var(--muted)" }}>
                  {howWeWorkModels[activeModelTab].goodFor}
                </p>
              </div>
            </div>
          </div>

          {/* The 5 Steps */}
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 20 }}>
              Most engagements follow the same five steps
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
              }}
            >
              {howWeWorkSteps.map((step, sidx) => (
                <div
                  key={step.name}
                  style={{
                    background: "var(--bg-card)",
                    padding: "20px",
                    borderRadius: 12,
                    border: "1px solid var(--line)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--brand-orange)",
                    }}
                  >
                    STEP 0{sidx + 1}
                  </span>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 600, margin: "8px 0 6px" }}>
                    {step.name}
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
