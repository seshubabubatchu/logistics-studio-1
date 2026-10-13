export type EdiArea = {
  num: string;
  title: string;
  anchor: string;
  phase: "PLAN" | "CONNECT" | "PROVE" | "RUN" | "EVOLVE";
  whatItIs: string;
  whoItsFor: string;
  howWeDeliver: string | string[];
  whyItMatters: string;
  checklist?: string[];
  steps?: string[];
  tiles?: { title: string; desc: string }[];
  tags?: string[];
};

export type ServiceItem = {
  slug: string;
  index: string;
  title: string;
  short: string;
  bestFit: string;
  kicker: string;
  headline: string;
  intro: string;
  whoItsFor: string;
  howWeDeliver: string;
  whyItMatters: string;
  hue: string;
  tools?: string[];
  capabilities?: string[];
};

export const EDI_PHASES = ["PLAN", "CONNECT", "PROVE", "RUN", "EVOLVE"] as const;

export const ediAreas: EdiArea[] = [
  {
    num: "01",
    title: "EDI Strategy & Assessment",
    anchor: "strategy-assessment",
    phase: "PLAN",
    whatItIs: "A review of how your EDI works today, and a plan for where it should go.",
    whoItsFor:
      "Companies whose EDI has grown one partner at a time and now feels fragile, expensive or hard to change. Also companies about to choose or replace a platform.",
    howWeDeliver:
      "We list every trading partner, document type, map and connection you run. We look at error rates, manual workarounds, VAN charges and platform licences. You get a written assessment covering what to keep, what to fix first, and whether a platform change or VAN reduction makes sense.",
    whyItMatters:
      "Most EDI problems are hidden until a big customer goes live or a key engineer leaves. An assessment shows you the risk and the cost before either of those happens.",
  },
  {
    num: "02",
    title: "Trading Partner Onboarding",
    anchor: "onboarding",
    phase: "CONNECT",
    whatItIs: "Connecting a new trading partner, from first contact through testing, certification and go live.",
    whoItsFor:
      "Companies adding carriers, shippers, vendors, retailers or other 3PLs who need the connection working without disturbing the partners already live.",
    howWeDeliver:
      "A structured six-step onboarding lifecycle executed by engineers who know partner specs and logistics timelines.",
    steps: [
      "Collect the partner's implementation guide and agree on documents, versions and timing.",
      "Set up the partner profile, IDs and qualifiers on your platform.",
      "Set up the connection (AS2, SFTP, VAN or API) and exchange certificates or keys.",
      "Build or adapt the maps for each document.",
      "Run test cycles with real world sample data until the partner signs off.",
      "Go live with close watch on the first days of production traffic.",
    ],
    whyItMatters:
      "A slow onboarding delays revenue from a new customer. A rushed one creates chargebacks and rework from day one. A repeatable process gets partners live correctly the first time.",
  },
  {
    num: "03",
    title: "EDI Mapping & Translation",
    anchor: "mapping",
    phase: "PROVE",
    whatItIs:
      "Building and maintaining the maps that turn a partner's EDI into data your systems understand, and the other way round.",
    whoItsFor:
      "Companies that need new maps, changes to existing maps when a partner updates its spec, or a cleanup of maps that nobody has touched in years.",
    howWeDeliver:
      "Our engineers write and test maps every day in BizTalk Server, Cleo, IBM Sterling B2B Integrator and CData. We work across X12 and other formats. Every map is tested against the partner's guide, including edge cases like split shipments, partial receipts and multi stop loads. We document each map so your team isn't dependent on one person's memory.",
    whyItMatters:
      "EDI is strict about format, sequence and acknowledgment. A map that is almost right still gets rejected. Maps built by people who know both EDI and logistics hold up under real volumes and partner audits.",
  },
  {
    num: "04",
    title: "EDI Integration with ERP, WMS and TMS",
    anchor: "integration",
    phase: "CONNECT",
    whatItIs:
      "Connecting EDI to the systems that actually run your operation, so documents flow in and out with no re keying.",
    whoItsFor:
      "Companies where an ASN or load tender still arrives as EDI but gets typed into the WMS or TMS by hand. Also companies changing their ERP, WMS or TMS.",
    howWeDeliver:
      "We build the integration layer between your EDI platform and your business systems. That includes database and file integrations, message queues and APIs. We also build API to EDI bridges, so a partner that only offers REST or JSON can still trade with an EDI based process, and the other way round.",
    whyItMatters:
      "EDI only saves money if the data lands in the right system automatically. Manual entry brings back the delays and errors EDI was meant to remove.",
  },
  {
    num: "05",
    title: "Communication & Connectivity",
    anchor: "connectivity",
    phase: "CONNECT",
    whatItIs: "Setting up and running the secure connections EDI travels over.",
    whoItsFor: "Any company exchanging EDI with partners that each insist on a different connection method.",
    howWeDeliver: "We set up, secure and maintain all primary communication channels across your partner network.",
    tiles: [
      { title: "AS2", desc: "Certificate management and MDN receipts" },
      { title: "SFTP & FTPS", desc: "Key management and folder conventions per partner" },
      { title: "VAN connections", desc: "Mailbox setup and moving partners off a VAN where a direct link is cheaper" },
      { title: "APIs & HTTPS", desc: "Web services for partners that have moved beyond traditional EDI" },
      { title: "Managed File Transfer", desc: "Secure MFT orchestration through platforms such as Cleo" },
    ],
    whyItMatters:
      "A certificate that expires on a Friday night can stop every shipment to a major customer. Connectivity is the part of EDI everyone forgets until it fails, so we track expiry dates and renewals for you.",
  },
  {
    num: "06",
    title: "Testing, Certification & Compliance",
    anchor: "testing-compliance",
    phase: "PROVE",
    whatItIs:
      "Proving that every document meets the partner's rules before it reaches production, and keeping it compliant afterwards.",
    whoItsFor:
      "Companies facing partner certification, retailer compliance programmes, or chargebacks for late or wrong ASNs and invoices.",
    howWeDeliver:
      "We check syntax and structure against the partner's implementation guide. We manage acknowledgments (997, 999 and TA1) so nothing is assumed to have arrived. We run end to end tests with realistic data, including the awkward cases, and we keep test scripts so re certification after a partner change is quick.",
    tags: ["997 Functional Acknowledgment", "999 Implementation Acknowledgment", "TA1 Interchange Acknowledgment"],
    whyItMatters:
      "Compliance failures cost money directly through chargebacks and fines. They also cost goodwill with partners who expect EDI to just work.",
  },
  {
    num: "07",
    title: "EDI Support & Monitoring",
    anchor: "support-monitoring",
    phase: "RUN",
    whatItIs: "Day to day support for live EDI watching transactions, catching failures and fixing them.",
    whoItsFor:
      "Companies running live EDI that need someone keeping documents moving and solving problems before customers notice.",
    howWeDeliver:
      "Proactive daily monitoring, exception resolution, and continuous partner coordination to keep documents moving smoothly.",
    checklist: [
      "Transaction monitoring with alerts for failed, stuck or missing documents",
      "Error and exception handling, including reprocessing and resubmission",
      "Root cause analysis, so the same error doesn't keep coming back",
      "Missing acknowledgment tracking and follow up with partners",
      "Small map and partner profile changes as part of ongoing support",
      "Regular reports on volumes, error rates and partner performance",
    ],
    // Note: Confirm support hours, response time commitments and whether 24/7 cover is offered.
    whyItMatters:
      "A failed EDI document is never just an IT problem. It stops orders, delays invoices and strains partner relationships. Fast support from people who know the platform keeps the business running.",
  },
  {
    num: "08",
    title: "Managed EDI Services",
    anchor: "managed-edi",
    phase: "RUN",
    whatItIs: "We run your entire EDI operation as an outsourced service.",
    whoItsFor:
      "Companies that want EDI to work reliably but don't want to hire, train and keep a specialist in house team.",
    howWeDeliver:
      "We take ownership of onboarding, mapping, connectivity, monitoring and support under one agreement, with a named team that knows your partners. You keep full visibility through regular reporting and a single point of contact.",
    // Note: Confirm commercial model (fixed monthly fee, per partner, or per transaction volume).
    whyItMatters:
      "EDI skills are hard to hire and harder to keep. A managed service removes the single person risk and turns an unpredictable cost into a planned one.",
  },
  {
    num: "09",
    title: "EDI Migration & Modernization",
    anchor: "migration",
    phase: "EVOLVE",
    whatItIs:
      "Moving EDI from old platforms, ageing VAN arrangements or home grown scripts to a modern setup, without breaking live trading.",
    whoItsFor:
      "Companies on older BizTalk Server versions, legacy Cleo or Sterling installs, or in house EDI code that only one person understands.",
    howWeDeliver:
      "We list what exists, rebuild maps and partner profiles on the target platform, run old and new side by side, and move partners across in planned waves. That can mean a platform upgrade, a move to the cloud, replacing a VAN with direct AS2 or SFTP, or adding APIs alongside EDI.",
    whyItMatters:
      "Legacy EDI is often the riskiest system a logistics company runs, because everything depends on it and few people still understand it. A phased migration lowers that risk without a big bang cutover.",
  },
];

