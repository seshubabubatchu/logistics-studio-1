/**
 * Logistics Studio - Shared Animation Utilities
 * Lightweight, vanilla helper library for service scroll-driven animations
 */

(function (global) {
  'use strict';

  var AnimUtils = {
    // Brand Colors
    colors: {
      navy: '#081c54',
      orange: '#f2652f',
      blue: '#1368f6',
      green: '#059669',
      greenLight: '#9BE15D',
      bgLight: '#f4f6f8',
      cardBg: '#ffffff',
      line: 'rgba(8, 28, 84, 0.1)',
      muted: '#5b6b85',
      white: '#ffffff',
    },

    // Check prefers-reduced-motion
    prefersReducedMotion: function () {
      if (typeof window === 'undefined' || !window.matchMedia) return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    // Viewport helpers
    isMobile: function () {
      if (typeof window === 'undefined') return false;
      return window.innerWidth < 640;
    },
    isTablet: function () {
      if (typeof window === 'undefined') return false;
      return window.innerWidth >= 640 && window.innerWidth < 1024;
    },
    isDesktop: function () {
      if (typeof window === 'undefined') return true;
      return window.innerWidth >= 1024;
    },

    // Wait for GSAP and ScrollTrigger to be loaded from CDN
    ensureGSAP: function (callback) {
      if (typeof window === 'undefined') return;
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        callback(window.gsap, window.ScrollTrigger);
        return;
      }

      var attempts = 0;
      var interval = setInterval(function () {
        attempts++;
        if (window.gsap && window.ScrollTrigger) {
          clearInterval(interval);
          window.gsap.registerPlugin(window.ScrollTrigger);
          callback(window.gsap, window.ScrollTrigger);
        } else if (attempts > 50) {
          clearInterval(interval);
          console.warn('GSAP or ScrollTrigger failed to load in time.');
        }
      }, 50);
    },

    // Setup high-DPI canvas
    setupCanvas: function (canvas, dprCap) {
      if (!canvas) return null;
      var dpr = Math.min(window.devicePixelRatio || 1, dprCap || 2);
      var rect = canvas.getBoundingClientRect();
      var width = rect.width || canvas.clientWidth || 800;
      var height = rect.height || canvas.clientHeight || 450;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      var ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
      return { ctx: ctx, width: width, height: height, dpr: dpr };
    },

    // Shared stage headline and pill updater
    updateStageIndicators: function (container, headlines, progress) {
      if (!container || !headlines || !headlines.length) return;
      var headlineEl = container.querySelector('.story-headline');
      var stagePills = container.querySelectorAll('.stage-indicator-pill');
      var total = headlines.length;
      var idx = Math.min(Math.floor(progress * total), total - 1);
      if (headlineEl && headlineEl.dataset.currentIdx !== String(idx)) {
        headlineEl.dataset.currentIdx = String(idx);
        headlineEl.innerText = headlines[idx];
      }
      if (stagePills && stagePills.length) {
        stagePills.forEach(function (pill, i) {
          if (i <= idx) {
            pill.classList.add('is-active');
          } else {
            pill.classList.remove('is-active');
          }
        });
      }
    },

    // Format numbers with commas or suffixes
    formatNumber: function (num) {
      return num.toLocaleString();
    },

    // Pause canvas animation loops when container is scrolled off-screen
    observeVisibility: function (container, onVisible, onHidden) {
      if (!container || typeof IntersectionObserver === 'undefined') return null;
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              if (onVisible) onVisible();
            } else {
              if (onHidden) onHidden();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
      return observer;
    },
  };

  global.AnimUtils = AnimUtils;
})(typeof window !== 'undefined' ? window : this);
