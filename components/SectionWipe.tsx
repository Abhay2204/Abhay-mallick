'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionWipeProps {
  children: React.ReactNode;
  zIndex: number;
}

export default function SectionWipe({ children, zIndex }: SectionWipeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Create a clip-path wipe effect as this section enters the viewport
      gsap.fromTo(sectionRef.current,
        { clipPath: 'circle(0% at 50% 100%)' },
        {
          clipPath: 'circle(150% at 50% 100%)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full" style={{ zIndex }}>
      {children}
    </div>
  );
}
