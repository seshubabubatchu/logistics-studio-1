import type { Metadata } from "next";
import { CTA, PageHero, Parallax, ParallaxBand, Reveal, ScrollWords, SplitHeading } from "@/components/ui";
import { Visual } from "@/components/ServicePage";
import { whyLogisticsStudio, docClosingCTA } from "@/data/services";

export const metadata: Metadata = {
  title: "About us | Logistics Studio",
  description:
    "For 14 years, Logistics Studio has built technology exclusively for logistics. 400 domain engineers supporting 3PLs, freight forwarders, and carriers.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="About us"
        title="14 years. One industry. Logistics only."
        text="For 14 years, Logistics Studio has built technology for one industry only: logistics. We work with 3PLs, freight forwarders, warehouse operators and last-mile carriers."
        hue="#1368F6"
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div className="big-stat accent" style={{ color: "var(--brand-blue)" }}>14</div>
              <p className="lead" style={{ marginTop: 10 }}>
                years exclusively dedicated to transportation &amp; logistics.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 20 }}>
              <div className="big-stat" style={{ color: "var(--brand-orange)" }}>400</div>
              <p className="lead" style={{ marginTop: 10 }}>
                engineers who know the code and understand the freight domain.
              </p>
            </div>
          </div>
          <ScrollWords
            className="statement"
            text="Our team knows how a load tender, an ASN or a freight invoice moves through a business. We handle every phase of your technology lifecycle, from day-one partner onboarding to complete platform modernization."
          />
        </div>
      </section>

      <ParallaxBand a="Logistics Only" b="400 Engineers" />

      <section className="section">
        <div className="container split">
          <Parallax range={50}>
            <Visual hue="#5B8CFF" label="Why Logistics Studio" />
          </Parallax>
          <div>
            <div className="eyebrow">Our focus</div>
            <SplitHeading text="Built from domain experience" className="h-lg" />
            <Reveal delay={0.1}>
              <p className="lead" style={{ margin: "28px 0 20px" }}>
                We don&apos;t split our attention across banking, retail and healthcare. Everything we have built and learned has come from logistics operations.
              </p>
              <p className="lead">
                From high-volume EDI integration on BizTalk, Cleo and IBM Sterling, to cloud migrations, dedicated teams, and applied AI, we keep systems running and build what replaces them.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div className="eyebrow">Why Logistics Studio</div>
          <SplitHeading text="Five core principles of our work" className="h-lg" />
          <div className="values" style={{ marginTop: 56 }}>
            {whyLogisticsStudio.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="feature-card">
                  <span className="fi">0{i + 1}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title={docClosingCTA.title}
        text={docClosingCTA.text}
        button={docClosingCTA.button}
      />
    </>
  );
}
