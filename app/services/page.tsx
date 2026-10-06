import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { CTA, PageHero, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description: "Strategy, dedicated teams, data science, IBM Sterling, supply chain sustainability and watsonx for logistics.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Built for how freight really moves"
        text="A collaborative product development process for logistics leaders ready to begin their digital transformation journey."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link href={`/${s.slug}`} className="feature-card" style={{ ["--hue" as string]: s.hue, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 380 }}>
                  <span className="fi">{s.index}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                    <span style={{ display: "inline-flex", gap: 8, alignItems: "center", color: s.hue, marginTop: 24 }}>
                      Explore <ArrowUpRight size={18} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTA title="Not sure where to start?" text="Tell us about your stack and we will recommend the right first step." button="Talk to an expert" />
    </>
  );
}
