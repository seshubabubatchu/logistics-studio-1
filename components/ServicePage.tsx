"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/lib/data";
import { CTA, PageHero, Reveal, SplitHeading } from "./ui";

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

export default function ServicePage({ s }: { s: Service }) {
  const next = services[(services.findIndex((x) => x.slug === s.slug) + 1) % services.length];
  return (
    <>
      <PageHero kicker={s.kicker} title={s.headline} text={s.intro} hue={s.hue} />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <Visual hue={s.hue} label={`${s.index} — ${s.kicker}`} />
          <div>
            <div className="eyebrow">Capabilities</div>
            <SplitHeading text="What's inside" className="h-md" />
            <Reveal delay={0.1}>
              <div className="chips" style={{ marginTop: 32 }}>
                {s.list.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div className="eyebrow">How it works</div>
          <SplitHeading text={`The ${s.kicker} approach`} className="h-lg" />
          <div className="grid-3" style={{ marginTop: 56, gridTemplateColumns: undefined }}>
            {s.points.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <div className="feature-card" style={{ ["--hue" as string]: s.hue }}>
                  <span className="fi">0{i + 1}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div style={{ position: "sticky", top: 140 }}>
            <div className="eyebrow">Benefits</div>
            <SplitHeading text={s.benefitsTitle} className="h-lg" />
          </div>
          <div>
            {s.benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.05}>
                <div style={{ padding: "36px 0", borderBottom: "1px solid var(--line)", display: "grid", gridTemplateColumns: "56px 1fr", gap: 12 }}>
                  <span style={{ fontFamily: "var(--mono)", color: s.hue, fontSize: ".8rem" }}>0{i + 1}</span>
                  <div>
                    <h3 className="h-md" style={{ marginBottom: 10 }}>
                      {b.t}
                    </h3>
                    <p className="lead">{b.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA title={s.cta.title} text={s.cta.text} button={s.cta.button} />

      <section style={{ borderTop: "1px solid var(--line)" }}>
        <Link href={`/${next.slug}`} className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "56px var(--pad)", gap: 24 }}>
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
