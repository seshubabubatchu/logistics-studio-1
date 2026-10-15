/**
 * Logistics Studio - Legacy Migration Animation: "Old to New"
 * Retro green-on-black mainframe splits into modular microservice blocks,
 * flying dynamically along trajectory vectors into modern cloud architecture with 0% -> 100% progress.
 * Fully bi-directional & responsive across mobile, tablet, and desktop.
 */

(function () {
  'use strict';

  var CONFIG = {
    scrollLength: '300vh',
    scrub: 0.6,
    colors: {
      terminalBg: '#05120a',
      terminalGreen: '#39ff14',
      terminalBorder: '#1c3b22',
      navy: '#081c54',
      orange: '#f2652f',
      blue: '#1368f6',
      cloudBg: '#ffffff',
      cloudBorder: 'rgba(8, 28, 84, 0.15)',
    },
    headlines: [
      'Stage 1: Legacy Monolith — Rigid mainframe & tight operational coupling',
      'Stage 2: Microservice Extraction — Decoupling logic into containerized modules',
      'Stage 3: Cloud Transit — Migrating data & routes with dual-run verification',
      'Stage 4: Complete Modernization — 100% cloud-native with zero downtime',
    ],
  };

  function initMigration() {
    var container = document.querySelector('[data-story="legacy-migration"]');
    if (!container) return;

    var utils = window.AnimUtils || {};
    var isReduced = utils.prefersReducedMotion ? utils.prefersReducedMotion() : false;

    var headlineEl = container.querySelector('.story-headline');
    var monolith = container.querySelector('.monolith-stack');
    var crackOverlay = container.querySelector('.monolith-cracks');
    var blocks = container.querySelectorAll('.migration-block');
    var cloudTarget = container.querySelector('.cloud-architecture');
    var progressBar = container.querySelector('.migration-progress-fill');
    var progressLabel = container.querySelector('.migration-progress-pct');

    if (isReduced) {
      if (headlineEl) headlineEl.innerText = CONFIG.headlines[3];
      if (progressBar) progressBar.style.width = '100%';
      if (progressLabel) progressLabel.innerText = '100% Migrated';
      if (cloudTarget) cloudTarget.style.opacity = '1';
      blocks.forEach(function (b) {
        b.style.transform = 'none';
        b.style.background = '#ffffff';
        b.style.color = '#081c54';
      });
      return;
    }

    utils.ensureGSAP(function (gsap, ScrollTrigger) {
      var currentTl = null;

      function buildTimeline() {
        if (currentTl) {
          currentTl.kill();
        }

        // Reset blocks before measuring
        blocks.forEach(function (b) {
          gsap.set(b, {
            x: 0,
            y: 0,
            rotation: 0,
            backgroundColor: '#0a1f12',
            color: '#39ff14',
            borderColor: '#1c3b22',
            scale: 1,
            clearProps: 'transform,boxShadow',
          });
        });

        var isMob = window.innerWidth <= 860;

        function getFlyTarget(block, i) {
          if (!block || !cloudTarget) return { x: 0, y: 0 };
          var bRect = block.getBoundingClientRect();
          var cRect = cloudTarget.getBoundingClientRect();

          if (isMob) {
            // Mobile: Fly downwards from transit row into Cloud card
            var targetX = (cRect.left + cRect.width * 0.5) - (bRect.left + bRect.width * 0.5);
            var targetY = (cRect.top + cRect.height * 0.5) - (bRect.top + bRect.height * 0.5);
            // Stagger slightly inside the cloud box
            var xStagger = (i - 2) * 14;
            var yStagger = (i % 2 === 0 ? -6 : 6);
            return {
              midX: targetX * 0.5 + (i % 2 === 0 ? -12 : 12),
              midY: targetY * 0.5,
              finalX: targetX + xStagger,
              finalY: targetY + yStagger,
            };
          } else {
            // Desktop: Fly horizontally across columns into Cloud architecture
            var targetX = (cRect.left + cRect.width * 0.45) - (bRect.left + bRect.width * 0.5);
            var targetY = (cRect.top + cRect.height * 0.5) - (bRect.top + bRect.height * 0.5) + (i - 2) * 20;
            return {
              midX: targetX * 0.45,
              midY: targetY * 0.5 - 20,
              finalX: targetX,
              finalY: targetY,
            };
          }
        }

        var pinTrigger = container.querySelector('.story-sticky');

        currentTl = gsap.timeline({
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

        // Stage 1: Cracks appear in terminal monolith (0% -> 25%)
        currentTl.to(crackOverlay, { opacity: 1, duration: 0.8, ease: 'power1.in' }, 0);
        currentTl.to(monolith, { x: -3, repeat: 4, yoyo: true, duration: 0.08 }, 0.4);

        // Progress bar (0% -> 100%)
        var progressObj = { val: 0 };
        currentTl.to(
          progressObj,
          {
            val: 100,
            duration: 3.6,
            ease: 'none',
            onUpdate: function () {
              var v = Math.round(progressObj.val);
              if (progressBar) progressBar.style.width = v + '%';
              if (progressLabel) progressLabel.innerText = v + '% Migrated';
            },
          },
          0.2
        );

        // Stage 2 -> 3: Microservice blocks break free and fly dynamically into Cloud Architecture
        blocks.forEach(function (block, i) {
          var target = getFlyTarget(block, i);

          // Break out & curve mid-flight
          currentTl.to(
            block,
            {
              x: target.midX,
              y: target.midY,
              rotation: (i % 2 === 0 ? 1 : -1) * (isMob ? 3 : 6),
              duration: 0.9,
              ease: 'power1.inOut',
            },
            0.8 + i * 0.16
          );

          // Assemble cleanly into Cloud architecture
          currentTl.to(
            block,
            {
              x: target.finalX,
              y: target.finalY,
              rotation: 0,
              backgroundColor: '#ffffff',
              color: '#081c54',
              borderColor: 'rgba(8, 28, 84, 0.15)',
              boxShadow: '0 4px 16px -2px rgba(8, 28, 84, 0.12)',
              scale: isMob ? 0.85 : 1,
              duration: 0.9,
              ease: 'power2.out',
            },
            1.5 + i * 0.16
          );
        });

        // Stage 3 -> 4: Monolith fades, Cloud box illuminates (75% -> 100%)
        currentTl.to(monolith, { opacity: 0.35, filter: 'grayscale(0.8)', duration: 0.8 }, 2.4);
        currentTl.to(cloudTarget, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, 2.5);
      }

      buildTimeline();

      var resizeTimeout;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
          buildTimeline();
          ScrollTrigger.refresh();
        }, 150);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMigration);
  } else {
    initMigration();
  }
})();
