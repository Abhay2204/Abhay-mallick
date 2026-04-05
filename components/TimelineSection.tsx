'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SwissGrid from './SwissGrid';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: 'Jan 2025 — Present',
    role: 'Freelancer',
    company: 'Remote',
    description: 'Architecting bespoke digital masterpieces blending Swiss design principles with cutting-edge web technologies.'
  },
  {
    year: 'Jul 2024 — Dec 2024',
    role: 'Software Dev Intern',
    company: 'Inspire Engineering Service',
    description: 'Developed and maintained software solutions, collaborating with senior engineers to deliver high-quality code and scalable features.'
  },
  {
    year: 'Jan 2024 — Jun 2024',
    role: 'Java Full Stack Trainee',
    company: 'The Kiran Academy',
    description: 'Mastered object-oriented programming, enterprise patterns, and full-stack architecture using Java and modern web frameworks.'
  }
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    // Line draw animation
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      }
    );

    // Nodes expansion animation
    nodesRef.current.forEach((node, index) => {
      if (!node) return;
      
      const card = node.querySelector('.timeline-card');
      const dot = node.querySelector('.timeline-dot');
      const laptop = node.querySelector('.laptop-img');

      gsap.set(card, { opacity: 0, x: index % 2 === 0 ? 50 : -50 });
      gsap.set(dot, { scale: 0 });

      if (laptop) {
        // Dynamically choose starting corner:
        // Even indices (Card Left, Image Right) fly in from Right (+300x)
        // Odd indices (Card Right, Image Left) fly in from Left (-300x)
        const startX = index % 2 === 0 ? 300 : -300;
        const startRot = index % 2 === 0 ? 10 : -10;
        
        gsap.set(laptop, { opacity: 0, x: startX, y: 150, rotation: startRot, scale: 0.8 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: 'top center+=100',
          end: 'bottom center-=100',
          toggleActions: 'play reverse play reverse',
        }
      });

      tl.to(dot, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' })
        .to(card, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=0.1');

      if (laptop) {
        tl.to(laptop, { 
          opacity: 1, 
          x: 0, 
          y: 0, 
          rotation: 0, 
          scale: 1,
          duration: 0.8, 
          ease: 'power3.out' 
        }, '-=0.4'); // Launch slightly before card finishes opening
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-alabaster-grey text-graphite z-0 -mt-[100vh] pt-[20vh] overflow-hidden">
      <SwissGrid>
        <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-24 text-center">
          <h2 className="text-[6vw] md:text-[4vw] font-black tracking-tighter uppercase leading-none">
            Work <span className="text-yale-blue">Experience</span>
          </h2>
        </div>
      </SwissGrid>

      <div className="relative w-full max-w-5xl mx-auto px-4 z-10">
        {/* The Line */}
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1 bg-graphite/10 -translate-x-1/2" />
        <div 
          ref={lineRef}
          className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1 bg-stormy-teal -translate-x-1/2 origin-top"
        />

        {/* The Nodes */}
        <div className="relative z-10 flex flex-col gap-32 py-16">
          {timelineData.map((item, index) => (
            <div 
              key={index}
              ref={el => { nodesRef.current[index] = el; }}
              className={`relative flex items-center justify-end w-full ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
            >
              {/* Wrapper isolating layout bounds from GSAP transforms */}
              {item.role === 'Freelancer' && (
                <div className="absolute right-0 md:right-[2vw] top-0 bottom-0 pointer-events-none z-[-1] w-[200px] md:w-[450px] flex items-center justify-center">
                  <div className="laptop-img w-full h-auto">
                    <img 
                      src="/images/laptop.png" 
                      alt="Laptop" 
                      className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] object-contain opacity-20 md:opacity-100" 
                    />
                  </div>
                </div>
              )}

              {/* laptop2.png isolated centering wrapper */}
              {item.role === 'Software Dev Intern' && (
                <div className="absolute left-0 md:left-[2vw] top-0 bottom-0 pointer-events-none z-[-1] w-[200px] md:w-[450px] flex items-center justify-center">
                  <div className="laptop-img w-full h-auto">
                    <img 
                      src="/images/laptop2.png" 
                      alt="Laptop 2" 
                      className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] object-contain opacity-20 md:opacity-100" 
                    />
                  </div>
                </div>
              )}

              {/* laptop3.png isolated centering wrapper */}
              {item.role === 'Java Full Stack Trainee' && (
                <div className="absolute right-0 md:right-[2vw] top-0 bottom-0 pointer-events-none z-[-1] w-[200px] md:w-[450px] flex items-center justify-center">
                  <div className="laptop-img w-full h-auto">
                    <img 
                      src="/images/laptop3.png" 
                      alt="Laptop 3" 
                      className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] object-contain opacity-20 md:opacity-100" 
                    />
                  </div>
                </div>
              )}

              {/* The Dot */}
              <div className="absolute left-[30px] md:left-1/2 top-1/2 w-5 h-5 md:w-6 md:h-6 bg-yale-blue rounded-full -translate-x-1/2 -translate-y-1/2 timeline-dot border-4 border-alabaster-grey shadow-sm" />
              
              {/* The Card */}
              <div className={`timeline-card w-[calc(100%-60px)] md:w-[calc(50%-3rem)] text-left ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} bg-white/85 md:bg-white/50 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-white/60 shadow-xl`}>
                <span className="text-stormy-teal font-mono font-bold text-sm md:text-xl mb-1 md:mb-2 block">{item.year}</span>
                <h3 className="text-xl md:text-3xl font-black tracking-tight uppercase mb-1">{item.role}</h3>
                <h4 className="text-sm md:text-lg font-medium text-graphite/70 mb-3 md:mb-4">{item.company}</h4>
                <p className="text-sm md:text-base leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
