'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount1 = 80;
const frameCount2 = 128;
const totalFrames = frameCount1 + frameCount2; // 208

const pad = (n: number) => n.toString().padStart(3, '0');

const getFramePath = (index: number) => {
  if (index < frameCount1) {
    return `/frames 1/ezgif-frame-${pad(index + 1)}.jpg`;
  } else {
    const f2Index = index - frameCount1;
    return `/frames 2/ezgif-frame-${pad(f2Index + 1)}.jpg`;
  }
};

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter Refs
  const text1Ref = useRef<HTMLSpanElement>(null);
  const caret1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const caret2Ref = useRef<HTMLSpanElement>(null);

  // Seq 2 Refs
  const seq2LeftRef = useRef<HTMLDivElement>(null);
  const seq2RightRef = useRef<HTMLDivElement>(null);
  const seq1ContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const renderFrame = (index: number) => {
      if (images[index] && images[index].complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[index];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

        if (imgRatio > canvasRatio) {
          drawHeight = canvas.height;
          drawWidth = img.width * (canvas.height / img.height);
          offsetX = (canvas.width - drawWidth) / 2;
        } else {
          drawWidth = canvas.width;
          drawHeight = img.height * (canvas.width / img.width);
          offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Preload
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1 || i === 0) renderFrame(0);
      };
      images.push(img);
    }

    if (images[0] && images[0].complete) {
      renderFrame(0);
    }

    const frameObj = { index: 0 };

    // Typewriter state
    const str1 = "Hello, welcome to my portfolio.";
    const str2 = "I am Abhay Mallick, FULL STACK DEVELOPER .";
    const typedObj = { t1: 0, t2: 0 };

    const ctxGsap = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=600%', // Slower frame changes
          pin: true,
          scrub: 1,
        }
      });

      tl.to(frameObj, {
        index: totalFrames - 1,
        snap: 'index',
        ease: 'none',
        duration: 1,
        onUpdate: () => renderFrame(frameObj.index)
      }, 0);

      // ----- Seq 1: Coming and Going -----
      tl.fromTo(seq1ContainerRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.1, ease: 'power2.out' },
        0
      );

      // Type String 1
      tl.to(typedObj, {
        t1: str1.length,
        duration: 0.15,
        ease: 'none',
        onUpdate: () => {
          if (text1Ref.current) text1Ref.current.innerText = str1.slice(0, Math.floor(typedObj.t1));
        }
      }, 0.05);

      // Type String 2
      tl.to(typedObj, {
        t2: str2.length,
        duration: 0.18,
        ease: 'none',
        onStart: () => {
          if (caret1Ref.current) caret1Ref.current.style.opacity = '0';
          if (caret2Ref.current) caret2Ref.current.style.opacity = '1';
        },
        onReverseComplete: () => {
          if (caret1Ref.current) caret1Ref.current.style.opacity = '1';
          if (caret2Ref.current) caret2Ref.current.style.opacity = '0';
        },
        onUpdate: () => {
          if (text2Ref.current) text2Ref.current.innerText = str2.slice(0, Math.floor(typedObj.t2));
        }
      }, 0.22);

      // Elegant Exit for Seq 1
      tl.to(seq1ContainerRef.current, {
        opacity: 0,
        y: -30,
        filter: 'blur(10px)',
        duration: 0.1,
        ease: 'power2.in'
      }, 0.45);

      // ----- Seq 2: Coming and Going -----
      tl.fromTo(seq2LeftRef.current,
        { opacity: 0, x: -50, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.15, ease: 'expo.out' },
        0.55
      );

      tl.fromTo(seq2RightRef.current,
        { opacity: 0, x: 50, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.15, ease: 'expo.out' },
        0.60
      );

      // Exit for Seq 2
      tl.to([seq2LeftRef.current, seq2RightRef.current], {
        opacity: 0,
        y: -20,
        filter: 'blur(5px)',
        duration: 0.1,
        ease: 'power2.in'
      }, 0.85);

      tl.to({}, { duration: 0.05 }, 0.95); // Shorter spacer so that we don't artificially extend the timeline past the images.
    }, containerRef);

    return () => ctxGsap.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-alabaster-grey overflow-hidden">
      {/* Raw Canvas Unmasked */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Sequence 1: Clean Typewriter Effect */}
      <div ref={seq1ContainerRef} className="absolute bottom-[8%] md:bottom-auto md:top-[25%] left-[5%] md:left-[8vw] z-10 pointer-events-none w-[90%] md:w-full max-w-[450px]">
        <div className="md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none md:p-0 bg-white/60 backdrop-blur-md border border-white/30 shadow-xl p-6 rounded-2xl">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-graphite mb-4 flex flex-wrap items-center leading-snug">
            <span ref={text1Ref}></span>
            <span ref={caret1Ref} className="inline-block w-1 md:w-[4px] h-8 md:h-10 bg-graphite ml-2 animate-[pulse_1s_infinite_step-end]"></span>
          </h1>

          <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-stormy-teal flex flex-wrap items-center leading-relaxed mt-4">
            <span ref={text2Ref}></span>
            <span ref={caret2Ref} className="inline-block w-1 md:w-[4px] h-5 md:h-6 bg-stormy-teal ml-2 opacity-0 animate-[pulse_1s_infinite_step-end]"></span>
          </h2>
        </div>
      </div>

      {/* Sequence 2: Stats & Details Showcase */}
      {/* Mobile: Stack them at the bottom. Desktop: Spread horizontally and center vertically */}
      <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-end md:justify-between z-10 pointer-events-none px-[5vw] md:px-[8vw] pb-[8vh] md:pb-0 md:pt-0 max-w-[1600px] mx-auto">

        {/* Left Panel */}
        <div ref={seq2LeftRef} className="opacity-0 grid grid-cols-2 gap-x-4 gap-y-6 md:flex md:flex-col md:gap-10 mt-0 md:mt-[-10vh] w-full md:w-auto text-left md:text-left md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none md:p-0 bg-white/60 backdrop-blur-md border border-white/30 shadow-xl p-5 rounded-2xl">
          <div>
            <p className="font-mono text-xs md:text-sm tracking-widest text-stormy-teal uppercase mb-1">Role</p>
            <h2 className="text-lg md:text-4xl font-black uppercase tracking-wide text-graphite">
              FULL STACK<br className="hidden md:block" />
              <span className="md:hidden"> DEVELOPER</span>
              <span className="hidden md:inline">DEVELOPER</span>
            </h2>
          </div>
          <div>
            <p className="font-mono text-xs md:text-sm tracking-widest text-stormy-teal uppercase mb-1">Experience</p>
            <h2 className="text-lg md:text-4xl font-black uppercase tracking-wide text-graphite">
              2+ YEARS
            </h2>
          </div>
          <div className="col-span-2">
            <p className="font-mono text-xs md:text-sm tracking-widest text-stormy-teal uppercase mb-1">Track Record</p>
            <h2 className="text-lg md:text-4xl font-black uppercase tracking-wide text-graphite">
              COMPLETED <span className="md:hidden">50+ PROJECTS</span>
              <br className="hidden md:block" />
              <span className="hidden md:inline">50+ PROJECTS</span>
            </h2>
          </div>
        </div>

        {/* Right Panel */}
        <div ref={seq2RightRef} className="text-left md:text-right opacity-0 flex flex-col items-start md:items-end gap-6 md:gap-10 mt-6 md:mt-[-5vh] w-full md:w-auto md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none md:p-0 bg-white/60 backdrop-blur-md border border-white/30 shadow-xl p-5 rounded-2xl">
          <div>
            <p className="font-mono text-xs md:text-sm tracking-widest text-yale-blue uppercase mb-2">Developed Solutions Focus</p>
            {/* Desktop rendering: multiline. Mobile rendering: single inline text */}
            <h2 className="hidden md:block text-xl md:text-3xl font-black uppercase tracking-wide text-graphite leading-relaxed">
              CRMs<br />
              Mobile Apps<br />
              Ecommerce Sites<br />
              Portfolios & More
            </h2>
            <h2 className="md:hidden text-base font-black uppercase tracking-wide text-graphite leading-normal max-w-[90%]">
              CRMs, Mobile Apps, Ecommerce Sites, Portfolios & More
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
}
