"use client";

import Link from "next/link";
import { contact, services } from "@/lib/data";
import { Logo } from "./Navbar";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo />
            <p style={{ color: "rgba(255, 255, 255, 0.7)", marginTop: 20, maxWidth: 34 + "ch" }}>
              Digital strategy and technology solutions for transportation &amp; logistics.
            </p>
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

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Logistics Studio. All rights reserved.</span>
          <span>Innovate. Automate. Predict.</span>
        </div>
      </div>
    </footer>
  );
}
