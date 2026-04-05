'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'ELEVATE',
    category: 'E-COMMERCE',
    year: '2025',
    image: 'https://picsum.photos/seed/elevate/1920/1080?blur=2'
  },
  {
    id: 2,
    title: 'NEXUS',
    category: 'FINTECH',
    year: '2026',
    image: 'https://picsum.photos/seed/nexus/1920/1080?blur=2'
  },
  {
    id: 3,
    title: 'AURA',
    category: 'LIFESTYLE',
    year: '2024',
    image: 'https://picsum.photos/seed/aura/1920/1080?blur=2'
  },
  {
    id: 4,
    title: 'ZENITH',
    category: 'PORTFOLIO',
    year: '2026',
    image: 'https://picsum.photos/seed/zenith/1920/1080?blur=2'
  }
];

export default function WorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    const getScrollAmount = () => {
      let scrollWidth = scrollContainer.scrollWidth;
      return -(scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(scrollContainer, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-graphite text-white overflow-hidden">
      <div className="absolute top-12 left-12 z-10">
        <h2 className="text-2xl font-bold tracking-widest uppercase">Selected Works</h2>
      </div>
      
      <div ref={scrollContainerRef} className="flex h-full w-max items-center px-[10vw]">
        {projects.map((project, index) => (
          <div key={project.id} className="relative w-[80vw] md:w-[60vw] h-[60vh] mx-[5vw] flex-shrink-0 flex flex-col justify-center">
            {/* Text Mask Effect */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-graphite mix-blend-screen pointer-events-none" />
              
              <h3 className="text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none text-white mix-blend-multiply pointer-events-none">
                {project.title}
              </h3>
            </div>
            
            <div className="flex justify-between items-center mt-6 border-t border-white/20 pt-4">
              <span className="text-sm md:text-base font-medium tracking-widest text-alabaster-grey">{project.category}</span>
              <span className="text-sm md:text-base font-mono text-stormy-teal">{project.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
