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
  { t: "Strategy Solutions", d: "A unique discovery process produces a technology plan, then we design software that turns goals into reality." },
  { t: "Development & Design", d: "From Android and iOS apps to full-fledged custom logistics software and every integration between. Built for the road, the office and the C-suite." },
  { t: "Transformation & Automation", d: "Migrate legacy systems to the cloud, tackle your integrations checklist, and bring machine learning and AI into the tools your team uses daily." },
  { t: "Agile & Supportive", d: "A team rooted in agile practice and a deep understanding of transportation and logistics. We identify problems fast and solve them together." },
];