export const ediPlatforms = [
  {
    name: "BizTalk Server",
    whatWeDo: "Integration and orchestration, including older BizTalk environments that many logistics companies still run",
  },
  {
    name: "Cleo",
    whatWeDo: "B2B and EDI integration, managed file transfer",
  },
  {
    name: "IBM Sterling B2B Integrator",
    whatWeDo: "High volume B2B and EDI processing, trading partner management",
  },
  {
    name: "CData",
    whatWeDo: "Connectivity and data integration across systems and formats",
  },
];

export const standardsCategories = [
  {
    area: "Truckload and LTL",
    documents: [
      { code: "204", name: "Load Tender" },
      { code: "990", name: "Response to Load Tender" },
      { code: "214", name: "Shipment Status" },
      { code: "210", name: "Freight Invoice" },
      { code: "211", name: "Bill of Lading" },
    ],
  },
  {
    area: "Ocean and intermodal",
    documents: [
      { code: "300", name: "Booking Request" },
      { code: "301", name: "Booking Confirmation" },
      { code: "304", name: "Shipping Instructions" },
      { code: "310", name: "Freight Receipt and Invoice" },
      { code: "315", name: "Container Status" },
      { code: "322", name: "Terminal Operations" },
    ],
  },
  {
    area: "Rail and customs",
    documents: [
      { code: "404", name: "Rail Shipment Information" },
      { code: "309", name: "Customs Manifest" },
    ],
  },
  {
    area: "Warehousing",
    documents: [
      { code: "940", name: "Warehouse Shipping Order" },
      { code: "945", name: "Warehouse Shipping Advice" },
      { code: "943", name: "Stock Transfer Shipment Advice" },
      { code: "944", name: "Stock Transfer Receipt Advice" },
      { code: "947", name: "Inventory Adjustment" },
      { code: "846", name: "Inventory Advice" },
      { code: "861", name: "Receiving Advice" },
    ],
  },
  {
    area: "Orders and retail",
    documents: [
      { code: "850", name: "Purchase Order" },
      { code: "855", name: "PO Acknowledgment" },
      { code: "860", name: "PO Change" },
      { code: "856", name: "Advance Ship Notice" },
      { code: "830", name: "Planning Schedule" },
      { code: "852", name: "Product Activity" },
    ],
  },
  {
    area: "Finance",
    documents: [
      { code: "810", name: "Invoice" },
      { code: "812", name: "Credit/Debit Adjustment" },
      { code: "820", name: "Payment and Remittance Advice" },
    ],
  },
  {
    area: "Acknowledgments",
    documents: [
      { code: "997", name: "Functional Acknowledgment" },
      { code: "999", name: "Implementation Acknowledgment" },
      { code: "TA1", name: "Interchange Acknowledgment" },
    ],
  },
];

