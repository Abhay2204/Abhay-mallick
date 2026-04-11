'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const baseCol1 = ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'VUE.JS', 'GSAP'];
const baseCol2 = ['NODE.JS', 'EXPRESS JS', 'MONGO DB', 'POSTGRESQL', 'SQL', 'REST API'];
const baseCol3 = ['ANDROID', 'JETPACK', 'KOTLIN', 'AWS', 'DOCKER', 'SYSTEM DESIGN'];
const baseCol4 = ['FIGMA', 'UI/UX', 'GIT', 'AGILE', 'ANALYTICS', 'ARCHITECTURE'];

// Repeat arrays to make them extremely long for continuous scrolling
const col1 = Array(10).fill(baseCol1).flat();
const col2 = Array(10).fill(baseCol2).flat();
const col3 = Array(10).fill(baseCol3).flat();
const col4 = Array(10).fill(baseCol4).flat();

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial positions for parallax arrays
    gsap.set('.col-down', { yPercent: -50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // We manually construct our timeline using virtual 'durations' strictly as ratios of scrub-scroll.
    // Total virtual duration = 10.

    // 1. Curtains split to 35vh (occupies virtual scrub time 0 to 4)
    tl.to('.top-curtain', { y: '-35vh', ease: 'power2.inOut', duration: 4 }, 0);
    tl.to('.bottom-curtain', { y: '35vh', ease: 'power2.inOut', duration: 4 }, 0);
    tl.to('.top-curtain-inner', { y: '35vh', ease: 'power2.inOut', duration: 4 }, 0);
    tl.to('.bottom-curtain-inner', { y: '-35vh', ease: 'power2.inOut', duration: 4 }, 0);

    // 2. Continuous rotating text columns (drifting the entire virtual time 0 to 10)
    tl.to('.col-up', { yPercent: -50, ease: 'none', duration: 10 }, 0);
    tl.to('.col-down', { yPercent: 0, ease: 'none', duration: 10 }, 0);

    // 3. The Grand Reveal Split Exit (occupies virtual scrub time 8 to 10)
    // Pulls BOTH the solid base layers and the curtains completely out, turning the screen 100% transparent
    const finalStart = 8;
    tl.to('.base-layer-top, .top-curtain', { y: '-60vh', ease: 'power3.inOut', duration: 2 }, finalStart);
    tl.to('.base-layer-bottom, .bottom-curtain', { y: '60vh', ease: 'power3.inOut', duration: 2 }, finalStart);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const renderColumns = (isSolid: boolean) => (
    <div className="w-full h-[100vh] flex">
      <div className="col-up w-1/4 h-max border-r border-white/10 flex flex-col">
        {col1.map((item, i) => (
          <div key={i} className="w-full text-center py-4 md:py-6">
            <span
              className={`text-[4vw] font-black uppercase inline-block ${isSolid ? 'text-white' : 'text-transparent'}`}
              style={!isSolid ? { WebkitTextStroke: '1.5px rgba(255,255,255,0.15)' } : {}}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      <div className="col-down w-1/4 h-max border-r border-white/10 flex flex-col">
        {col2.map((item, i) => (
          <div key={i} className="w-full text-center py-4 md:py-6">
            <span
              className={`text-[4vw] font-black uppercase inline-block ${isSolid ? 'text-white' : 'text-transparent'}`}
              style={!isSolid ? { WebkitTextStroke: '1.5px rgba(255,255,255,0.15)' } : {}}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      <div className="col-up w-1/4 h-max border-r border-white/10 flex flex-col">
        {col3.map((item, i) => (
          <div key={i} className="w-full text-center py-4 md:py-6">
            <span
              className={`text-[4vw] font-black uppercase inline-block ${isSolid ? 'text-white' : 'text-transparent'}`}
              style={!isSolid ? { WebkitTextStroke: '1.5px rgba(255,255,255,0.15)' } : {}}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      <div className="col-down w-1/4 h-max flex flex-col">
        {col4.map((item, i) => (
          <div key={i} className="w-full text-center py-4 md:py-6">
            <span
              className={`text-[4vw] font-black uppercase inline-block ${isSolid ? 'text-white' : 'text-transparent'}`}
              style={!isSolid ? { WebkitTextStroke: '1.5px rgba(255,255,255,0.15)' } : {}}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative w-full h-[250vh] bg-transparent z-10 pointer-events-none">
      <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-auto">

        {/* Base Layer Split Top (Reveals Top Half) */}
        <div className="base-layer-top absolute top-0 left-0 w-full h-[50vh] overflow-hidden bg-graphite z-10 border-b border-white/5">
          <div className="absolute top-0 left-0 w-full h-[100vh]">
            {renderColumns(true)}
          </div>
        </div>

        {/* Base Layer Split Bottom (Reveals Bottom Half perfectly aligned) */}
        <div className="base-layer-bottom absolute bottom-0 left-0 w-full h-[50vh] overflow-hidden bg-graphite z-10 border-t border-white/5">
          <div className="absolute bottom-0 left-0 w-full h-[100vh]">
            {renderColumns(true)}
          </div>
        </div>

        {/* Top Curtain */}
        <div className="top-curtain absolute top-0 left-0 w-full h-[50vh] overflow-hidden bg-graphite z-20 border-b border-white/10 shadow-[0_2px_40px_rgba(0,0,0,0.5)]">
          <div className="top-curtain-inner absolute top-0 left-0 w-full h-[100vh]">
            {renderColumns(false)}
          </div>
          <div className="absolute bottom-0 left-0 w-full flex justify-center bg-gradient-to-t from-graphite via-graphite/80 to-transparent pt-24 pb-2">
            <h2 className="text-[12vw] font-black text-white uppercase tracking-tighter leading-[0.8] text-center drop-shadow-2xl">
              TECHNICAL
            </h2>
          </div>
        </div>

        {/* Bottom Curtain */}
        <div className="bottom-curtain absolute bottom-0 left-0 w-full h-[50vh] overflow-hidden bg-graphite z-20 border-t border-white/10 shadow-[0_-2px_40px_rgba(0,0,0,0.5)]">
          <div className="bottom-curtain-inner absolute bottom-0 left-0 w-full h-[100vh]">
            {renderColumns(false)}
          </div>
          <div className="absolute top-0 left-0 w-full flex justify-center bg-gradient-to-b from-graphite via-graphite/80 to-transparent pb-24 pt-2">
            <h2 className="text-[12vw] font-black text-white uppercase tracking-tighter leading-[0.8] text-center drop-shadow-2xl">
              ARSENAL
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
}
