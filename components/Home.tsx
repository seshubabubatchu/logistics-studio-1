"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Compass, Code2, Workflow, Users } from "lucide-react";
import { pillars, posts, services, howWeWorkSteps, docClosingCTA } from "@/lib/data";
import HeroCanvas from "./HeroCanvas";
import { Button, CTA, Marquee, ParallaxBand, Reveal, ScrollWords, SplitHeading, useMedia } from "./ui";

const HERO_LINES = ["Innovate.", "Automate.", "Predict."];
const HERO_COLORS = ["#081c54", "#1368f6", "#f2652f"];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const cy = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const o = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const [delay, setDelay] = useState(2100);

  useEffect(() => {
    if (sessionStorage.getItem("ls-loaded")) {
      setDelay(150);
    }
  }, []);

  return (
    <section ref={ref} className="hero">
      <motion.div style={{ y: cy, scale, position: "absolute", inset: 0 }}>
        <HeroCanvas />
      </motion.div>
      <motion.div className="container" style={{ y, opacity: o }}>
        <div className="eyebrow">Technology exclusively for logistics • 14 Years</div>
        <h1 style={{ marginTop: 28 }} className="h-xl">
          {HERO_LINES.map((line, i) => (
            <motion.span
              key={i}
              style={{ color: HERO_COLORS[i], display: "block" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (delay / 1000) + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="hero-meta">
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            For 14 years, Logistics Studio has built technology exclusively for logistics. 400 domain-fluent engineers covering the whole EDI lifecycle, legacy modernization, dedicated teams, and AI.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button href="/contact">Get started</Button>
            <Button href="/services" ghost>
              Explore services
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <div className="scroll-ind">
        <i />
        Scroll
      </div>
    </section>
  );
}

const icons = [Compass, Code2, Workflow, Users];
const glows = ["#C6FF3D", "#5B8CFF", "#FF8A3D", "#3DE0C5"];

function Pillars() {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useMedia("(min-width: 900px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-62%"]);
  return (
    <section ref={ref} className="hscroll" id="what-we-do">
      <div className="hscroll-sticky">
        <div className="container hscroll-head">
          <div>
            <div className="eyebrow">Why Logistics Studio</div>
            <SplitHeading text="Four reasons logistics leaders trust us" className="h-lg" />
          </div>
          <p className="lead" style={{ maxWidth: "36ch" }}>
            A collaborative technology partner for 3PLs, freight forwarders, carriers and warehouse operators.
          </p>
        </div>
        <motion.div className="hscroll-track" style={desktop ? { x } : undefined}>
          {pillars.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article key={p.t} className="pcard" style={{ ["--glow" as string]: glows[i % glows.length] }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className="num">0{i + 1} / 04</span>
                  <span className="ic">
                    <Icon size={24} />
                  </span>
                </div>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </article>
            );
          })}
          <div style={{ width: "10vw", flex: "none" }} />
        </motion.div>
        <div className="hprogress">
          <motion.i style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}

function ServiceList() {
  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">Services</div>
        <SplitHeading text="Everything the supply chain runs on" className="h-lg" />
        <div className="slist">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.04} y={30}>
              <Link href={`/${s.slug}`} className="srow" style={{ ["--c" as string]: s.hue }}>
                <span className="snum">{s.index}</span>
                <span className="stitle" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  {s.title}
                  {s.slug === "edi-services" && (
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
                </span>
                <span className="sdesc">{s.short}</span>
                <span className="sarrow">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  return (
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container proc">
        <div className="proc-sticky">
          <div className="eyebrow">Our process</div>
          <SplitHeading text="A simple approach to complex problems" className="h-lg" />
          <Reveal delay={0.2}>
            <p className="lead" style={{ margin: "28px 0 36px" }}>
              Most engagements follow the same five steps: from discovering your operation to long-term support and continuous improvement.
            </p>
            <Button href="/services" ghost>
              See how we work
            </Button>
          </Reveal>
        </div>
        <div ref={ref} className="steps">
          <motion.div className="fill" style={{ scaleY: scrollYProgress }} />
          {howWeWorkSteps.map((s, i) => (
            <Reveal key={s.name}>
              <div className="step">
                <span className="sn">STEP 0{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 56 }}>
          <div>
            <div className="eyebrow">Resources</div>
            <SplitHeading text="Latest thinking" className="h-lg" />
          </div>
          <Button href="/resources" ghost>
            All resources
          </Button>
        </div>
        <div className="grid-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <Link href="/resources" className="post">
                <div className="meta">
                  <span>{p.tag}</span>
                  <span>{p.date}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="more">
                  Read more <ArrowRight size={16} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={["EDI 204/214/210", "AS2 & SFTP", "TMS & WMS", "BizTalk & Cleo", "IBM Sterling", "CData", "Legacy Modernization", "Dedicated Teams"]} />
      <section className="section">
        <div className="container stmt-wrap">
          <div className="eyebrow">Who we are</div>
          <ScrollWords
            className="statement wide"
            text="For 14 years, Logistics Studio has built technology for one industry only: logistics. We work with 3PLs, freight forwarders, warehouse operators and last-mile carriers. Our 400-engineer team knows the code and knows how a load tender, an ASN or a freight invoice moves through a business."
          />
        </div>
      </section>
      <Pillars />
      <ParallaxBand a="EDI & Modernization" b="Logistics Fluency" />
      <ServiceList />
      <Process />
      <Insights />
      <CTA
        title={docClosingCTA.title}
        text={docClosingCTA.text}
        button={docClosingCTA.button}
      />
    </>
  );
}
