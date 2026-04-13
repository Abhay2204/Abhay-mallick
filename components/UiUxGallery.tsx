'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import SwissGrid from './SwissGrid';

gsap.registerPlugin(ScrollTrigger);

const CURTAIN_COLORS = [
  '#1a1a1a',
  '#212121',
  '#2a2a2a',
  '#1f1f1f',
  '#161616',
];

const galleryItems = [
  {
    id: 1,
    type: 'text',
    title: 'VISUAL\nPROTOTYPES',
    desc: 'A curated selection of interface designs, motion studies, and user experience concepts.',
    gridClass: 'col-span-4 md:col-span-5 md:col-start-1 pt-10 md:pt-32',
    speed: 1,
  },
  {
    id: 2,
    type: 'local-video',
    src: '/gallary/beautiful ui 1.mp4',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-5 md:col-start-7 mt-16 md:mt-0',
    speed: 1.15,
  },
  {
    id: 3,
    type: 'local-video',
    src: '/gallary/beautiful ui2.mp4',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-5 md:col-start-2 mt-16 md:mt-40',
    speed: 0.85,
  },
  {
    id: 4,
    type: 'youtube',
    title: 'Nike x Motorsport',
    ytId: 'ELFXqa3f39k',
    href: 'https://nikexmototsport.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-6 md:col-start-7 mt-16 md:mt-12',
    speed: 1.1,
  },
  {
    id: 5,
    type: 'youtube',
    title: 'Horizon XR',
    ytId: 'ocmy-UtrVUA',
    href: 'https://horizon-xr.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-4 md:col-start-1 mt-16 md:mt-32',
    speed: 0.9,
  },
  {
    id: 6,
    type: 'youtube',
    title: 'Drone UIUX',
    ytId: 'LYjg3dmH99c',
    href: 'https://drone-uiux.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-5 md:col-start-8 mt-16 md:mt-24',
    speed: 1.2,
  },
  {
    id: 7,
    type: 'youtube',
    title: 'Legacy Construction',
    ytId: 'sMhU-C2V4c0',
    href: undefined,
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-5 md:col-start-2 mt-16 md:mt-48',
    speed: 0.8,
  },
  {
    id: 8,
    type: 'youtube',
    title: 'Air Jordan Concept',
    ytId: 'j1jYFcBvd5c',
    href: 'https://air-jordan-plum.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-4 md:col-start-7 mt-16 md:mt-16',
    speed: 1.15,
  },
  {
    id: 9,
    type: 'youtube',
    title: 'Lumina Botanical',
    ytId: 'r9T0iu_7aF0',
    href: 'https://lumina-botanical.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-6 md:col-start-1 mt-16 md:mt-40',
    speed: 0.85,
  },
  {
    id: 10,
    type: 'youtube',
    title: 'Inferno I300 Concept',
    ytId: 'Sc-MOqQGFB4',
    href: 'https://inferno-i-300.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-5 md:col-start-8 mt-16 md:mt-32',
    speed: 1.1,
  },
  {
    id: 11,
    type: 'youtube',
    title: 'Tiyara',
    ytId: 'rgVRF1TW1E8',
    href: 'https://tiyara-shopify.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-4 md:col-start-2 mt-16 md:mt-48',
    speed: 0.9,
  },
  {
    id: 12,
    type: 'youtube',
    title: 'Jesko Absolute Concept',
    ytId: 'xI2ZG-bQggE',
    href: 'https://jesko-absolute.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-5 md:col-start-7 mt-16 md:mt-20',
    speed: 1.2,
  },
  {
    id: 13,
    type: 'youtube',
    title: 'Nirvana',
    ytId: 'TBmxkSvRJfA',
    href: 'https://nirvana-timeless-luxury.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-5 md:col-start-1 mt-16 md:mt-32',
    speed: 0.8,
  },
  {
    id: 14,
    type: 'youtube',
    title: 'Atelier',
    ytId: 'mxZt6kVx9jM',
    href: 'https://atelier-premium-geans.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-6 md:col-start-7 mt-16 md:mt-40',
    speed: 1.15,
  },
  {
    id: 15,
    type: 'youtube',
    title: 'Air Walk',
    ytId: 'tI-6n6nV5wA',
    href: 'https://airwalk-shopify.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-4 md:col-start-3 mt-16 md:mt-48',
    speed: 0.85,
  },
  {
    id: 16,
    type: 'youtube',
    title: 'Vantage Architectural Excellence',
    ytId: 'U3MgiImMnds',
    href: 'https://vantage-architectural-excellence.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-4 md:col-start-8 mt-16 md:mt-20',
    speed: 1.1,
  },
  {
    id: 17,
    type: 'youtube',
    title: 'Neon Suture',
    ytId: 'c6ne47PqqDg',
    href: 'https://neon-suture.vercel.app/',
    aspect: 'aspect-[16/9]',
    gridClass: 'col-span-4 md:col-span-5 md:col-start-1 mt-16 md:mt-32',
    speed: 0.9,
  },
  {
    id: 18,
    type: 'link',
    title: 'VIEW\nARCHIVE',
    href: 'https://design-by-abhay.vercel.app/',
    gridClass: 'col-span-4 md:col-span-4 md:col-start-7 mt-32 md:mt-48 mb-32',
    speed: 1,
  }
];

