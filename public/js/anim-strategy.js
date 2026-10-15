/**
 * Logistics Studio - Strategy & Development Animation: "The Roadmap"
 * Pinned scroll-driven blueprint roadmap across Discover -> Plan -> Build -> Launch
 * Fully bi-directional & responsive across mobile, tablet, and desktop.
 */

(function () {
  'use strict';

  var CONFIG = {
    scrollLength: '300vh',
    scrub: 0.6,
    colors: {
      navy: '#081c54',
      orange: '#f2652f',
      blue: '#1368f6',
      gridLine: 'rgba(8, 28, 84, 0.08)',
      pathBase: 'rgba(8, 28, 84, 0.15)',
      pathActive: '#f2652f',
      nodeFill: '#ffffff',
      nodeBorder: '#081c54',
      cardBg: '#ffffff',
    },
    milestones: [
      { name: 'Discover', label: 'Process Audit', desc: 'Deep dive into ERP, TMS & EDI workflows' },
      { name: 'Plan', label: 'Technical Roadmap', desc: 'Domain architecture & microservice APIs' },
      { name: 'Build', label: 'Production Engineering', desc: 'Resilient logistics services built to scale' },
      { name: 'Launch', label: 'Cutover & Monitoring', desc: 'Zero-disruption release with telemetry' },
    ],
    headlines: [
      'Stage 1: Discover — Auditing operational workflows & systems',
      'Stage 2: Plan — Blueprinting technical roadmap & interfaces',
      'Stage 3: Build — Full-stack logistics software engineering',
      'Stage 4: Launch — Zero-disruption deployment & lift-off',
    ],
  };

  function initRoadmap() {
    var container = document.querySelector('[data-story="strategy-and-development"]');
    if (!container) return;

    var utils = window.AnimUtils || {};
    var isReduced = utils.prefersReducedMotion ? utils.prefersReducedMotion() : false;

    var headlineEl = container.querySelector('.story-headline');
    var svg = container.querySelector('.roadmap-svg');
    var pathGlow = container.querySelector('.roadmap-path-active');
    var compass = container.querySelector('.compass-needle');
    var rocket = container.querySelector('.rocket-group');
    var nodes = container.querySelectorAll('.milestone-node');
    var cards = container.querySelectorAll('.milestone-card');
    var rings = container.querySelectorAll('.pulse-ring');

    if (isReduced) {
      if (pathGlow) pathGlow.style.strokeDashoffset = '0';
      if (headlineEl) headlineEl.innerText = CONFIG.headlines[3];
      cards.forEach(function (c) { c.style.opacity = '1'; c.style.transform = 'translateY(0)'; });
      nodes.forEach(function (n) { n.style.opacity = '1'; });
      if (rocket) rocket.style.transform = 'translate(820px, 110px) rotate(-35deg)';
      return;
    }

    utils.ensureGSAP(function (gsap, ScrollTrigger) {
      var totalLength = pathGlow && pathGlow.getTotalLength ? pathGlow.getTotalLength() : 880;
      if (pathGlow) {
        pathGlow.style.strokeDasharray = totalLength;
        pathGlow.style.strokeDashoffset = totalLength;
      }

      gsap.set(compass, { transformOrigin: '28px 28px', rotate: 25 });
      gsap.set(rocket, { transformOrigin: 'center center', scale: 0.8, opacity: 0 });
      gsap.set(cards, { opacity: 0, y: 15 });

      var pinTrigger = container.querySelector('.story-sticky');

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=' + (parseInt(CONFIG.scrollLength, 10) || 300) + '%',
          pin: pinTrigger,
          scrub: CONFIG.scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: function (self) {
            utils.updateStageIndicators(container, CONFIG.headlines, self.progress);
          },
        },
      });

      // Stage 1: Draw path to Discover node (0% -> 25%)
      tl.to(compass, { rotate: 50, duration: 0.5 }, 0);
      tl.to(pathGlow, { strokeDashoffset: totalLength * 0.75, ease: 'none', duration: 1 }, 0);
      tl.to(nodes[0], { scale: 1.25, duration: 0.3, ease: 'back.out(2)' }, 0.4);
      tl.to(nodes[0], { scale: 1, duration: 0.2 }, 0.7);
      tl.to(rings[0], { scale: 2.2, opacity: 0, duration: 0.6 }, 0.5);
      tl.to(cards[0], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.5);

      // Stage 2: Draw to Plan node (25% -> 50%)
      tl.to(compass, { rotate: -15, duration: 0.6 }, 1);
      tl.to(pathGlow, { strokeDashoffset: totalLength * 0.5, ease: 'none', duration: 1 }, 1);
      tl.to(nodes[1], { scale: 1.25, duration: 0.3, ease: 'back.out(2)' }, 1.4);
      tl.to(nodes[1], { scale: 1, duration: 0.2 }, 1.7);
      tl.to(rings[1], { scale: 2.2, opacity: 0, duration: 0.6 }, 1.5);
      tl.to(cards[1], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.5);

      // Stage 3: Draw to Build node (50% -> 75%)
      tl.to(compass, { rotate: 45, duration: 0.6 }, 2);
      tl.to(pathGlow, { strokeDashoffset: totalLength * 0.25, ease: 'none', duration: 1 }, 2);
      tl.to(nodes[2], { scale: 1.25, duration: 0.3, ease: 'back.out(2)' }, 2.4);
      tl.to(nodes[2], { scale: 1, duration: 0.2 }, 2.7);
      tl.to(rings[2], { scale: 2.2, opacity: 0, duration: 0.6 }, 2.5);
      tl.to(cards[2], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 2.5);

      // Stage 4: Draw to Launch node and Rocket lifts off (75% -> 100%)
      tl.to(compass, { rotate: -30, duration: 0.6 }, 3);
      tl.to(pathGlow, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 3);
      tl.to(nodes[3], { scale: 1.25, duration: 0.3, ease: 'back.out(2)' }, 3.4);
      tl.to(nodes[3], { scale: 1, duration: 0.2 }, 3.7);
      tl.to(rings[3], { scale: 2.2, opacity: 0, duration: 0.6 }, 3.5);
      tl.to(cards[3], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 3.5);
      tl.to(rocket, { opacity: 1, scale: 1, duration: 0.3 }, 3.5);
      tl.to(rocket, { y: -85, x: 35, rotate: -25, duration: 0.8, ease: 'power2.out' }, 3.7);

      window.addEventListener('resize', function () {
        ScrollTrigger.refresh();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRoadmap);
  } else {
    initRoadmap();
  }
})();
