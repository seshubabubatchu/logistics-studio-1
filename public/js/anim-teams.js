/**
 * Logistics Studio - Dedicated Teams Animation: "Assemble the Team"
 * Scattered avatars fly into orbit around central project core, connect, and snap into a verified team badge
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
      line: 'rgba(8, 28, 84, 0.12)',
      activeLine: 'rgba(242, 101, 47, 0.5)',
      coreBg: '#081c54',
      avatarBg: '#ffffff',
    },
    roles: [
      { initials: 'AK', role: 'Lead Architect', domain: 'TMS & EDI', angle: 0 },
      { initials: 'MR', role: 'Sr. Backend Dev', domain: 'Java / Spring', angle: 60 },
      { initials: 'SL', role: 'Freight QA Lead', domain: 'Automated Testing', angle: 120 },
      { initials: 'DT', role: 'Data Engineer', domain: 'Telematics ETL', angle: 180 },
      { initials: 'JW', role: 'Product Manager', domain: 'Carrier Integrations', angle: 240 },
      { initials: 'VN', role: 'Frontend Eng', domain: 'React & Portals', angle: 300 },
    ],
    headlines: [
      'Stage 1: Talent Sourcing — Vetting logistics-fluent engineering talent',
      'Stage 2: Orbital Alignment — Structuring the squad around your project core',
      'Stage 3: Integration — Establishing automated communication & telemetry',
      'Stage 4: Deployed — Dedicated squad operational in 2 weeks',
    ],
  };

  function initTeams() {
    var container = document.querySelector('[data-story="dedicated-teams"], [data-story="staff-augmentation"]');
    if (!container) return;

    var utils = window.AnimUtils || {};
    var isReduced = utils.prefersReducedMotion ? utils.prefersReducedMotion() : false;

    var headlineEl = container.querySelector('.story-headline');
    var canvasWrap = container.querySelector('.team-stage-canvas');
    var coreEl = container.querySelector('.team-core');
    var avatars = container.querySelectorAll('.team-avatar');
    var lines = container.querySelectorAll('.team-connector-line');
    var orbitRing = container.querySelector('.team-orbit-ring');
    var orbitSvg = container.querySelector('.team-orbit-svg');
    var finalBadge = container.querySelector('.team-final-badge');
    var counterEl = container.querySelector('.team-counter-val');

    if (isReduced) {
      if (headlineEl) headlineEl.innerText = CONFIG.headlines[3];
      if (coreEl) coreEl.style.opacity = '1';
      if (finalBadge) {
        finalBadge.style.opacity = '1';
        finalBadge.style.transform = 'scale(1)';
      }
      avatars.forEach(function (av) { av.style.opacity = '1'; });
      if (counterEl) counterEl.innerText = '14 Days';
      return;
    }

    utils.ensureGSAP(function (gsap, ScrollTrigger) {
      function getMetrics() {
        var rect = canvasWrap ? canvasWrap.getBoundingClientRect() : { width: 800, height: 450 };
        var W = rect.width || 800;
        var H = rect.height || 450;
        var isMob = W < 540;
        var isTab = W >= 540 && W < 860;

        var orbitR = isMob ? Math.min(W * 0.34, 110) : isTab ? Math.min(W * 0.28, 145) : 175;
        var scatterX = Math.min(W * 0.38, 280);
        var scatterY = Math.min(H * 0.38, 150);

        return { W: W, H: H, orbitR: orbitR, scatterX: scatterX, scatterY: scatterY, isMob: isMob, isTab: isTab };
      }

      var m = getMetrics();

      // Configure SVG orbit ring based on container dimensions
      if (orbitSvg) {
        orbitSvg.setAttribute('viewBox', '0 0 ' + m.W + ' ' + m.H);
      }
      if (orbitRing) {
        orbitRing.setAttribute('cx', m.W / 2);
        orbitRing.setAttribute('cy', m.H / 2);
        orbitRing.setAttribute('r', m.orbitR);
      }

      // Initial scatter positions
      var scatterMultipliers = [
        { x: -0.9, y: -0.85, rot: -14 },
        { x: 0.95, y: -0.9, rot: 16 },
        { x: -1.0, y: 0.65, rot: 10 },
        { x: 0.98, y: 0.75, rot: -15 },
        { x: -0.45, y: 1.0, rot: 8 },
        { x: 0.55, y: -1.0, rot: -10 },
      ];

      avatars.forEach(function (av, i) {
        var sm = scatterMultipliers[i % scatterMultipliers.length];
        gsap.set(av, {
          x: sm.x * m.scatterX,
          y: sm.y * m.scatterY,
          rotation: sm.rot,
          opacity: 0.7,
          scale: m.isMob ? 0.8 : 0.9,
        });
      });

      gsap.set(lines, { strokeDasharray: 200, strokeDashoffset: 200, opacity: 0 });
      gsap.set(finalBadge, { opacity: 0, scale: 0.85, y: 30 });
      gsap.set(orbitRing, { scale: 0.6, opacity: 0, transformOrigin: 'center center' });

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

      // Stage 1 -> 2: Core pulses and avatars fly into orbit around Core
      tl.to(coreEl, { scale: 1.08, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0);
      tl.to(orbitRing, { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }, 0.2);

      avatars.forEach(function (av, i) {
        var rad = (CONFIG.roles[i].angle * Math.PI) / 180;
        var ox = Math.round(Math.cos(rad) * m.orbitR);
        var oy = Math.round(Math.sin(rad) * m.orbitR);

        // Update connector line coordinates
        if (lines[i]) {
          lines[i].setAttribute('x1', m.W / 2);
          lines[i].setAttribute('y1', m.H / 2);
          lines[i].setAttribute('x2', m.W / 2 + ox);
          lines[i].setAttribute('y2', m.H / 2 + oy);
        }

        tl.to(
          av,
          {
            x: ox,
            y: oy,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.inOut',
          },
          0.3 + i * 0.08
        );
      });

      // Stage 2 -> 3: Network lines draw between core and team members
      tl.to(
        lines,
        {
          strokeDashoffset: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power1.out',
        },
        1.3
      );

      tl.to(coreEl, { boxShadow: '0 0 35px rgba(242, 101, 47, 0.5)', duration: 0.5 }, 1.7);

      // Stage 3 -> 4: Snap into structured squad formation & reveal 14-day badge
      tl.to(orbitRing, { opacity: 0, scale: 1.15, duration: 0.4 }, 2.3);
      tl.to(lines, { opacity: 0, duration: 0.3 }, 2.3);

      avatars.forEach(function (av, i) {
        var finalX, finalY;
        if (m.isMob) {
          // 2 rows of 3 on mobile
          var col = i % 3;
          var row = Math.floor(i / 3);
          finalX = (col - 1) * 58;
          finalY = row === 0 ? -10 : 44;
        } else {
          // 1 row on tablet/desktop
          var spacing = m.isTab ? 66 : 84;
          finalX = (i - 2.5) * spacing;
          finalY = 32;
        }

        tl.to(
          av,
          {
            x: finalX,
            y: finalY,
            scale: m.isMob ? 0.8 : 0.92,
            duration: 0.8,
            ease: 'back.out(1.4)',
          },
          2.5
        );
      });

      tl.to(coreEl, { y: m.isMob ? -65 : -80, scale: 0.88, duration: 0.8, ease: 'power2.out' }, 2.5);

      tl.to(
        finalBadge,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.6)',
        },
        2.7
      );

      // Count down from 30 days to 14 days
      var counterObj = { days: 30 };
      tl.to(
        counterObj,
        {
          days: 14,
          duration: 0.8,
          ease: 'power1.inOut',
          onUpdate: function () {
            if (counterEl) {
              counterEl.innerText = Math.round(counterObj.days) + ' Days';
            }
          },
        },
        2.7
      );

      // On window resize, refresh trigger
      window.addEventListener('resize', function () {
        ScrollTrigger.refresh();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeams);
  } else {
    initTeams();
  }
})();
