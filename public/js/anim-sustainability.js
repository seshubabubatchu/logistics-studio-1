/**
 * Logistics Studio - Supply Chain Sustainability Animation: "Greener Routes"
 * Stylized route map where winding paths straighten, trucks/ships travel along routes,
 * color shifts from gray to green, leaves sprout at nodes, and CO2 counts down to -30%.
 * Fully bi-directional & responsive across mobile, tablet, and desktop.
 */

(function () {
  'use strict';

  var CONFIG = {
    scrollLength: '300vh',
    scrub: 0.6,
    colors: {
      grayPath: '#94a3b8',
      greenPath: '#059669',
      greenGlow: '#9BE15D',
      navy: '#081c54',
      orange: '#f2652f',
      leafBg: 'rgba(5, 150, 105, 0.12)',
      leafBorder: '#059669',
    },
    headlines: [
      'Stage 1: Legacy Routing — Unoptimized deadhead miles & high fuel consumption',
      'Stage 2: Route Optimization — Straightening legs & multi-stop load consolidation',
      'Stage 3: Mode Shifting — Rail & electric intermodal handoffs taking root',
      'Stage 4: Decarbonized — 30% verified emissions reduction across the network',
    ],
  };

  function initSustainability() {
    var container = document.querySelector('[data-story="supply-chain-sustainability"]');
    if (!container) return;

    var utils = window.AnimUtils || {};
    var isReduced = utils.prefersReducedMotion ? utils.prefersReducedMotion() : false;

    var headlineEl = container.querySelector('.story-headline');
    var co2Val = container.querySelector('.co2-metric-val');
    var badge = container.querySelector('.sustain-badge');
    var leaves = container.querySelectorAll('.sustain-leaf-node');
    var routeGray = container.querySelector('.route-path-gray');
    var routeGreen = container.querySelector('.route-path-green');
    var truck = container.querySelector('.transport-truck');
    var ship = container.querySelector('.transport-ship');

    if (isReduced) {
      if (headlineEl) headlineEl.innerText = CONFIG.headlines[3];
      if (co2Val) co2Val.innerText = '-30%';
      if (badge) badge.style.opacity = '1';
      if (routeGreen) routeGreen.style.opacity = '1';
      if (routeGray) routeGray.style.opacity = '0';
      leaves.forEach(function (l) { l.style.opacity = '1'; l.style.transform = 'scale(1)'; });
      return;
    }

    utils.ensureGSAP(function (gsap, ScrollTrigger) {
      gsap.set(badge, { opacity: 0, scale: 0.88, y: 25 });

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

      // CO2 counter object (starts at baseline, drops to -30%)
      var co2Obj = { val: 0 };
      tl.to(
        co2Obj,
        {
          val: -30,
          duration: 3.6,
          ease: 'power1.inOut',
          onUpdate: function () {
            if (co2Val) {
              co2Val.innerText = (co2Obj.val >= 0 ? '+' : '') + Math.round(co2Obj.val) + '%';
            }
          },
        },
        0.2
      );

      // Stage 1 -> 2: Truck and ship travel along winding route (0% -> 35%)
      tl.to(truck, { x: 260, y: 70, duration: 1.2, ease: 'power1.inOut' }, 0.2);
      tl.to(ship, { x: 120, y: 40, duration: 1.2, ease: 'power1.inOut' }, 0.4);

      // Stage 2 -> 3: Winding route straightens into green optimized route (35% -> 70%)
      tl.to(routeGray, { opacity: 0.15, duration: 0.8 }, 1.2);
      tl.to(routeGreen, { opacity: 1, strokeWidth: 4, duration: 0.8 }, 1.2);
      tl.to(truck, { x: 520, y: 20, duration: 1.2, ease: 'power2.inOut' }, 1.4);
      tl.to(ship, { x: 380, y: -30, duration: 1.2, ease: 'power2.inOut' }, 1.6);

      // Stage 3 -> 4: Leaves sprout at hubs/nodes & final badge reveals (70% -> 100%)
      leaves.forEach(function (leaf, i) {
        tl.to(
          leaf,
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
          },
          2.2 + i * 0.15
        );
      });

      tl.to(badge, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.6)' }, 2.6);

      window.addEventListener('resize', function () {
        ScrollTrigger.refresh();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSustainability);
  } else {
    initSustainability();
  }
})();
