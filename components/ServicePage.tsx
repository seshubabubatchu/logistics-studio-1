"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sparkles, Wrench } from "lucide-react";
import { services, type ServiceItem } from "@/data/services";
import { CTA, PageHero, Reveal, SplitHeading } from "./ui";
import VisualStory from "./VisualStory";

export function Visual({ hue, label }: { hue: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const rot2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <div ref={ref} className="media-card" style={{ background: `radial-gradient(70% 70% at 50% 40%, ${hue}22, transparent 70%), var(--bg-2)` }}>
      <motion.div className="media-inner" style={{ y }}>
        <svg viewBox="0 0 400 400" fill="none">
          <motion.g style={{ rotate: rot, transformOrigin: "200px 200px" }}>
            <circle cx="200" cy="200" r="150" stroke={hue} strokeOpacity=".5" strokeDasharray="2 8" />
            <circle cx="350" cy="200" r="7" fill={hue} />
          </motion.g>
          <motion.g style={{ rotate: rot2, transformOrigin: "200px 200px" }}>
            <circle cx="200" cy="200" r="105" stroke="#EAF0FF" strokeOpacity=".25" />
            <circle cx="200" cy="95" r="5" fill="#EAF0FF" />
            <circle cx="305" cy="200" r="3" fill={hue} />
          </motion.g>
          <circle cx="200" cy="200" r="190" stroke="#EAF0FF" strokeOpacity=".08" />
          <circle cx="200" cy="200" r="58" fill={hue} fillOpacity=".15" stroke={hue} />
          <circle cx="200" cy="200" r="18" fill={hue} />
          <path d="M20 200h360M200 20v360" stroke="#EAF0FF" strokeOpacity=".07" />
        </svg>
      </motion.div>
      <span style={{ position: "absolute", left: 24, bottom: 20, fontFamily: "var(--mono)", fontSize: ".7rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)" }}>
        {label}
      </span>
    </div>
  );
}

export default function ServicePage({ s }: { s: ServiceItem }) {
  const next = services[(services.findIndex((x) => x.slug === s.slug) + 1) % services.length];

  return (
    <>
      <PageHero kicker={s.kicker} title={s.headline} text={s.intro} hue={s.hue} />

      {/* Best fit banner & capabilities */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              padding: "20px 28px",
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 48,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  color: "var(--brand-orange)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Best fit
              </span>
              <span style={{ fontSize: "1rem", color: "var(--fg)", fontWeight: 500 }}>
                {s.bestFit}
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.78rem",
                color: "var(--muted)",
              }}
            >
              {s.index} / 06
            </span>
          </div>

          <div className="split" style={{ alignItems: "start" }}>
            <Visual hue={s.hue} label={`${s.index} — ${s.kicker}`} />

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Block 1: What it is */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--line)",
                  borderLeft: `4px solid ${s.hue}`,
                  borderRadius: 12,
                  padding: "24px 28px",
                }}
              >
                <div style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: s.hue, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 8 }}>
                  What it is
                </div>
                <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.6, color: "var(--fg)" }}>
                  {s.intro}
                </p>
              </div>

              {/* Block 2: Who it's for */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--line)",
                  borderLeft: "4px solid var(--brand-orange)",
                  borderRadius: 12,
                  padding: "24px 28px",
                }}
              >
                <div style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--brand-orange)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 8 }}>
                  Who it&apos;s for
                </div>
                <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.6, color: "var(--fg)" }}>
                  {s.whoItsFor}
                </p>
              </div>

              {/* Block 3: How we deliver it */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--line)",
                  borderLeft: "4px solid var(--brand-blue)",
                  borderRadius: 12,
                  padding: "24px 28px",
                }}
              >
                <div style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--brand-blue)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 8 }}>
                  How we deliver it
                </div>
                <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.6, color: "var(--fg)" }}>
                  {s.howWeDeliver}
                </p>

                {/* Tool tags like IBM watsonx / Python / Spring */}
                {s.tools && (
                  <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--muted)", marginRight: 4 }}>Technologies:</span>
                    {s.tools.map((tool) => (
                      <span
                        key={tool}
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.78rem",
                          fontWeight: tool.includes("watsonx") ? 700 : 500,
                          padding: "4px 10px",
                          background: tool.includes("watsonx") ? "rgba(178, 140, 255, 0.15)" : "var(--bg-2)",
                          color: tool.includes("watsonx") ? "#9333ea" : "var(--fg)",
                          borderRadius: 6,
                          border: tool.includes("watsonx") ? "1px solid rgba(178, 140, 255, 0.4)" : "1px solid var(--line)",
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Block 4: Why it matters */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--line)",
                  borderLeft: "4px solid #3DE0C5",
                  borderRadius: 12,
                  padding: "24px 28px",
                }}
              >
                <div style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "#059669", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 8 }}>
                  Why it matters
                </div>
                <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.6, color: "var(--fg)" }}>
                  {s.whyItMatters}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific 300vh Scroll-Driven Visual Story */}
      <VisualStory slug={s.slug} title={s.title} kicker={s.kicker} hue={s.hue} />

      {/* Capabilities tags */}
      {s.capabilities && (
        <section
          className="section"
          style={{
            background: "var(--bg-2)",
            padding: "48px 0",
            marginBottom: "clamp(64px, 8vw, 96px)",
          }}
        >
          <div className="container">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div className="eyebrow">Expertise</div>
                <h3 className="h-md" style={{ margin: "6px 0 0" }}>Core capabilities</h3>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: "600px" }}>
                {s.capabilities.map((c) => (
                  <span
                    key={c}
                    style={{
                      padding: "8px 16px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--line)",
                      borderRadius: 8,
                      fontSize: "0.88rem",
                      fontWeight: 500,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <CTA
        title="Ready to discuss your supply chain technology?"
        text="Speak with our logistics engineers. We start by understanding your operation."
        button="Get in touch"
      />

      {/* Next service navigation */}
      <section style={{ borderTop: "1px solid var(--line)" }}>
        <Link
          href={`/${next.slug}`}
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "56px var(--pad)",
            gap: 24,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div>
            <div className="eyebrow">Next service</div>
            <div className="h-lg" style={{ fontFamily: "var(--display)", fontWeight: 600, marginTop: 14 }}>
              {next.title}
            </div>
          </div>
          <span className="sarrow" style={{ width: 72, height: 72, flex: "none" }}>
            <ArrowUpRight />
          </span>
        </Link>
      </section>
    </>
  );
}
