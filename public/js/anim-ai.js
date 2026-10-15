/**
 * Logistics Studio - AI & Data Science Animation: "From Data to Intelligence"
 * Chaotic data points stream into a 4-layer neural net, light up with orange signal pulse,
 * and morph into a predictive line/bar chart with count-up accuracy metric.
 * Fully bi-directional & responsive across mobile, tablet, and desktop.
 */

(function () {
  'use strict';

  var CONFIG = {
    scrollLength: '300vh',
    scrub: 0.6,
    maxParticlesDesktop: 120,
    maxParticlesTablet: 80,
    maxParticlesMobile: 45,
    colors: {
      navy: '#081c54',
      orange: '#f2652f',
      blue: '#1368f6',
      grayDot: 'rgba(91, 107, 133, 0.55)',
      telemetryTag: 'rgba(8, 28, 84, 0.45)',
      netNode: '#ffffff',
      netNodeBorder: '#081c54',
      activeOrange: '#f2652f',
      synapse: 'rgba(8, 28, 84, 0.12)',
      synapseActive: 'rgba(242, 101, 47, 0.75)',
      streamLine: 'rgba(242, 101, 47, 0.25)',
    },
    layers: [4, 6, 6, 3],
    telemetrySamples: ['EDI 204', 'GPS 34°N', 'TEMP -18°C', 'ETA -14m', 'LOAD 92%', 'RFID #88', 'TMS SYNC', 'BARCODE', 'SENS-09'],
    headlines: [
      'Stage 1: Raw Telemetry — Ingesting disparate sensor & EDI streams',
      'Stage 2: Feature Ingestion — Vectorizing telemetry into multi-layer network',
      'Stage 3: Neural Inference — Signal propagation & anomaly detection',
      'Stage 4: Predictive Insight — 94% forecasting precision achieved',
    ],
  };

  function initAI() {
    var container = document.querySelector('[data-story="data-science"], [data-story="ai-and-automation"]');
    if (!container) return;

    var utils = window.AnimUtils || {};
    var isReduced = utils.prefersReducedMotion ? utils.prefersReducedMotion() : false;

    var headlineEl = container.querySelector('.story-headline');
    var canvas = container.querySelector('.ai-canvas');
    var chartGroup = container.querySelector('.ai-chart-group');
    var metricVal = container.querySelector('.ai-metric-val');
    var stagePills = container.querySelectorAll('.stage-indicator-pill');

    if (isReduced) {
      if (headlineEl) headlineEl.innerText = CONFIG.headlines[3];
      if (chartGroup) chartGroup.style.opacity = '1';
      if (metricVal) metricVal.innerText = '94%';
      return;
    }

    var ctx, W, H;
    var particles = [];
    var networkLayers = [];

    // Animation timeline state scrubbed by scroll
    var state = {
      streamProgress: 0,
      layer1Active: 0,
      layer2Active: 0,
      layer3Active: 0,
      layer4Active: 0,
      chartReveal: 0,
      accuracy: 52,
    };

    function updateDimensions() {
      if (!canvas) return;
      var setup = utils.setupCanvas(canvas, 2);
      if (!setup) return;
      ctx = setup.ctx;
      W = setup.width;
      H = setup.height;

      var isMob = W < 600;
      var isTab = W >= 600 && W < 960;

      // Layer X coordinates based on viewport width
      var layerX;
      if (isMob) {
        layerX = [W * 0.44, W * 0.58, W * 0.72, W * 0.86];
      } else if (isTab) {
        layerX = [W * 0.46, W * 0.60, W * 0.73, W * 0.86];
      } else {
        layerX = [W * 0.48, W * 0.61, W * 0.74, W * 0.87];
      }

      // Rebuild network node positions
      networkLayers = [];
      var verticalPadding = isMob ? 40 : 70;
      CONFIG.layers.forEach(function (nodeCount, lIdx) {
        var nodes = [];
        var spacing = (H - verticalPadding * 2) / (nodeCount + 1);
        for (var nIdx = 0; nIdx < nodeCount; nIdx++) {
          nodes.push({
            x: layerX[lIdx],
            y: verticalPadding + spacing * (nIdx + 1),
          });
        }
        networkLayers.push(nodes);
      });

      // Target count
      var targetCount = isMob ? CONFIG.maxParticlesMobile : isTab ? CONFIG.maxParticlesTablet : CONFIG.maxParticlesDesktop;
      var roamMaxX = layerX[0] - (isMob ? 15 : 30);
      var roamMinX = isMob ? 12 : 24;
      var roamMinY = 24;
      var roamMaxY = H - 24;

      // Adjust or create particles
      if (particles.length === 0) {
        for (var i = 0; i < targetCount; i++) {
          particles.push(createParticle(i, roamMinX, roamMaxX, roamMinY, roamMaxY));
        }
      } else {
        // Update roaming bounds for existing particles
        particles.forEach(function (p, i) {
          p.minX = roamMinX;
          p.maxX = roamMaxX;
          p.minY = roamMinY;
          p.maxY = roamMaxY;
          p.targetNode = networkLayers[0][i % networkLayers[0].length];
          // Keep within new bounds
          p.roamX = Math.max(roamMinX, Math.min(roamMaxX, p.roamX));
          p.roamY = Math.max(roamMinY, Math.min(roamMaxY, p.roamY));
        });
      }
    }

    function createParticle(i, minX, maxX, minY, maxY) {
      var rx = minX + Math.random() * (maxX - minX);
      var ry = minY + Math.random() * (maxY - minY);
      var targetNode = networkLayers.length > 0 && networkLayers[0].length > 0 ? networkLayers[0][i % networkLayers[0].length] : { x: W * 0.5, y: H * 0.5 };
      return {
        roamX: rx,
        roamY: ry,
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1.6,
        alpha: Math.random() * 0.45 + 0.35,
        targetNode: targetNode,
        delay: (i % 25) * 0.016, // Staggered stream delay
        curveOffset: (Math.random() - 0.5) * 35,
        tag: Math.random() > 0.65 ? CONFIG.telemetrySamples[i % CONFIG.telemetrySamples.length] : null,
      };
    }

    updateDimensions();

    // Listen to resize to keep canvas pixel-perfect on orientation/window change
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensions, 100);
    });

    var isPaused = false;
    utils.observeVisibility(
      container,
      function () { isPaused = false; },
      function () { isPaused = true; }
    );

    // Continuous rendering loop: decoupled roaming + parametric scroll stream
    function render() {
      if (!isPaused && ctx && W && H) {
        ctx.clearRect(0, 0, W, H);

        var isMob = W < 600;
        var nodeRadius = isMob ? 5 : 7;
        var pulseRadius = isMob ? 9 : 13;

        // Draw subtle roaming zone backdrop label
        ctx.font = '600 ' + (isMob ? '9px' : '11px') + ' monospace';
        ctx.fillStyle = 'rgba(8, 28, 84, 0.16)';
        ctx.fillText('STREAMING TELEMETRY (EDGE IOT & EDI)', isMob ? 14 : 28, 22);

        // 1. Render Particles (Roaming on left, parametric stream to right)
        var streamProg = state.streamProgress;
        ctx.font = '9px monospace';

        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];

          // Natural background drifting in roaming zone
          p.roamX += p.vx;
          p.roamY += p.vy;
          if (p.roamX < p.minX || p.roamX > p.maxX) p.vx *= -1;
          if (p.roamY < p.minY || p.roamY > p.maxY) p.vy *= -1;

          var curX, curY;
          if (streamProg <= 0.001) {
            // Pure roaming state (scrolled back or at start)
            curX = p.roamX;
            curY = p.roamY;
          } else {
            // Staggered easing curve into target node
            var pProg = Math.max(0, Math.min(1, (streamProg - p.delay) / (1 - p.delay)));
            var ease = pProg * pProg * (3 - 2 * pProg);
            var target = p.targetNode || { x: W * 0.5, y: H * 0.5 };
            curX = p.roamX + (target.x - p.roamX) * ease;
            curY = p.roamY + (target.y - p.roamY) * ease + Math.sin(ease * Math.PI) * p.curveOffset;

            // Faint orange trace lines when streaming forward
            if (pProg > 0.05 && pProg < 0.95 && i % 3 === 0) {
              ctx.strokeStyle = CONFIG.colors.streamLine;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.roamX, p.roamY);
              ctx.lineTo(curX, curY);
              ctx.stroke();
            }
          }

          // Draw the particle
          ctx.beginPath();
          ctx.arc(curX, curY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = streamProg > 0.3 ? CONFIG.colors.orange : CONFIG.colors.grayDot;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          // Render telemetry text tag if roaming or entering
          if (p.tag && streamProg < 0.65) {
            ctx.fillStyle = CONFIG.colors.telemetryTag;
            ctx.fillText(p.tag, curX + 5, curY + 3);
          }
        }
        ctx.globalAlpha = 1;

        // 2. Render Synapses (Connections between adjacent layers)
        for (var l = 0; l < networkLayers.length - 1; l++) {
          var currLayer = networkLayers[l];
          var nextLayer = networkLayers[l + 1];
          var activeRatio = l === 0 ? state.layer1Active : l === 1 ? state.layer2Active : state.layer3Active;

          currLayer.forEach(function (n1) {
            nextLayer.forEach(function (n2) {
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              if (activeRatio > 0.05) {
                ctx.strokeStyle = activeRatio > 0.5 ? CONFIG.colors.synapseActive : CONFIG.colors.synapse;
                ctx.lineWidth = 0.8 + activeRatio * 1.4;
              } else {
                ctx.strokeStyle = CONFIG.colors.synapse;
                ctx.lineWidth = 0.8;
              }
              ctx.stroke();
            });
          });
        }

        // 3. Render Nodes in each layer
        networkLayers.forEach(function (layer, lIdx) {
          var act = lIdx === 0 ? state.layer1Active : lIdx === 1 ? state.layer2Active : lIdx === 2 ? state.layer3Active : state.layer4Active;
          layer.forEach(function (node) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = act > 0.5 ? CONFIG.colors.activeOrange : CONFIG.colors.netNode;
            ctx.fill();
            ctx.strokeStyle = act > 0.5 ? CONFIG.colors.activeOrange : CONFIG.colors.netNodeBorder;
            ctx.lineWidth = isMob ? 1.5 : 2;
            ctx.stroke();

            // Glow / Pulse Ring when activated
            if (act > 0.3) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, pulseRadius * act, 0, Math.PI * 2);
              ctx.strokeStyle = 'rgba(242, 101, 47, ' + (1 - act * 0.75) + ')';
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          });
        });
      }

      requestAnimationFrame(render);
    }
    render();

    // GSAP ScrollTrigger Integration with seamless bi-directional scrub
    utils.ensureGSAP(function (gsap, ScrollTrigger) {
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

      // Stage 1 -> 2: Stream particles into Layer 1 (0 -> 25%)
      tl.to(state, { streamProgress: 1, duration: 1.0, ease: 'power1.inOut' }, 0);
      tl.to(state, { layer1Active: 1, duration: 0.6, ease: 'power1.out' }, 0.5);

      // Stage 2 -> 3: Propagate through Layer 2 & 3 (25% -> 70%)
      tl.to(state, { layer2Active: 1, duration: 0.6, ease: 'power1.out' }, 1.0);
      tl.to(state, { layer3Active: 1, duration: 0.6, ease: 'power1.out' }, 1.5);
      tl.to(state, { layer4Active: 1, duration: 0.6, ease: 'power1.out' }, 2.0);

      // Stage 3 -> 4: Reveal line/bar prediction chart and count up metric to 94% (70% -> 100%)
      tl.to(chartGroup, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 2.3);
      tl.to(
        state,
        {
          accuracy: 94,
          duration: 0.9,
          ease: 'power1.inOut',
          onUpdate: function () {
            if (metricVal) {
              metricVal.innerText = Math.round(state.accuracy) + '%';
            }
          },
        },
        2.4
      );
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAI);
  } else {
    initAI();
  }
})();
