"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const config = {
  colors: {
    blue: '#2B3A8F',
    orange: '#E8673C'
  },
  ease: 'power3.out',
  duration: 0.3
};

export default function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blueLRef = useRef<HTMLDivElement>(null);
  const blueLInnerRef = useRef<SVGSVGElement>(null);
  const orangeBoxRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Timelines and tweens
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const bobRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch) return;

    const wrapper = wrapperRef.current;
    const blueL = blueLRef.current;
    const blueLInner = blueLInnerRef.current;
    const orangeBox = orangeBoxRef.current;
    const label = labelRef.current;
    if (!wrapper || !blueL || !blueLInner || !orangeBox || !label) return;

    // Quick setters for smooth lag
    const setX = gsap.quickTo(wrapper, "x", { duration: 0.15, ease: "power3.out" });
    const setY = gsap.quickTo(wrapper, "y", { duration: 0.15, ease: "power3.out" });

    // Idle bobbing animation on the blue L (inner SVG to isolate from positional states)
    bobRef.current = gsap.to(blueLInner, {
      y: -3,
      duration: 0.7, // 1.4s total loop
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      paused: isReduced
    });

    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;
    let currentTarget: Element | null = null;
    let currentState = 'default';
    let isMouseDown = false;
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const playState = (state: string, target: Element | null) => {
      if (currentState === state && currentTarget === target) return;
      currentState = state;
      currentTarget = target;

      if (tlRef.current) tlRef.current.kill();

      // Override duration to 0 if reduced motion
      const dur = isReduced ? 0 : config.duration;
      const tl = gsap.timeline({ defaults: { duration: dur, ease: config.ease } });
      tlRef.current = tl;

      if (state !== 'default' && !isReduced) {
        bobRef.current?.pause();
      }

      if (state === 'btn' && target) {
        const rect = target.getBoundingClientRect();

        // Reset wrapper scaling in case coming from txt state
        tl.to(wrapper, { scale: 1 }, 0);

        const targetW = rect.width + 16;
        const targetH = rect.height + 16;

        // Animate orange box to form the hollow frame
        tl.to(orangeBox, {
          width: targetW,
          height: targetH,
          backgroundColor: 'transparent',
          border: `2px solid ${config.colors.orange}`,
          borderRadius: 8,
          x: -targetW / 2 + 6, // CSS left is -6, offset to center
          y: -targetH / 2 + 6
        }, 0);

        // Animate blue L to top-right corner marker
        tl.to(blueL, {
          scale: 10 / 24,
          x: targetW / 2 + 3,
          y: -targetH / 2 + 11
        }, 0);

        tl.to(label, { opacity: 0 }, 0);

      } else if (state === 'img' && target) {
        tl.to(wrapper, { scale: 1 }, 0);

        tl.to(orangeBox, {
          width: 64,
          height: 64,
          backgroundColor: config.colors.orange,
          border: 'none',
          borderRadius: 32,
          x: -32 + 6,
          y: -32 + 6
        }, 0);

        // Dock blue L to top-right of pill
        tl.to(blueL, {
          scale: 12 / 24,
          x: 31,
          y: -6
        }, 0);

        label.innerText = target.getAttribute('data-cursor-label') || "View";
        tl.to(label, { opacity: 1 }, 0);

      } else if (state === 'txt') {
        tl.to(wrapper, { scale: 12 / 26 }, 0);

        tl.to(orangeBox, {
          width: 12, height: 12,
          backgroundColor: config.colors.orange,
          border: 'none',
          borderRadius: 0,
          x: 0, y: 0
        }, 0);

        tl.to(blueL, { scale: 1, x: 0, y: 0 }, 0);
        tl.to(label, { opacity: 0 }, 0);

      } else {
        // Default idle state
        tl.to(wrapper, { scale: 1 }, 0);

        tl.to(orangeBox, {
          width: 12, height: 12,
          backgroundColor: config.colors.orange,
          border: 'none',
          borderRadius: 0,
          x: isMouseDown ? -4 : 0,
          y: isMouseDown ? 4 : 0
        }, 0);

        tl.to(blueL, { scale: 1, x: 0, y: 0 }, 0);
        tl.to(label, { opacity: 0 }, 0);

        if (!isReduced) bobRef.current?.resume();
      }
    };

    const updatePosition = () => {
      if (currentState === 'btn' && currentTarget) {
        const rect = currentTarget.getBoundingClientRect();
        // Snap to center of target
        setX(rect.left + rect.width / 2);
        setY(rect.top + rect.height / 2);

        // Sync dimensions in case the element moves or resizes on scroll
        const targetW = rect.width + 16;
        const targetH = rect.height + 16;
        gsap.to(orangeBox, {
          width: targetW, height: targetH,
          x: -targetW / 2 + 6, y: -targetH / 2 + 6,
          duration: 0.1
        });
        gsap.to(blueL, {
          x: targetW / 2 + 3, y: -targetH / 2 + 11,
          duration: 0.1
        });
      } else {
        setX(clientX);
        setY(clientY);
      }
    };

    const detectState = (target: Element | null) => {
      if (!target) return playState('default', null);
      const btn = target.closest('a, button, [data-cursor]');
      if (btn) return playState('btn', btn);
      const img = target.closest('img, video');
      if (img) return playState('img', img);
      const txt = target.closest('p, h1, h2, h3, h4, h5, h6, li, span');
      if (txt) return playState('txt', txt);
      playState('default', null);
    };

    const onMove = (e: MouseEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
      detectState(e.target as Element);
      updatePosition();
    };

    const onScroll = () => {
      const target = document.elementFromPoint(clientX, clientY);
      detectState(target);
      updatePosition();

      // Scroll velocity effect
      if (currentState !== 'btn' && currentState !== 'img' && currentState !== 'txt' && !isReduced) {
        const currentScrollY = window.scrollY;
        const dy = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;

        const stretch = Math.min(Math.abs(dy) / 100, 0.25);
        gsap.to(blueLInner, {
          scaleY: 1 + stretch,
          y: -24 * stretch,
          duration: 0.1,
          overwrite: 'auto'
        });

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          gsap.to(blueLInner, {
            scaleY: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: () => {
              if (currentState === 'default' && !isReduced) {
                bobRef.current?.restart();
              }
            }
          });
        }, 100);
      }
    };

    const onMouseDown = () => {
      isMouseDown = true;
      if (currentState === 'default') {
        gsap.to(orangeBox, { x: -4, y: 4, duration: 0.15, ease: 'power2.out' });
      }
    };

    const onMouseUp = () => {
      isMouseDown = false;
      if (currentState === 'default') {
        gsap.to(orangeBox, { x: 0, y: 0, duration: 0.3, ease: 'back.out(2)' });
      }
    };

    const onMouseLeave = () => {
      gsap.to(wrapper, { opacity: 0, duration: 0.2 });
    };

    const onMouseEnter = () => {
      gsap.to(wrapper, { opacity: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove, { capture: false });
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('mousedown', onMouseDown, { capture: false });
      window.removeEventListener('mouseup', onMouseUp, { capture: false });
      document.removeEventListener('mouseleave', onMouseLeave, { capture: false });
      document.removeEventListener('mouseenter', onMouseEnter, { capture: false });
      if (tlRef.current) tlRef.current.kill();
      if (bobRef.current) bobRef.current.kill();
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="custom-cursor"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        width: 0, height: 0
      }}
    >
      {/* 
        The pointer hotspot is at 0,0 in this wrapper.
        The orange box is 12x12, so to center it, it needs to be offset by -6, -6.
        The blue L is 24x24, its notch fits the orange box perfectly.
        Notch is 14x14 at the bottom-left, leaving a 2px gap between the L and the box.
      */}
      <div
        ref={blueLRef}
        style={{
          position: 'absolute',
          top: '-19px',
          left: '-4px',
          width: '24px',
          height: '24px',
          transformOrigin: 'top left'
        }}
      >
        <svg
          ref={blueLInnerRef}
          width="24" height="24" viewBox="0 0 24 24"
          style={{ transformOrigin: 'top left', display: 'block' }}
        >
          {/* L shape: Left stem, top branch */}
          <path d="M0 0 H24 V24 H14 V10 H0 Z" fill={config.colors.blue} />
        </svg>
      </div>

      <div
        ref={orangeBoxRef}
        style={{
          position: 'absolute',
          top: '-6px',
          left: '-6px',
          width: '12px',
          height: '12px',
          backgroundColor: config.colors.orange,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}
      >
        <span
          ref={labelRef}
          style={{
            opacity: 0,
            color: 'white',
            fontSize: '12px',
            fontFamily: 'var(--font-mono, monospace)',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
        />
      </div>
    </div>
  );
}
