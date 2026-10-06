"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contact } from "@/lib/data";
import { Button, PageHero, Reveal } from "./ui";

export default function ContactView() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState("");
  return (
    <>
      <PageHero kicker="Get in touch" title="Let's move your business forward" hue="#C6FF3D" />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <Reveal>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="feature-card" style={{ padding: 56 }}>
                <h2 className="h-md accent">Message received.</h2>
                <p style={{ marginTop: 14 }}>Thanks for reaching out. A Logistics Studio consultant will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="row2">
                  <div className="field">
                    <input id="name" required placeholder=" " />
                    <label htmlFor="name">Your name</label>
                  </div>
                  <div className="field">
                    <input id="company" placeholder=" " />
                    <label htmlFor="company">Company</label>
                  </div>
                </div>
                <div className="row2">
                  <div className="field">
                    <input id="email" type="email" required placeholder=" " />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className={`field${topic ? " filled" : ""}`}>
                    <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} style={{ paddingTop: 22 }}>
                      <option value="" disabled hidden />
                      <option>Strategy & Development</option>
                      <option>Dedicated Teams</option>
                      <option>Data Science</option>
                      <option>IBM Sterling B2B Integrator</option>
                      <option>Supply Chain Sustainability</option>
                      <option>IBM watsonx</option>
                      <option>Free tech stack assessment</option>
                    </select>
                    <label htmlFor="topic">I&apos;m interested in</label>
                  </div>
                </div>
                <div className="field">
                  <textarea id="msg" required placeholder=" " />
                  <label htmlFor="msg">Tell us about your project</label>
                </div>
                <div>
                  <button type="submit" className="btn">
                    <span>Send message</span>
                  </button>
                </div>
              </form>
            )}
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <div className="info-item">
                <small>Phone</small>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>{contact.phone}</a>
              </div>
              <div className="info-item">
                <small>Email</small>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              <div className="info-item">
                <small>Location</small>
                <p>
                  {contact.address.map((l) => (
                    <span key={l} style={{ display: "block" }}>
                      {l}
                    </span>
                  ))}
                </p>
              </div>
              <div style={{ marginTop: 32 }}>
                <Button href="/services" ghost>
                  Browse services
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