const GalleryItem = ({ item }: { item: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type === 'local-video' && videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, item.type]);

  if (item.type === 'text') {
    return (
      <div className={`gallery-item ${item.gridClass} flex flex-col gap-8`} data-speed={item.speed}>
        <p className="font-mono text-sm uppercase tracking-widest text-stormy-teal">
          [ 03 ] Gallery
        </p>
        <h2 className="text-[8vw] md:text-[5vw] font-black tracking-tighter uppercase leading-[0.9]">
          {item.title}
        </h2>
        <p className="text-lg md:text-xl text-white/70 max-w-md">
          {item.desc}
        </p>
      </div>
    );
  }

  if (item.type === 'local-video') {
    return (
      <a 
        key={item.id} 
        href={item.href || '#'}
        target={item.href ? "_blank" : undefined}
        rel={item.href ? "noopener noreferrer" : undefined}
        className={`gallery-item block ${item.gridClass} ${item.aspect} relative overflow-hidden group bg-black/40 rounded-xl ${item.href ? 'cursor-pointer' : 'cursor-default'}`} 
        data-speed={item.speed}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => { if (!item.href) e.preventDefault(); }}
      >
        <video
          ref={videoRef}
          src={item.src}
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
        />
        {!isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2" />
             </div>
          </div>
        )}
      </a>
    );
  }

  if (item.type === 'youtube') {
    return (
      <a 
        key={item.id} 
        href={item.href || '#'}
        target={item.href ? "_blank" : undefined}
        rel={item.href ? "noopener noreferrer" : undefined}
        className={`gallery-item block ${item.gridClass} ${item.aspect} relative overflow-hidden group bg-black/40 rounded-xl ${item.href ? 'cursor-pointer' : 'cursor-default'}`} 
        data-speed={item.speed}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => { if (!item.href) e.preventDefault(); }}
      >
        {isHovered ? (
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <iframe
              src={`https://www.youtube.com/embed/${item.ytId}?autoplay=1&mute=1&loop=1&playlist=${item.ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] object-cover"
              frameBorder="0"
              allow="autoplay; encrypted-media"
            />
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={`https://img.youtube.com/vi/${item.ytId}/maxresdefault.jpg`} 
              className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              alt={item.title}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2" />
                </div>
            </div>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/40 transition-colors duration-500 flex items-center justify-center pointer-events-none">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 font-mono text-white/90 text-[10px] tracking-widest uppercase border border-white/30 px-6 py-3 rounded-full backdrop-blur-md bg-black/20">
              {item.title}
            </div>
        </div>
      </a>
    );
  }

  if (item.type === 'link') {
    return (
      <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" className={`gallery-item ${item.gridClass} group no-underline flex flex-col items-start gap-8`} data-speed={item.speed}>
        <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-graphite transition-colors duration-500">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2">
            <line x1="5" y1="19" x2="19" y2="5"></line>
            <polyline points="15 5 19 5 19 9"></polyline>
          </svg>
        </div>
        <h2 className="text-[8vw] md:text-[5vw] font-black tracking-tighter uppercase leading-[0.9] group-hover:text-stormy-teal transition-colors duration-500">
          {item.title}
        </h2>
      </a>
    );
  }

  return null;
};

export default function UiUxGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const curtain = curtainRef.current;
    if (!section || !curtain) return;

    const panels = gsap.utils.toArray<HTMLElement>('.curtain-panel', curtain);

    gsap.set(panels, { yPercent: 0 });

    const ctx = gsap.context(() => {
      gsap.to(panels, {
        yPercent: -100,
        duration: 1.1,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.5,
          from: 'start',
        },
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          gsap.set(curtain, { display: 'none' });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-graphite text-white relative py-32 overflow-hidden">

      {/* ── 5-Layer Curtain Overlay ── */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-30 flex pointer-events-none"
        aria-hidden="true"
      >
        {CURTAIN_COLORS.map((color, i) => (
          <div
            key={i}
            className="curtain-panel h-full flex-1"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pointer-events-none opacity-5 z-0 overflow-hidden">
        <h2 className="text-[20vw] font-black leading-none whitespace-nowrap -ml-[5vw]">USER EXPERIENCE</h2>
        <h2 className="text-[20vw] font-black leading-none whitespace-nowrap -ml-[10vw]">INTERFACE DESIGN</h2>
        <h2 className="text-[20vw] font-black leading-none whitespace-nowrap -ml-[2vw]">PROTOTYPING</h2>
      </div>

      <SwissGrid className="relative z-10">
        {galleryItems.map((item) => (
          <GalleryItem key={item.id} item={item} />
        ))}
      </SwissGrid>
    </section>
  );
}

