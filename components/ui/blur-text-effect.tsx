'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface BlurTextEffectProps {
  children: string;
  className?: string;
}

function buildWordSpans(text: string) {
  return text.split(' ').map((word, wi, words) => (
    <React.Fragment key={`word-${wi}-${word}`}>
      <span className="inline-block whitespace-nowrap">
        {word.split('').map((char, ci) => (
          <span key={`${wi}-${ci}`} className="char inline-block">
            {char}
          </span>
        ))}
      </span>
      {wi < words.length - 1 && (
        <span className="char inline-block w-[0.3em]" aria-hidden="true">
          {'\u00A0'}
        </span>
      )}
    </React.Fragment>
  ));
}

export const BlurTextEffect: React.FC<BlurTextEffectProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('span.char');

    gsap.set(chars, { opacity: 0, y: 10, filter: 'blur(8px)' });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.015,
      clearProps: 'filter',
    });
  }, [children]);

  return (
    <span className={`inline-block ${className}`} ref={containerRef}>
      {buildWordSpans(children)}
    </span>
  );
};

export default BlurTextEffect;
