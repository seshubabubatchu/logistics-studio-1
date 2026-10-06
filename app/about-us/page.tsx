import type { Metadata } from "next";
import { CTA, PageHero, Parallax, ParallaxBand, Reveal, ScrollWords, SplitHeading } from "@/components/ui";
import { Visual } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "About us",
  description: "75+ years of collective logistics technology experience, building practical software for the supply chain.",
};

const values = [
  { t: "Listen first", d: "Your needs matter as much as any technical concern. We start every engagement by understanding them." },
  { t: "Industry fluent", d: "Our people are experts in logistics operations as well as technology, so we ramp up fast." },
  { t: "Agile & collaborative", d: "Agile practices tempered with deep transportation and logistics understanding." },
  { t: "Transparent", d: "Communication, transparency and a commitment to excellence in every aspect of our work." },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="About us"
        title="Logistics people who build technology"
        text="Logistics Studio provides digital strategy and solutions for the transportation & logistics industry."
        hue="#C6FF3D"
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div>
            <div className="big-stat accent">75+</div>
            <p className="lead" style={{ marginTop: 20 }}>
              years of collective experience in logistics technology.
            </p>
          </div>
          <ScrollWords
            className="statement"
            text="We understand the business challenges of the supply chain and offer cost-effective strategy and solutions that meet your unique needs, not one size fits all."
          />
        </div>
      </section>

      <ParallaxBand a="Listen" b="Build" />

      <section className="section">
        <div className="container split">
          <Parallax range={50}>
            <Visual hue="#5B8CFF" label="Our approach" />
          </Parallax>
          <div>
            <div className="eyebrow">Our story</div>
            <SplitHeading text="Start from advanced understanding" className="h-lg" />
            <Reveal delay={0.1}>
              <p className="lead" style={{ margin: "28px 0 20px" }}>
                Our experienced teams have worked on technology projects with some of the most recognizable names in the industry. We start each project from a place of advanced understanding and draw on successful solutions to quickly get to work.
              </p>
              <p className="lead">
                From mobile applications to full custom transportation software, data science and integrations, we are the partner the supply chain can count on.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div className="eyebrow">What drives us</div>
          <SplitHeading text="How we work" className="h-lg" />
          <div className="values" style={{ marginTop: 56 }}>
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08}>
                <div className="feature-card">
                  <span className="fi">0{i + 1}</span>
                  <h3>{v.t}</h3>
                  <p>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Let's build what's next" text="Meet the team and tell us what your supply chain needs." button="Get in touch" />
    </>
  );
}
