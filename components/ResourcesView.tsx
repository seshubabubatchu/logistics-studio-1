"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { posts } from "@/lib/data";
import { CTA, PageHero, Reveal } from "./ui";

const tabs = ["All", "Blog posts", "White paper", "Webinars", "Case study", "Info sheet"];

export default function ResourcesView() {
  const [tab, setTab] = useState("All");
  const show = tab === "All" || tab === "Blog posts";
  const [first, ...rest] = posts;
  return (
    <>
      <PageHero kicker="Resources" title="Ideas for a smarter supply chain" text="Blog posts, white papers, webinars, case studies and info sheets from the Logistics Studio team." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="filters">
            {tabs.map((t) => (
              <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              {show ? (
                <>
                  <article className="res-feature">
                    <div className="art" />
                    <div className="body">
                      <div className="post" style={{ all: "unset", display: "contents" }}>
                        <div className="meta" style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>
                          <span>Featured · {first.tag}</span>
                          <span>{first.date}</span>
                        </div>
                        <h2 className="h-md">{first.title}</h2>
                        <p className="lead">{first.excerpt}</p>
                        <span className="accent" style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>
                          Read more <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </article>
                  <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
                    {rest.map((p, i) => (
                      <Reveal key={p.title} delay={i * 0.1}>
                        <article className="post">
                          <div className="meta">
                            <span>{p.tag}</span>
                            <span>{p.date}</span>
                          </div>
                          <h3>{p.title}</h3>
                          <p>{p.excerpt}</p>
                          <span className="more">
                            Read more <ArrowRight size={16} />
                          </span>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                </>
              ) : (
                <div className="feature-card" style={{ textAlign: "center", padding: "80px 24px" }}>
                  <h3 className="h-md">{tab} coming soon</h3>
                  <p style={{ marginTop: 12 }}>We&apos;re preparing new material. Get in touch to receive it first.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <CTA title="Get insights in your inbox" text="Join our newsletter for news and updates from Logistics Studio." button="Stay in touch" />
    </>
  );
}