export const services: ServiceItem[] = [
  {
    slug: "edi-services",
    index: "01",
    title: "EDI Services",
    short: "Every part of EDI, from onboarding a new trading partner to support, mapping, integration and platform migration",
    bestFit: "3PLs, freight and warehousing teams with many trading partners",
    kicker: "EDI Services",
    headline: "We cover the whole EDI lifecycle",
    intro:
      "We cover the whole EDI lifecycle planning, onboarding, mapping, integration, connectivity, testing, support, full management and modernization. A logistics company might trade with 40 partners or 400. Each partner has its own spec, its own preferred connection and its own idea of what \"on time\" means. Most providers handle one part of that. We handle all of it, on the platforms you already run.",
    whoItsFor:
      "3PLs, freight forwarders, carriers and warehouse operators that send and receive large volumes of EDI with customers, carriers, vendors and retailers.",
    howWeDeliver:
      "Comprehensive end-to-end delivery across 10 specialized areas, supported by 400 domain engineers with 14 years of logistics experience.",
    whyItMatters:
      "EDI is the backbone of your supply chain operations. Handling every phase with domain experts prevents costly chargebacks, onboarding delays, and system outages.",
    hue: "#1368F6",
    capabilities: [
      "Strategy & Assessment",
      "Trading Partner Onboarding",
      "Mapping & Translation",
      "ERP, WMS & TMS Integration",
      "Communication & Connectivity",
      "Testing & Compliance",
      "Support & Monitoring",
      "Managed EDI",
      "Migration & Modernization",
      "Multi-Platform Support",
    ],
  },
  {
    slug: "strategy-and-development",
    index: "02",
    title: "Strategy & Development",
    short: "Technology roadmaps, architecture and custom software, planned and built by the same team",
    bestFit: "Companies planning a new platform or a large technology investment",
    kicker: "Strategy & Development",
    headline: "Technology planning and custom software for logistics operations",
    intro:
      "Technology planning and custom software for logistics operations, from roadmap and architecture through to build.",
    whoItsFor:
      "3PL, freight and warehousing companies planning a new platform, a customer portal, or a major technology investment. These teams want a partner who understands the business, not just the code.",
    howWeDeliver:
      "Architects with logistics experience work with our development teams, so the plan and the build come from one partner. We build in Java and Spring Boot, Python, Ruby on Rails, React, and native mobile for iOS and Android. Infrastructure is managed as code in Terraform.",
    whyItMatters:
      "When the strategy firm and the build team are different companies, a lot gets lost in the handover. One team that owns both delivers what was actually planned.",
    hue: "#C6FF3D",
    tools: ["Java & Spring Boot", "Python", "Ruby on Rails", "React", "iOS & Android", "Terraform"],
    capabilities: ["Technology Planning", "Custom Architecture", "Full-Stack Build", "Customer Portals", "Infrastructure as Code"],
  },
  {
    slug: "dedicated-teams",
    index: "03",
    title: "Dedicated Teams / Staff Augmentation",
    short: "Engineers who already know logistics, working inside your team",
    bestFit: "Teams that need more capacity without a long ramp up",
    kicker: "Dedicated Teams / Staff Augmentation",
    headline: "Experienced engineers who already understand logistics, working as part of your team.",
    intro:
      "Experienced engineers who already understand logistics, working as part of your team.",
    whoItsFor:
      "Logistics companies that need more engineering capacity quickly and don't want to spend months teaching new people what an ASN or a load tender is.",
    howWeDeliver:
      "We draw from our 400 engineer bench, built over 14 years in this industry. Engineers come in already familiar with EDI, freight and warehousing systems. You can add a single specialist or a full team with its own lead, and change the size of the team as your workload changes.",
    whyItMatters:
      "Generalist contractors take time to learn the domain, and you pay for that learning. Domain experienced engineers are productive from the first sprint.",
    hue: "#5B8CFF",
    capabilities: ["Domain-Fluent Engineers", "Flexible Team Sizing", "Dedicated Leads", "Fast Ramp-Up", "Freight & WMS Fluency"],
  },
  {
    slug: "data-science",
    index: "04",
    title: "AI & Data Science",
    short: "Forecasting, pattern detection and automation built on your operational data",
    bestFit: "Freight forwarders and warehouse operators",
    kicker: "AI & Data Science",
    headline: "Applied AI and data science for freight and warehouse operations.",
    intro:
      "Applied AI and data science for freight and warehouse operations.",
    whoItsFor:
      "Freight forwarders and warehouse operators who want to move from reacting to problems to predicting them.",
    howWeDeliver:
      "We start with the operational data you already have, much of which flows through EDI and your TMS and WMS. From there we build models and automation for forecasting, spotting patterns and exceptions, and cutting manual work. Where it fits, we use platforms such as IBM watsonx.",
    whyItMatters:
      "Logistics produces huge amounts of data that rarely gets used beyond reporting. Using it well means fewer surprises, better planning and fewer people doing repetitive work.",
    hue: "#FF8A3D",
    tools: ["IBM watsonx", "Python", "Predictive Modeling", "TMS/WMS Analytics", "Pattern Detection"],
    capabilities: ["Operational Forecasting", "Pattern & Exception Detection", "Automated Workflows", "IBM watsonx Integration"],
  },
  {
    slug: "legacy-migration",
    index: "05",
    title: "Legacy Migration & Modernization",
    short: "Moving off ageing applications and integration platforms without breaking live operations",
    bestFit: "Companies on older BizTalk, Cleo or in house EDI systems",
    kicker: "Legacy Migration & Modernization",
    headline: "Moving from ageing applications and integration platforms to modern technology.",
    intro:
      "Moving from ageing applications and integration platforms to modern technology.",
    whoItsFor:
      "Companies running core operations on older BizTalk, Cleo or in house systems that are expensive to maintain and hard to change.",
    howWeDeliver:
      "We know the legacy platforms well (BizTalk Server, Cleo, IBM Sterling B2B Integrator) and we know the modern stack that replaces them. We migrate in phases, run old and new side by side, and switch over only when the new system is proven, so live operations and trading partners are never put at risk.",
    whyItMatters:
      "Waiting on legacy systems gets more expensive each year as skills disappear and vendors end support. A planned migration is cheaper and safer than an emergency one.",
    hue: "#B28CFF",
    tools: ["BizTalk Server", "Cleo", "IBM Sterling B2B Integrator", "Cloud Architectures", "Modern APIs"],
    capabilities: ["Phased Migration", "Dual-Run Side-by-Side", "Legacy Decommissioning", "Zero-Disruption Cutover"],
  },
  {
    slug: "supply-chain-sustainability",
    index: "06",
    title: "Supply Chain Sustainability",
    short: "Technology support for sustainability commitments",
    bestFit: "Logistics companies with emissions or reporting targets",
    kicker: "Supply Chain Sustainability",
    headline: "Technology that helps logistics companies meet their sustainability commitments.",
    intro:
      "Technology that helps logistics companies meet their sustainability commitments.",
    whoItsFor:
      "Logistics companies with emissions targets, customer sustainability requirements or reporting obligations.",
    // Note: Confirm the current scope of this service with stakeholders.
    howWeDeliver:
      "We help capture emissions data, provide compliance reporting, optimize routes and load capacity, and extract sustainability metrics from partner EDI and telematics.",
    whyItMatters:
      "Shippers increasingly choose logistics partners partly on sustainability performance. Reliable data and reporting are becoming a commercial requirement.",
    hue: "#9BE15D",
    capabilities: ["Emissions Data Capture", "Regulatory Reporting", "Route & Load Optimization", "Telematics & EDI Metrics"],
  },
];

