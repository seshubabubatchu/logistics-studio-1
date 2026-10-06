export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  kicker: string;
  headline: string;
  intro: string;
  hue: string;
  points: { t: string; d: string }[];
  list: string[];
  benefitsTitle: string;
  benefits: { t: string; d: string }[];
  cta: { title: string; text: string; button: string };
};

export const services: Service[] = [
  {
    slug: "strategy-and-development",
    index: "01",
    title: "Strategy & Development",
    short: "Rapid prototyping, strategy roadmaps and technology consulting built around how your supply chain really runs.",
    kicker: "Strategy & Development",
    headline: "Don't invest in technology that doesn't fit.",
    intro:
      "A 'one size fits all' solution means paying for features you may never use. With a collective 75+ years in logistics technology, we build a roadmap that takes your business exactly where it needs to go, cost-effectively.",
    hue: "#C6FF3D",
    points: [
      { t: "Discover", d: "A deep-dive discovery sprint to understand what brought you to us. By the end, you hold a go-forward technology roadmap." },
      { t: "Design", d: "Rapid prototypes and architecture that align business goals with technology, from security to scalability." },
      { t: "Develop", d: "Agile delivery from mobile apps for Android and iOS to full, customized transportation and logistics software." },
      { t: "Deliver", d: "Guidance through implementation, so the strategy lands in production and keeps evolving." },
    ],
    list: ["Development", "Rapid Prototyping", "Strategy Roadmaps", "Technology Consulting"],
    benefitsTitle: "Logistics solutions, delivered",
    benefits: [
      { t: "Listen first", d: "Your needs matter as much as any technical concern. We start every project by truly understanding them." },
      { t: "Not from scratch", d: "Our teams have worked with some of the most recognizable names in the industry and start from advanced understanding." },
      { t: "Tailored, not templated", d: "A roadmap sized to your operation, avoiding the cost of features you do not need." },
    ],
    cta: { title: "Ready to map your roadmap?", text: "Book a discovery sprint and leave with a clear, go-forward technology plan.", button: "Start discovery" },
  },
  {
    slug: "dedicated-teams",
    index: "02",
    title: "Dedicated Teams",
    short: "Staff augmentation that behaves like an extension of your own engineering team, with logistics fluency built in.",
    kicker: "Dedicated Teams",
    headline: "More than staff augmentation.",
    intro:
      "Dedicated teams operate as an extension of your internal technology staff. They bring years of collective logistics experience, so you launch new initiatives without the steep learning curve of new hires.",
    hue: "#5B8CFF",
    points: [
      { t: "Implementation", d: "Experts who understand logistics operations and need very little time to start delivering value." },
      { t: "Product development & integration", d: "Ongoing development, integrations and troubleshooting support, all in one collaborative team." },
      { t: "Support & maintenance", d: "Scalable 24-hour outsourced offshore support sized to your need." },
      { t: "Continuous improvement", d: "We draw on supply chain expertise to suggest and implement innovative solutions and best practices." },
    ],
    list: ["Ongoing, Long-Term Support and Maintenance", "Product Development & Integration", "Implementation", "Support & Maintenance", "Continuous Improvement"],
    benefitsTitle: "Benefits of staff augmentation",
    benefits: [
      { t: "Ramp up quickly", d: "Skip the time-consuming, costly hiring and training cycle, especially during peak periods." },
      { t: "Scale on demand", d: "Flex resources up or down to ensure optimal allocation without costly delays." },
      { t: "Transparent by default", d: "Communication, transparency and a commitment to excellence in every engagement." },
    ],
    cta: { title: "Need a team that already speaks logistics?", text: "Tell us the capacity you need. We will shape a team around it.", button: "Build my team" },
  },
  {
    slug: "data-science",
    index: "03",
    title: "Data Science",
    short: "Clean, model and predict. Turn operational data into answers about carriers, routes and revenue.",
    kicker: "Data Science",
    headline: "How you harness your data matters.",
    intro:
      "We collect, clean, organize and analyze large data sets to identify business problems and develop actionable insights, reducing the risk of fraud or error and improving efficiency and customer service.",
    hue: "#FF8A3D",
    points: [
      { t: "Measure efficiency", d: "Diagnostic analytics through dashboards and reports to gauge performance against competitors and long-term trends." },
      { t: "Predict & prescribe", d: "Predictive and prescriptive analytics using Python: cleansing, transformations, aggregations and predictive models." },
      { t: "What-if scenarios", d: "Which clients offer the best revenue growth? Which routes are most in demand? Which carriers underperform?" },
      { t: "Expert toolkit", d: "Python, ETL tools, SSIS, Informatica and Datastage, with reporting in Power BI and Tableau." },
    ],
    list: ["Measure technology projects with direction, iteration and consultation", "A robust team of data scientists, analysts and domain experts", "Machine learning and AI applied to owned data", "Spot patterns, prevent disruptions, operate efficiently"],
    benefitsTitle: "Insight you can act on",
    benefits: [
      { t: "Make key decisions", d: "Intuitive insights that let logistics professionals test the impact of a decision before making it." },
      { t: "Find bottlenecks", d: "High-quality data is the basis for measuring effectiveness and streamlining bottlenecks of all kinds." },
      { t: "Reduce risk", d: "Minimize or eradicate the risk of fraud or error across your operation." },
    ],
    cta: { title: "What is your data trying to tell you?", text: "Let us run the first analysis and show you what is hiding in plain sight.", button: "Talk to our data team" },
  },
  {
    slug: "ibm-sterling-b2b-integrator",
    index: "04",
    title: "IBM Sterling B2B Integrator",
    short: "Automate 10M+ daily transactions and unify EDI, APIs and partner ecosystems in one scalable gateway.",
    kicker: "IBM Sterling B2B Integrator",
    headline: "Turn B2B chaos into competitive advantage.",
    intro:
      "Say goodbye to manual errors and fragmented systems. Consolidate EDI, APIs and partner ecosystems into one scalable platform that works across hybrid cloud or on-premises environments.",
    hue: "#3DE0C5",
    points: [
      { t: "Simplify", d: "Automate data transformation, compliance and partner onboarding." },
      { t: "Secure", d: "Protect sensitive data with enterprise-grade encryption and certified containers." },
      { t: "Scale", d: "Handle 10M+ daily transactions with IBM Sterling Global Mailbox for unmatched uptime." },
      { t: "Connect", d: "AS1-AS4, SFTP/S, HTTP/S, SMTP, WebDAV, RosettaNet, SSL, SSH and web services." },
    ],
    list: ["Certified containers for rapid deployment", "Comprehensive protocol support", "Effortless scalability", "Security compliance"],
    benefitsTitle: "Why it matters",
    benefits: [
      { t: "Cut costs", d: "Consolidate legacy systems into one unified gateway for B2B transactions." },
      { t: "See everything", d: "End-to-end visibility for faster decision-making." },
      { t: "Stay agile", d: "Hybrid deployment and AI-ready architecture. Installation and patching drop from hours to minutes." },
    ],
    cta: { title: "Discover how APIs supercharge EDI", text: "Get the full business value report and see what a unified B2B gateway can do.", button: "Contact us" },
  },
  {
    slug: "supply-chain-sustainability",
    index: "05",
    title: "Supply Chain Sustainability",
    short: "Mitigate disruption with speed and confidence, and build resilient, sustainable supply chains with AI.",
    kicker: "Supply Chain Sustainability",
    headline: "Act with speed. Build resilience.",
    intro:
      "Next-generation supply chain solutions designed to transform operations, enhance user experiences and drive competitive advantage, from AI-powered decision-making to end-to-end visibility.",
    hue: "#9BE15D",
    points: [
      { t: "Partner data exchange", d: "Seamless supply chain partner data exchange across your network." },
      { t: "Procurement & inventory", d: "Smarter procurement and inventory management with real-time intelligence." },
      { t: "Agility & transparency", d: "Operational agility and transparency across every operation." },
      { t: "Order fulfillment", d: "Intelligent omnichannel order fulfillment optimization." },
    ],
    list: ["Partner data exchange", "Procurement and inventory management", "Agility and transparency", "Omnichannel fulfillment optimization"],
    benefitsTitle: "Benefits",
    benefits: [
      { t: "Deliver with precision", d: "Get customers what they need, when and where they need it, while maintaining business continuity." },
      { t: "Improve forecasting", d: "Real-time intelligence that cuts disruption mitigation time from days to hours." },
      { t: "Adapt to change", d: "Sense and respond to market shifts instantly and evolve your supply chain planning." },
    ],
    cta: { title: "Take the next step", text: "Schedule a one-on-one consultation with a Logistics Studio consultant who can make your supply chain smarter with AI.", button: "Book a meeting" },
  },
  {
    slug: "ibmwatsonx",
    index: "06",
    title: "IBM watsonx",
    short: "An open, targeted and trusted AI platform to train, govern and deploy AI across your organization.",
    kicker: "IBM watsonx",
    headline: "Drive business innovation with trusted AI.",
    intro:
      "IBM watsonx is a next-generation AI platform that combines artificial intelligence with the expertise of IBM's data scientists and developers, helping organizations unlock the full potential of AI.",
    hue: "#B28CFF",
    points: [
      { t: "watsonx.ai", d: "Train, validate, tune and deploy generative AI, foundation models and machine learning with ease." },
      { t: "watsonx.governance", d: "Direct, manage and monitor AI activity: model management, monitoring, risk assessment and compliance." },
      { t: "watsonx.data", d: "Simplify complex data landscapes, eliminate silos and optimize workloads for price-performance." },
      { t: "IBM Granite", d: "A family of AI models built for business to drive trust and scalability in AI applications." },
    ],
    list: ["watsonx.ai", "watsonx.governance", "watsonx.data", "IBM Granite models"],
    benefitsTitle: "An AI platform you can trust",
    benefits: [
      { t: "Open", d: "Foundation models and open-source options that avoid lock-in." },
      { t: "Targeted", d: "Solutions designed for business use cases, not generic demos." },
      { t: "Trusted", d: "Governance, risk and compliance built into the platform from day one." },
    ],
    cta: { title: "Put AI to work in your supply chain", text: "We help you pick the right watsonx components and get them into production.", button: "Explore with us" },
  },
];

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
