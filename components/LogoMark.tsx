import React from 'react';
import { animConfig } from '@/lib/animConfig';

export function LogoMark({ className = "", blueRef, orangeRef, clipId, style }: { className?: string, blueRef?: React.RefObject<SVGPathElement | null>, orangeRef?: React.RefObject<SVGRectElement | null>, clipId?: string, style?: React.CSSProperties }) {
  // Using a geometric L shape and an orange square in the notch
  // L shape covers Top and Left (inverted L) to point Up/Right
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {clipId && (
        <clipPath id={clipId}>
          <path d="M0 100 L0 0 L100 0 L100 40 L40 40 L40 100 Z" />
        </clipPath>
      )}
      <path 
        ref={blueRef as any}
        d="M0 100 L0 0 L100 0 L100 40 L40 40 L40 100 Z" 
        fill={animConfig.colors.blue} 
      />
      <rect 
        ref={orangeRef as any}
        x="45" 
        y="45" 
        width="55" 
        height="55" 
        fill={animConfig.colors.orange} 
      />
    </svg>
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <LogoMark className="w-12 h-12" style={{ width: '48px', height: '48px', flexShrink: 0 }} />
      <div style={{ color: animConfig.colors.blue, fontSize: '28px', fontWeight: 700, lineHeight: 1.1, fontFamily: 'var(--display)' }}>
        Logistics<br/>Studio
      </div>
    </div>
  );
}
