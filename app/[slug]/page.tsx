import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import EDIServicePage from "@/components/EDIServicePage";
import ClientRedirect from "@/components/ClientRedirect";
import { services, OLD_SLUG_REDIRECTS } from "@/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  const serviceParams = services.map((s) => ({ slug: s.slug }));
  const redirectParams = Object.keys(OLD_SLUG_REDIRECTS).map((slug) => ({ slug }));
  return [...serviceParams, ...redirectParams];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug in OLD_SLUG_REDIRECTS) {
    return { title: "Redirecting... | Logistics Studio" };
  }
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.title} | Logistics Studio`,
    description: s.short,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Handle redirects from old slugs
  if (slug in OLD_SLUG_REDIRECTS) {
    const target = OLD_SLUG_REDIRECTS[slug];
    return <ClientRedirect to={target} />;
  }

  // Handle EDI Services (the one page for all EDI content)
  if (slug === "edi-services") {
    return <EDIServicePage />;
  }

  // Handle the other 5 service pages
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  return <ServicePage s={s} />;
}
