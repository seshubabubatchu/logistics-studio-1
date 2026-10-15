"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface VisualStoryProps {
  slug: string;
  title: string;
  kicker: string;
  hue: string;
}

export default function VisualStory({ slug, title, kicker, hue }: VisualStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Script mapping
  const scriptMap: Record<string, string> = {
    "strategy-and-development": `${basePath}/js/anim-strategy.js`,
    "staff-augmentation": `${basePath}/js/anim-teams.js`,
    "dedicated-teams": `${basePath}/js/anim-teams.js`,
    "ai-and-automation": `${basePath}/js/anim-ai.js`,
    "data-science": `${basePath}/js/anim-ai.js`,
    "legacy-migration": `${basePath}/js/anim-migration.js`,
    "supply-chain-sustainability": `${basePath}/js/anim-sustainability.js`,
  };

  const scriptSrc = scriptMap[slug];

  useEffect(() => {
    // Dynamically load the script if not already present, or re-run init on navigation
    if (!scriptSrc) return;

    let isMounted = true;

    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });
    };

    // Sequential loading: GSAP -> ScrollTrigger -> anim-utils -> anim-[slug]
    const loadAll = async () => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
        await loadScript(`${basePath}/js/anim-utils.js`);
        if (isMounted) {
          // Remove previous story script to allow clean re-init on dynamic route change
          const prevScript = document.querySelector(`script[data-story-script]`);
          if (prevScript) prevScript.remove();

          const s = document.createElement("script");
          s.src = `${scriptSrc}?t=${Date.now()}`;
          s.async = true;
          s.setAttribute("data-story-script", "true");
          document.body.appendChild(s);
        }
      } catch (err) {
        console.warn("Visual story script loader:", err);
      }
    };

    loadAll();

    return () => {
      isMounted = false;
      // Kill ScrollTrigger instances for this section on unmount
      if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
        const triggers = (window as any).ScrollTrigger.getAll();
        triggers.forEach((st: any) => {
          if (st.trigger && containerRef.current && containerRef.current.contains(st.trigger)) {
            st.kill();
          }
        });
      }
    };
  }, [slug, scriptSrc, basePath]);

  if (!scriptSrc) return null;

  return (
    <section
      ref={containerRef}
      className="visual-story"
      data-story={slug}
      style={{ ["--story-hue" as string]: hue }}
    >
      <div className="story-sticky">
        {/* Story Header & Stage Tracking */}
        <div className="story-header container">
          <div className="story-header-top">
            <span className="eyebrow" style={{ color: hue }}>
              Interactive Visual Story
            </span>
            <div className="stage-pills" aria-hidden="true">
              <span className="stage-indicator-pill is-active">01</span>
              <span className="stage-indicator-pill">02</span>
              <span className="stage-indicator-pill">03</span>
              <span className="stage-indicator-pill">04</span>
            </div>
          </div>
          <h2 className="story-headline h-md">
            {slug === "strategy-and-development" && "Stage 1: Discover — Auditing operational workflows & systems"}
            {(slug === "staff-augmentation" || slug === "dedicated-teams") && "Stage 1: Talent Sourcing — Vetting logistics-fluent engineering talent"}
            {(slug === "ai-and-automation" || slug === "data-science") && "Stage 1: Raw Telemetry — Ingesting disparate sensor & EDI streams"}
            {slug === "legacy-migration" && "Stage 1: Legacy Monolith — Rigid mainframe & tight operational coupling"}
            {slug === "supply-chain-sustainability" && "Stage 1: Legacy Routing — Unoptimized deadhead miles & high fuel consumption"}
          </h2>
        </div>

        {/* Story Visual Stage */}
        <div className="story-stage container">
          {/* 1. Strategy & Development Stage */}
          {slug === "strategy-and-development" && (
            <div className="stage-wrap roadmap-wrap">
              <svg className="roadmap-svg" viewBox="0 0 960 440" fill="none" aria-hidden="true">
                <defs>
                  <pattern id="blueprint-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(8, 28, 84, 0.06)" strokeWidth="1" />
                  </pattern>
                  <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <rect width="100%" height="100%" fill="url(#blueprint-grid)" rx="16" />

                {/* Base track */}
                <path
                  className="roadmap-path-base"
                  d="M 50 260 C 180 260 220 160 340 160 C 460 160 480 280 580 280 C 680 280 720 170 880 170"
                  stroke="rgba(8, 28, 84, 0.12)"
                  strokeWidth="4"
                  strokeDasharray="4 6"
                />

                {/* Active drawing glowing track */}
                <path
                  className="roadmap-path-active"
                  d="M 50 260 C 180 260 220 160 340 160 C 460 160 480 280 580 280 C 680 280 720 170 880 170"
                  stroke="var(--brand-orange)"
                  strokeWidth="4"
                  filter="url(#glow-filter)"
                />

                {/* Compass Group */}
                <g className="compass-group" transform="translate(40, 230)">
                  <circle cx="28" cy="28" r="26" fill="#ffffff" stroke="var(--brand-blue)" strokeWidth="2" />
                  <g className="compass-needle">
                    <polygon points="28,8 33,28 28,48 23,28" fill="var(--brand-orange)" />
                    <polygon points="28,28 33,28 28,48 23,28" fill="var(--brand-blue)" />
                  </g>
                  <circle cx="28" cy="28" r="3" fill="#ffffff" />
                </g>

                {/* Milestone 1: Discover */}
                <g className="milestone-group" transform="translate(120, 260)">
                  <circle className="pulse-ring" r="14" fill="none" stroke="var(--brand-orange)" strokeWidth="2" />
                  <circle className="milestone-node" r="10" fill="#ffffff" stroke="var(--brand-blue)" strokeWidth="3" />
                </g>

                {/* Milestone 2: Plan */}
                <g className="milestone-group" transform="translate(340, 160)">
                  <circle className="pulse-ring" r="14" fill="none" stroke="var(--brand-orange)" strokeWidth="2" />
                  <circle className="milestone-node" r="10" fill="#ffffff" stroke="var(--brand-blue)" strokeWidth="3" />
                </g>

                {/* Milestone 3: Build */}
                <g className="milestone-group" transform="translate(580, 280)">
                  <circle className="pulse-ring" r="14" fill="none" stroke="var(--brand-orange)" strokeWidth="2" />
                  <circle className="milestone-node" r="10" fill="#ffffff" stroke="var(--brand-blue)" strokeWidth="3" />
                </g>

                {/* Milestone 4: Launch */}
                <g className="milestone-group" transform="translate(820, 170)">
                  <circle className="pulse-ring" r="14" fill="none" stroke="var(--brand-orange)" strokeWidth="2" />
                  <circle className="milestone-node" r="10" fill="#ffffff" stroke="var(--brand-blue)" strokeWidth="3" />
                  <g className="rocket-group">
                    <path
                      d="M -10 -15 C -10 -35 0 -45 0 -45 C 0 -45 10 -35 10 -15 L 6 0 L -6 0 Z"
                      fill="var(--brand-orange)"
                    />
                    <polygon points="-6,0 6,0 0,10" fill="#facc15" />
                  </g>
                </g>
              </svg>

              {/* Milestone Pop-up Cards */}
              <div className="roadmap-cards">
                <div className="milestone-card card-m1">
                  <span className="card-step">01 Discover</span>
                  <h4>Process & Systems Audit</h4>
                  <p>Comprehensive ERP, WMS, and data interface mapping.</p>
                </div>
                <div className="milestone-card card-m2">
                  <span className="card-step">02 Plan</span>
                  <h4>Domain Architecture</h4>
                  <p>Scalable cloud blueprints & protocol specifications.</p>
                </div>
                <div className="milestone-card card-m3">
                  <span className="card-step">03 Build</span>
                  <h4>Full-Stack Implementation</h4>
                  <p>Production logistics engineering with Spring & React.</p>
                </div>
                <div className="milestone-card card-m4">
                  <span className="card-step">04 Launch</span>
                  <h4>Zero-Disruption Cutover</h4>
                  <p>Side-by-side validation and live automated monitoring.</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Staff Augmentation / Dedicated Teams Stage */}
          {(slug === "staff-augmentation" || slug === "dedicated-teams") && (
            <div className="stage-wrap teams-wrap">
              <div className="team-stage-canvas" aria-hidden="true">
                {/* Connector SVG Lines */}
                <svg className="team-orbit-svg" viewBox="0 0 800 450">
                  <circle className="team-orbit-ring" cx="400" cy="225" r="180" fill="none" stroke="rgba(8, 28, 84, 0.1)" strokeDasharray="3 6" />
                  <line className="team-connector-line" x1="400" y1="225" x2="580" y2="225" stroke="var(--brand-orange)" strokeWidth="2" />
                  <line className="team-connector-line" x1="400" y1="225" x2="490" y2="381" stroke="var(--brand-orange)" strokeWidth="2" />
                  <line className="team-connector-line" x1="400" y1="225" x2="310" y2="381" stroke="var(--brand-orange)" strokeWidth="2" />
                  <line className="team-connector-line" x1="400" y1="225" x2="220" y2="225" stroke="var(--brand-orange)" strokeWidth="2" />
                  <line className="team-connector-line" x1="400" y1="225" x2="310" y2="69" stroke="var(--brand-orange)" strokeWidth="2" />
                  <line className="team-connector-line" x1="400" y1="225" x2="490" y2="69" stroke="var(--brand-orange)" strokeWidth="2" />
                </svg>

                {/* Central Project Core */}
                <div className="team-core">
                  <span className="core-badge">Active</span>
                  <div className="core-title">Your Project</div>
                  <small>Logistics Core</small>
                </div>

                {/* Orbit Avatars */}
                <div className="team-avatars-layer">
                  <div className="team-avatar">
                    <span className="avatar-pic">AK</span>
                    <span className="avatar-role">Lead Architect</span>
                    <span className="avatar-tag">TMS / EDI</span>
                  </div>
                  <div className="team-avatar">
                    <span className="avatar-pic">MR</span>
                    <span className="avatar-role">Sr. Backend</span>
                    <span className="avatar-tag">Spring / Java</span>
                  </div>
                  <div className="team-avatar">
                    <span className="avatar-pic">SL</span>
                    <span className="avatar-role">Freight QA</span>
                    <span className="avatar-tag">Auto-Testing</span>
                  </div>
                  <div className="team-avatar">
                    <span className="avatar-pic">DT</span>
                    <span className="avatar-role">Data Engineer</span>
                    <span className="avatar-tag">ETL & Watsonx</span>
                  </div>
                  <div className="team-avatar">
                    <span className="avatar-pic">JW</span>
                    <span className="avatar-role">Product Lead</span>
                    <span className="avatar-tag">Carriers</span>
                  </div>
                  <div className="team-avatar">
                    <span className="avatar-pic">VN</span>
                    <span className="avatar-role">Frontend Eng</span>
                    <span className="avatar-tag">React / Next</span>
                  </div>
                </div>

                {/* Final Deployment Badge */}
                <div className="team-final-badge">
                  <div className="badge-stat">
                    <span className="team-counter-val">14 Days</span>
                    <small>Ramp-Up Speed</small>
                  </div>
                  <div className="badge-text">
                    <h4>Dedicated Logistics Squad Ready</h4>
                    <p>Pre-vetted freight engineers dedicated 100% to your codebase.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. AI & Data Science Stage */}
          {(slug === "ai-and-automation" || slug === "data-science") && (
            <div className="stage-wrap ai-wrap">
              <canvas className="ai-canvas" aria-hidden="true" />
              <div className="ai-chart-group">
                <div className="ai-insight-card">
                  <div className="ai-metric-badge">
                    <span className="ai-metric-val">94%</span>
                    <small>Forecast Precision</small>
                  </div>
                  <div className="ai-insight-text">
                    <h4>High-Accuracy Anomaly Detection</h4>
                    <p>Predictive ETA deviations & load capacity optimization.</p>
                  </div>
                  <div className="ai-mini-bars">
                    <span style={{ height: "45%" }} />
                    <span style={{ height: "65%" }} />
                    <span style={{ height: "55%" }} />
                    <span style={{ height: "85%" }} />
                    <span style={{ height: "95%" }} className="bar-peak" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Legacy Migration Stage */}
          {slug === "legacy-migration" && (
            <div className="stage-wrap migration-wrap">
              <div className="migration-grid" aria-hidden="true">
                {/* Left: Terminal Monolith */}
                <div className="monolith-stack">
                  <div className="terminal-header">
                    <span className="t-dot dot-red" />
                    <span className="t-dot dot-yellow" />
                    <span className="t-dot dot-green" />
                    <span className="t-title">MAINFRAME_V2.34 (ON-PREMISE)</span>
                  </div>
                  <div className="terminal-body">
                    <div className="t-code">&gt; INIT COBOL_WRAPPER</div>
                    <div className="t-code">&gt; MONOLITH THREADS: 128</div>
                    <div className="t-code">&gt; MEMORY: 92% CRITICAL</div>
                    <div className="t-code">&gt; DECOUPLING MODULES...</div>
                  </div>
                  <div className="monolith-cracks" />
                </div>

                {/* Center Migrating Blocks */}
                <div className="migration-transit-area">
                  <div className="migration-block" data-mod="1">
                    <span className="mod-icon">🔐</span>
                    <span>Auth Service</span>
                  </div>
                  <div className="migration-block" data-mod="2">
                    <span className="mod-icon">📦</span>
                    <span>Order Engine</span>
                  </div>
                  <div className="migration-block" data-mod="3">
                    <span className="mod-icon">🌐</span>
                    <span>EDI Gateway</span>
                  </div>
                  <div className="migration-block" data-mod="4">
                    <span className="mod-icon">⚡</span>
                    <span>WMS / TMS API</span>
                  </div>
                  <div className="migration-block" data-mod="5">
                    <span className="mod-icon">📊</span>
                    <span>Audit Pipeline</span>
                  </div>
                </div>

                {/* Right: Cloud Architecture */}
                <div className="cloud-architecture">
                  <div className="cloud-pulse-ring" />
                  <div className="cloud-header">
                    <span className="cloud-icon">☁️</span>
                    <h4>Cloud Native Cluster</h4>
                  </div>
                  <div className="cloud-nodes">
                    <div className="cloud-node">K8s Pods (Active)</div>
                    <div className="cloud-node">Serverless EDI</div>
                    <div className="cloud-node">Distributed DB</div>
                  </div>
                </div>
              </div>

              {/* Bottom Progress Tracker */}
              <div className="migration-progress-wrap">
                <div className="migration-progress-bar">
                  <div className="migration-progress-fill" />
                </div>
                <span className="migration-progress-pct">0% Migrated</span>
              </div>
            </div>
          )}

          {/* 5. Supply Chain Sustainability Stage */}
          {slug === "supply-chain-sustainability" && (
            <div className="stage-wrap sustain-wrap">
              <svg className="sustain-svg" viewBox="0 0 960 450" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#9BE15D" />
                  </linearGradient>
                </defs>

                {/* Grid Network */}
                <path d="M 100 120 L 300 240 L 550 160 L 800 280" stroke="rgba(8, 28, 84, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 200 360 L 450 320 L 700 100" stroke="rgba(8, 28, 84, 0.08)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Winding Gray Route (Before) */}
                <path
                  className="route-path-gray"
                  d="M 80 200 C 180 80 240 340 380 220 C 500 100 620 380 750 200 C 820 120 880 240 900 220"
                  stroke="#94a3b8"
                  strokeWidth="3"
                  strokeDasharray="4 6"
                />

                {/* Optimized Green Straightened Route (After) */}
                <path
                  className="route-path-green"
                  d="M 80 200 Q 380 180 500 180 T 900 200"
                  stroke="url(#green-grad)"
                  strokeWidth="0"
                  opacity="0"
                />

                {/* Hub Nodes */}
                <g className="hub-nodes">
                  <circle cx="80" cy="200" r="8" fill="#ffffff" stroke="#081c54" strokeWidth="3" />
                  <circle cx="380" cy="180" r="8" fill="#ffffff" stroke="#081c54" strokeWidth="3" />
                  <circle cx="650" cy="190" r="8" fill="#ffffff" stroke="#081c54" strokeWidth="3" />
                  <circle cx="900" cy="200" r="8" fill="#ffffff" stroke="#081c54" strokeWidth="3" />
                </g>

                {/* Sprouting Leaf Nodes */}
                <g className="sustain-leaf-node" transform="translate(72, 168)" opacity="0" scale="0">
                  <circle cx="8" cy="8" r="16" fill="rgba(5, 150, 105, 0.15)" />
                  <text x="3" y="14" fontSize="14">🌱</text>
                </g>
                <g className="sustain-leaf-node" transform="translate(372, 148)" opacity="0" scale="0">
                  <circle cx="8" cy="8" r="16" fill="rgba(5, 150, 105, 0.15)" />
                  <text x="3" y="14" fontSize="14">🌿</text>
                </g>
                <g className="sustain-leaf-node" transform="translate(642, 158)" opacity="0" scale="0">
                  <circle cx="8" cy="8" r="16" fill="rgba(5, 150, 105, 0.15)" />
                  <text x="3" y="14" fontSize="14">🍃</text>
                </g>
                <g className="sustain-leaf-node" transform="translate(892, 168)" opacity="0" scale="0">
                  <circle cx="8" cy="8" r="16" fill="rgba(5, 150, 105, 0.15)" />
                  <text x="3" y="14" fontSize="14">🌳</text>
                </g>

                {/* Moving Transport Vehicles */}
                <g className="transport-truck" transform="translate(80, 190)">
                  <rect x="-14" y="-8" width="28" height="16" rx="4" fill="var(--brand-orange)" />
                  <circle cx="-7" cy="10" r="3" fill="#081c54" />
                  <circle cx="7" cy="10" r="3" fill="#081c54" />
                </g>
                <g className="transport-ship" transform="translate(360, 260)">
                  <polygon points="-16,-4 16,-4 12,10 -12,10" fill="var(--brand-blue)" />
                  <rect x="-4" y="-12" width="8" height="8" fill="#ffffff" />
                </g>
              </svg>

              {/* Final Sustainability Badge */}
              <div className="sustain-badge">
                <div className="sustain-metric">
                  <span className="co2-metric-val">0%</span>
                  <small>Emissions Delta</small>
                </div>
                <div className="sustain-badge-text">
                  <h4>-30% Carbon Footprint Verified</h4>
                  <p>Smart load pooling & rail intermodal cutoffs automated via telematics.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
