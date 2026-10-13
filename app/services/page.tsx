import type { Metadata } from "next";
import { CTA, PageHero } from "@/components/ui";
import ServicesView from "@/components/ServicesView";
import { docClosingCTA } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Logistics Studio",
  description:
    "Logistics-only technology services: EDI Services across 10 areas, Strategy & Development, Dedicated Teams, AI & Data Science, Legacy Migration, and Supply Chain Sustainability.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Built for how freight really moves"
        text="For 14 years, Logistics Studio has built technology for one industry only: logistics. We offer six specialized service lines across the full supply chain lifecycle."
        hue="#1368F6"
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ServicesView />
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
