'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    id: 1,
    title: 'UI/UX Design',
    subtitle: 'Pixel-Perfect Interfaces',
    img: '/images/uiux1.png',
    align: 'center'
  },
  {
    id: 2,
    title: 'Full Stack Dev',
    subtitle: 'Next.js, Express, MongoDB, React ',
    img: '/images/tafeCrm.png',
    align: 'start'
  },
  {
    id: 3,
    title: 'Mobile Apps',
    subtitle: 'Kotlin & Jetpack Compose',
    img: '/images/health%20tracker.png',
    align: 'end'
  },
  {
    id: 4,
    title: 'AI Solutions',
    subtitle: 'Intelligent Integrations',
    img: '/images/insightflow.png',
    align: 'center'
  },
  {
    id: 5,
    title: 'API & Analytics',
    subtitle: 'Data-Driven Architecture',
    img: '/images/dsa%20guru.png',
    align: 'start'
  },
  {
    id: 6,
    title: 'System Design',
    subtitle: 'Scalable Infrastructure',
    img: '/images/devos.png',
    align: 'end'
  },
];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    // Utilize a singular master timeline to perfectly synchronize horizontal slide and parallax
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // 1. Master translation of the entire flex container
    tl.to(scrollContainer, {
      x: () => -(scrollContainer.scrollWidth - window.innerWidth),
      ease: "none"
    }, 0); // Trigger at start of timeline

    // 2. Bound subtle image drifts rightward
    const images = scrollContainer.querySelectorAll('.parallax-img');
    images.forEach((img) => {
      tl.to(img, {
        x: () => window.innerWidth * 0.1,
        ease: "none"
      }, 0); // Trigger at start of timeline
    });

    // 3. Bound aggressive text drifts leftward creating the overlap
    const texts = scrollContainer.querySelectorAll('.parallax-text');
    texts.forEach((text) => {
      tl.fromTo(text,
        { x: () => window.innerWidth * 0.05 },
        {
          x: () => -window.innerWidth * 0.15,
          ease: "none"
        },
        0 // Trigger at start of timeline
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#111111] text-white overflow-hidden">
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <h2 className="text-xl md:text-2xl font-black tracking-[0.2em] uppercase text-white/50 pointer-events-none mix-blend-difference">Core Expertise</h2>
      </div>

      {/* Container explicitly forced to logical bounds of items */}
      <div ref={scrollContainerRef} className="flex h-full" style={{ width: `${expertiseData.length * 100}vw` }}>
        {expertiseData.map((item, index) => {

          const isEven = index % 2 === 0;

          return (
            <div key={item.id} className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center overflow-hidden">

              {/* Image Container */}
              <div className={`parallax-img absolute z-0 w-[80vw] md:w-[50vw] h-[60vh] flex items-center justify-center transition-all duration-700
                 ${isEven ? 'right-[5vw] md:right-[10vw]' : 'left-[5vw] md:left-[10vw]'}
              `}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain rounded-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] opacity-80 hover:opacity-100 filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Typography */}
              <div className={`parallax-text absolute z-10 flex flex-col justify-center mix-blend-lighten
                 ${isEven ? 'left-[5vw] md:left-[10vw] pr-[10vw] md:pr-[20vw] text-left items-start' : 'right-[5vw] md:right-[10vw] pl-[10vw] md:pl-[20vw] text-right items-end'}
              `}>
                <h3 className="text-[14vw] md:text-[9vw] font-black tracking-tighter leading-[0.9] uppercase text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  {item.title}
                </h3>

                {/* Premium Glass Badge Subtitle */}
                <div className="mt-6 md:mt-8 inline-flex items-center">
                  <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm md:text-lg font-mono text-gray-300 tracking-wide shadow-xl">
                    {item.subtitle}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
