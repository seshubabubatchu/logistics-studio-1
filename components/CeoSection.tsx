"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Workflow,
  Users,
  Quote,
  MapPin,
  Building2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import krishnaSirImg from "@/app/krishna-sir.png";
import { EASE, Reveal, SplitHeading } from "./ui";

const CORE_VALUES = [
  {
    title: "Mutual Respect",
    icon: HeartHandshake,
    color: "#1368f6",
    desc: "Listening attentively, valuing diverse perspectives, and treating every partner, client, and team member with genuine dignity.",
  },
  {
    title: "Shared Responsibility",
    icon: ShieldCheck,
    color: "#f2652f",
    desc: "Owning outcomes collaboratively from initial system design to daily live freight operations and trading partner SLA success.",
  },
  {
    title: "Integrity & Trust",
    icon: CheckCircle2,
    color: "#081c54",
    desc: "Uncompromising honesty, transparent counsel, and engineering reliability that supply chain leaders can stake their operations on.",
  },
  {
    title: "Humility & Modesty",
    icon: Compass,
    color: "#1368f6",
    desc: "Staying grounded, constantly learning from warehouse floor realities, and prioritizing our clients' long-term operational success.",
  },
  {
    title: "Flexibility",
    icon: Workflow,
    color: "#f2652f",
    desc: "Adapting swiftly and resiliently to non-standard partner specs, shifting freight volumes, and rapidly modernizing tech stacks.",
  },
  {
    title: "People & Family",
    icon: Users,
    color: "#081c54",
    desc: "Championing our people, honoring their families, and cultivating lasting human bonds across our global offices and client teams.",
  },
];

export default function CeoSection() {
  return (
    <section className="section ceo-section" id="leadership">
      <div className="container">
        {/* Section Header */}
        <div className="ceo-header">
          <div className="eyebrow">Leadership &amp; Vision</div>
          <SplitHeading
            text="Led by domain conviction. United by enduring values."
            className="h-lg"
          />
          <Reveal delay={0.1}>
            <p className="lead ceo-lead">
              Under the visionary leadership of our Founder &amp; CEO, Krishna Vattipalli,
              Logistics Studio has built an industry-defining standard for supply chain technology—combining
              deep logistics domain fluency with an unwavering commitment to human values.
            </p>
          </Reveal>
        </div>

        {/* 2-Column Split: Left = CEO Profile & Quote, Right = Our Values */}
        <div className="ceo-layout">
          {/* LEFT: CEO Profile Card */}
          <div className="ceo-left-col">
            <Reveal delay={0.15}>
              <motion.div
                className="ceo-profile-card feature-card"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {/* Glow Backdrop */}
                <div className="ceo-card-glow" />

                {/* Portrait Container */}
                <div className="ceo-image-wrapper">
                  <Image
                    src={krishnaSirImg}
                    alt="Krishna Vattipalli - Founder & CEO of Logistics Studio"
                    className="ceo-image"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                  />
                  {/* Floating Status Pill */}
                  <div className="ceo-floating-pill">
                    <span className="ceo-pulsing-dot" />
                    <span>Founder &amp; CEO</span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="ceo-image-gradient" />

                  {/* Caption on image */}
                  <div className="ceo-image-caption">
                    <h3 className="ceo-name">Krishna Vattipalli</h3>
                    <p className="ceo-title">Founder &amp; Chief Executive Officer</p>
                  </div>
                </div>

                {/* CEO Bio Snippet */}
                <div className="ceo-card-body">
                  <div className="ceo-tags">
                    <span className="ceo-tag">
                      <Sparkles size={13} className="ceo-tag-icon" />
                      14+ Years in Logistics
                    </span>
                    <span className="ceo-tag">
                      <Users size={13} className="ceo-tag-icon" />
                      400+ Domain Engineers
                    </span>
                  </div>

                  {/* Quote Box */}
                  <div className="ceo-quote-box">
                    <Quote className="ceo-quote-icon" size={24} />
                    <p className="ceo-quote-text">
                      &ldquo;In logistics, software isn&apos;t just code running in the cloud—it is the lifeline
                      keeping shipments moving, warehouses humming, and trading partners connected. We measure
                      our success by the absolute reliability and trust we earn every single day.&rdquo;
                    </p>
                    <div className="ceo-quote-author">
                      <span className="ceo-signature">— Krishna Vattipalli</span>
                    </div>
                  </div>

                  {/* Global Presence indicator */}
                  <div className="ceo-presence">
                    <div className="presence-item">
                      <Building2 size={16} className="presence-icon" />
                      <div>
                        <strong>Engineering HQ</strong>
                        <span>Visakhapatnam, India</span>
                      </div>
                    </div>
                    <div className="presence-divider" />
                    <div className="presence-item">
                      <MapPin size={16} className="presence-icon" />
                      <div>
                        <strong>Regional Offices</strong>
                        <span>United States</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* RIGHT: Our Values Section */}
          <div className="ceo-right-col">
            <Reveal delay={0.2}>
              <div className="ceo-values-card">
                <div className="ceo-values-head">
                  <div className="eyebrow" style={{ color: "var(--brand-blue)" }}>
                    Foundation &amp; Culture
                  </div>
                  <h2 className="ceo-values-title">Our Values</h2>
                  <p className="ceo-values-intro">
                    From our headquarters in Visakhapatnam to our regional offices across the United
                    States, we are united by shared values that drive our actions. Our clients can
                    rely on exceptional experience rooted in:
                  </p>
                </div>

                {/* Values 2x3 Grid */}
                <div className="ceo-values-grid">
                  {CORE_VALUES.map((val, idx) => {
                    const Icon = val.icon;
                    return (
                      <motion.div
                        key={val.title}
                        className="ceo-value-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1 + idx * 0.08,
                          ease: EASE,
                        }}
                        whileHover={{
                          y: -4,
                          boxShadow: "0 12px 30px -10px rgba(8, 28, 84, 0.12)",
                          borderColor: val.color,
                        }}
                      >
                        <div
                          className="ceo-value-icon-box"
                          style={{
                            background: `linear-gradient(135deg, ${val.color}15, ${val.color}25)`,
                            color: val.color,
                          }}
                        >
                          <Icon size={22} />
                        </div>
                        <div className="ceo-value-text">
                          <h4 className="ceo-value-name">{val.title}</h4>
                          <p className="ceo-value-desc">{val.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom Commitment Banner */}
                <div className="ceo-bottom-callout">
                  <div className="callout-content">
                    <h4>Built on 14 years of operational trust</h4>
                    <p>
                      Experience the difference of partnering with engineers who respect your business,
                      your deadlines, and your supply chain commitments.
                    </p>
                  </div>
                  <Link href="/contact" className="ceo-connect-btn">
                    <span>Connect with our team</span>
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
