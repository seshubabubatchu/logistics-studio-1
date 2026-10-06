"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Compass, Code2, Workflow, Users } from "lucide-react";
import { pillars, posts, services } from "@/lib/data";
import HeroCanvas from "./HeroCanvas";
import { Button, CTA, Marquee, ParallaxBand, Reveal, ScrollWords, SplitHeading, useMedia } from "./ui";
import ParticleText from "./ParticleText";

const HERO_LINES = ["Innovate.", "Automate.", "Predict."];
const HERO_COLORS = ["#EAF0FF", "#5B8CFF", "#C6FF3D"];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const cy = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const o = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const [delay] = useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem("ls-loaded") ? 150 : 2100,
  );
  return (
    <section ref={ref} className="hero">
      <motion.div style={{ y: cy, scale, position: "absolute", inset: 0 }}>
        <HeroCanvas />
      </motion.div>
      <motion.div className="container" style={{ y, opacity: o }}>
        <div className="eyebrow">Technology for transportation &amp; logistics</div>
        <h1 style={{ marginTop: 28 }}>
          <span className="sr-only">Innovate, Automate and Predict</span>
          <ParticleText lines={HERO_LINES} colors={HERO_COLORS} delay={delay} />
        </h1>
        <div className="hero-meta">
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            We build supply chain software, data science and integrations, from ERP to last-mile delivery, with the industry expertise logistics leaders can count on.
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
            <div className="eyebrow">What we do</div>
            <SplitHeading text="Four ways we move you forward" className="h-lg" />
          </div>
          <p className="lead" style={{ maxWidth: "36ch" }}>
            A collaborative product development process for logistics leaders ready to begin their digital transformation journey.
          </p>
        </div>
        <motion.div className="hscroll-track" style={desktop ? { x } : undefined}>
          {pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <article key={p.t} className="pcard" style={{ ["--glow" as string]: glows[i] }}>
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
                <span className="stitle">{s.title}</span>
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

const steps = [
  { t: "Discover", d: "A discovery sprint takes a deep dive into what brought you to us. We leave you with a go-forward technology roadmap." },
  { t: "Design", d: "Rapid prototypes and architecture that align your business goals with the right technology, security and scale included." },
  { t: "Deliver", d: "Agile development from mobile apps to full custom logistics platforms and every integration in between." },
  { t: "Evolve", d: "Dedicated teams, data science and continuous improvement keep systems sharp as your operation grows." },
];

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
              We assess your current technical state, identify present and foreseeable issues, and work alongside your team to align business goals with technology.
            </p>
            <Button href="/strategy-and-development" ghost>
              See the full approach
            </Button>
          </Reveal>
        </div>
        <div ref={ref} className="steps">
          <motion.div className="fill" style={{ scaleY: scrollYProgress }} />
          {steps.map((s, i) => (
            <Reveal key={s.t}>
              <div className="step">
                <span className="sn">STEP 0{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
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
      <Marquee items={["ERP", "TMS", "WMS", "EDI & APIs", "Last-mile", "Machine Learning", "Cloud migration", "Mobile apps"]} />
      <section className="section">
        <div className="container stmt-wrap">
          <div className="eyebrow">Who we are</div>
          <ScrollWords
            className="statement wide"
            text="At Logistics Studio we have the tools and talent the industry needs. Supply chain software, data analysis, staff augmentation and integrations from ERP to last-mile delivery, from a partner the supply chain can count on."
          />
        </div>
      </section>
      <Pillars />
      <ParallaxBand a="Strategy" b="Software" />
      <ServiceList />
      <Process />
      <Insights />
      <CTA
        title="Free tech stack assessment"
        text="Not sure where to start? We'll review your current logistics technology and show you where the biggest wins are."
        button="Get started"
      />
    </>
  );
}
