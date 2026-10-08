"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { animConfig } from '@/lib/animConfig';
import { LogoMark } from './LogoMark';

export default function Loader() {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<SVGPathElement>(null);
  const orangeRef = useRef<SVGRectElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasRun = sessionStorage.getItem('ls-loader-run');

    if (prefersReduced || hasRun) {
      setShow(false);
      return;
    }

    sessionStorage.setItem('ls-loader-run', 'true');
    // Lock scroll during loader
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          setShow(false);
        }
      });

      // Initial state
      gsap.set(blueRef.current, { y: 100, opacity: 0 });
      gsap.set(orangeRef.current, { y: -50, opacity: 0 });
      gsap.set(wordmarkRef.current, { opacity: 0, x: -20 });
      gsap.set(maskGroupRef.current, { transformOrigin: 'center center', scale: 0 });

      // Sequence
      tl.to(blueRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .to(orangeRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, "-=0.2")
        .to(wordmarkRef.current, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, "-=0.2")
        // Hold for a moment
        .to({}, { duration: 0.5 })
        // Hide the actual SVG elements instantly
        .set([blueRef.current, orangeRef.current, wordmarkRef.current], { opacity: 0 })
        // Expand the mask (black L shape) to reveal the page
        .to(maskGroupRef.current, { scale: 50, duration: 1.2, ease: 'power4.inOut', y: -2000 })
        // Fade out the overlay itself just in case
        .to(containerRef.current, { opacity: 0, duration: 0.2 }, "-=0.2");

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []);

  if (!show) return null;

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', background: '#ffffff' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <mask id="loader-mask">
            <rect width="100%" height="100%" fill="white" />
            <g ref={maskGroupRef} transform="translate(calc(50vw - 50px), calc(50vh - 50px))">
              {/* This L shape is black, meaning it cuts a hole in the white mask */}
              <path d="M0 100 L0 0 L100 0 L100 40 L40 40 L40 100 Z" fill="black" />
            </g>
          </mask>
        </defs>
        {/* The solid white overlay covering everything, clipped by the mask */}
        <rect width="100%" height="100%" fill="#ffffff" mask="url(#loader-mask)" />
      </svg>
      
      {/* The animated logo on top */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <LogoMark className="w-16 h-16" blueRef={blueRef} orangeRef={orangeRef} style={{ width: '64px', height: '64px', flexShrink: 0 }} />
        <div ref={wordmarkRef} style={{ color: animConfig.colors.blue, fontSize: '36px', fontWeight: 700, lineHeight: 1.1, fontFamily: 'var(--display)' }}>
          Logistics<br/>Studio
        </div>
      </div>
    </div>
  );
}
