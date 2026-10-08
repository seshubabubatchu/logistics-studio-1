"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { contact, services } from "@/lib/data";
import { Logo } from "./Navbar";
import ParticleText from "./ParticleText";

const WM = ["Logistics Studio"];
const WM_COLORS = ["rgba(255, 255, 255, 0.1)"];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const [sent, setSent] = useState(false);

  return (
    <footer ref={ref} className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo />
            <p style={{ color: "rgba(255, 255, 255, 0.7)", marginTop: 20, maxWidth: 34 + "ch" }}>
              Digital strategy and technology solutions for transportation &amp; logistics.
            </p>
            <h4 style={{ marginTop: 36 }}>Let&apos;s stay in touch</h4>
            {sent ? (
              <p className="accent">Thanks, you&apos;re on the list.</p>
            ) : (
              <form
                className="news"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <input type="email" required placeholder="Your email" aria-label="Email for newsletter" />
                <button type="submit" aria-label="Subscribe">
                  <ArrowRight />
                </button>
              </form>
            )}
          </div>
          <div>
            <h4>Navigate</h4>
            <ul>
              {[
                ["/", "Home"],
                ["/services", "Services"],
                ["/about-us", "About us"],
                ["/resources", "Resources"],
                ["/contact", "Get in touch"],
              ].map(([h, l]) => (
                <li key={h}>
                  <Link href={h}>{l}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="addr">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>{contact.phone}</a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li style={{ color: "rgba(255, 255, 255, 0.7)", marginTop: 20 }}>
                {contact.address.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <motion.div style={{ y, marginTop: "clamp(48px,7vw,100px)" }}>
          <ParticleText lines={WM} colors={WM_COLORS} height="clamp(80px, 13vw, 220px)" radius={110} density={34} />
        </motion.div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Logistics Studio. All rights reserved.</span>
          <span>Innovate. Automate. Predict.</span>
        </div>
      </div>
    </footer>
  );
}
