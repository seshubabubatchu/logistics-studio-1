export * from "@/data/services";
import { services, type ServiceItem } from "@/data/services";

export type Service = ServiceItem;

export const posts = [
  {
    date: "Nov 24, 2025",
    tag: "Blog",
    title: "From Siloed Tools to Connected Intelligence: The Logistics Studio AI Suite in Action",
    excerpt: "Fragmented teams and disconnected systems cause delays and uneven customer experiences. The challenge isn't understanding the problem. It's implementing the solution.",
  },
  {
    date: "Oct 21, 2025",
    tag: "Blog",
    title: "AI and Cybersecurity in Supply Chains: Friend or Foe?",
    excerpt: "AI can be a vigilant guardian by detecting anomalies and automating defenses, or a dangerous liability if exploited, misled or left unsupervised.",
  },
  {
    date: "Sep 18, 2025",
    tag: "Blog",
    title: "The Hidden Advantage: How Global Resource Centers Transform Logistics Technology Operations",
    excerpt: "Your customer base is global and your services broader than ever. But your technology operations are strained and fragmented. Here's the way out.",
  },
];

export const contact = {
  phone: "+1 (216) 293 7917",
  email: "info@logisticsstudio.com",
  address: ["609 SW 8th Street", "6th Floor", "Bentonville, AR 72712"],
};

export const pillars = [
  {
    t: "Logistics only, for 14 years",
    d: "We don't split our attention across banking, retail and healthcare. Everything we've learned has come from logistics.",
  },
  {
    t: "400 domain-fluent engineers",
    d: "Our people understand freight, warehousing and EDI as well as they understand code. Productive from day one.",
  },
  {
    t: "Whole EDI lifecycle under one roof",
    d: "Planning, onboarding, mapping, integration, connectivity, testing, support, managed service and migration from one team.",
  },
  {
    t: "Old and new together",
    d: "We keep legacy systems running and build what replaces them, so you never have to choose between stability and progress.",
  },
];