export const OLD_SLUG_REDIRECTS: Record<string, string> = {
  "ibm-sterling-b2b-integrator": "edi-services",
  "ibmwatsonx": "legacy-migration",
};

export const howWeWorkModels = [
  {
    model: "Project",
    howItWorks: "Fixed scope and timeline, delivered by our team",
    goodFor: "A platform migration, a batch of partner onboardings, a new integration",
  },
  {
    model: "Dedicated team",
    howItWorks: "A team assigned to you, working to your priorities",
    goodFor: "Ongoing development and long term product work",
  },
  {
    model: "Managed service",
    howItWorks: "We own the outcome under an ongoing agreement",
    goodFor: "EDI support and monitoring, or fully managed EDI",
  },
];

export const howWeWorkSteps = [
  {
    name: "Discover",
    desc: "We learn your operation, partners, systems and pain points.",
  },
  {
    name: "Plan",
    desc: "We agree scope, priorities, timeline and how success will be measured.",
  },
  {
    name: "Build",
    desc: "We deliver in short cycles, so you see progress early.",
  },
  {
    name: "Test and go live",
    desc: "We test with your partners and real data, then go live with close support.",
  },
  {
    name: "Support and improve",
    desc: "We stay on to monitor, fix and improve, either as a managed service or alongside your team.",
  },
];

export const whyLogisticsStudio = [
  {
    title: "Logistics only, for 14 years.",
    desc: "We don't split our attention across banking, retail and healthcare. Everything we've learned has come from logistics.",
  },
  {
    title: "400 engineers who know the domain.",
    desc: "Our people understand freight, warehousing and EDI as well as they understand code.",
  },
  {
    title: "The whole EDI lifecycle under one roof.",
    desc: "Strategy, onboarding, mapping, integration, connectivity, testing, support, managed service and migration, all from one partner.",
  },
  {
    title: "Experience on the platforms you actually run.",
    desc: "That includes BizTalk Server, Cleo, IBM Sterling B2B Integrator and CData, older versions included.",
  },
  {
    title: "Old and new together.",
    desc: "We keep legacy systems running and build what replaces them, so you never have to choose between stability and progress.",
  },
];

export const docClosingCTA = {
  title: "Talk to our logistics technology team",
  text: "If you have a trading partner waiting to go live, an EDI setup that keeps you up at night, or a platform you need to move off, talk to us. We'll start by understanding how your operation actually works.",
  button: "Get in touch",
};
