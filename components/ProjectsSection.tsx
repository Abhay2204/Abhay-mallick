'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'motion/react';
import SwissGrid from './SwissGrid';
import Image from 'next/image';

const projects = [
  {
    id: '01',
    platform: 'Desktop',
    type: 'Development Tool',
    name: 'Cosmic IDE',
    description: 'AI-powered code editor with real-time collaboration, intelligent suggestions, and seamless git integration for modern development workflows.',
    year: '2025',
    tech: ['React', 'Django', 'Electron'],
    img: '/images/cosmic ide.png'
  },
  {
    id: '02',
    platform: 'Web',
    type: 'Enterprise CRM',
    name: 'TAFE CRM',
    description: 'Tailored CRM solution for TAFE institutions — streamlining student enrollment, course management, and staff workflows with a clean, intuitive interface.',
    year: '2025',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    img: '/images/tafeCrm.png'
  },
  {
    id: '03',
    platform: 'Web',
    type: 'AI Task Manager',
    name: 'Nexus AI Task Commander',
    description: 'The perfect AI-powered task manager — featuring Strict Focus Mode, intelligent task breakdown, smart time allocation, priority scheduling, and deep productivity analytics to supercharge your workflow.',
    year: '2025',
    tech: ['Next.js', 'Gemini API', 'Supabase', 'Tailwind'],
    img: '/images/nexus ai task commander.png'
  },
  {
    id: '04',
    platform: 'Web',
    type: 'AI Analytics',
    name: 'InsightFlow',
    description: 'Transform raw data into actionable insights with AI-driven dashboards, custom reports, and predictive analytics.',
    year: '2023',
    tech: ['React', 'Gemini API', 'Recharts'],
    img: '/images/insightflow.png'
  },

  {
    id: '05',
    platform: 'Mobile',
    type: 'Education Platform',
    name: 'CodeX DSA Learning Platform',
    description: 'Interactive DSA learning platform with visual algorithms, practice problems, and progress tracking.',
    year: '2023',
    tech: ['React Native', 'Vue.js'],
    img: '/images/dsa guru.png'
  },
  {
    id: '06',
    platform: 'Mobile',
    type: 'Lifestyle App',
    name: 'Health Track',
    description: 'Personal health companion with activity tracking, meal planning, sleep analysis, and AI wellness recommendations.',
    year: '2022',
    tech: ['MERN Stack'],
    img: '/images/health tracker.png'
  },
  {
    id: '07',
    platform: 'Web',
    type: 'Enterprise Software',
    name: 'NE CRM',
    description: 'Enterprise-grade CRM with automated workflows, predictive analytics, and team collaboration tools for scaling businesses.',
    year: '2024',
    tech: ['React', 'Node.js', 'Supabase'],
    img: '/images/ne crm.png'
  }
];

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isInSection, setIsInSection] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Softer spring — lower stiffness reduces the jumpy/glitchy feel
  const mouseX = useSpring(0, { stiffness: 120, damping: 18 });
  const mouseY = useSpring(0, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Only show the floating image when the cursor is inside the section
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        setIsInSection(inside);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const showImage = isInSection && !!hoveredProject;

  return (
    <section ref={sectionRef} className="w-full py-32 bg-white text-graphite relative">
      <SwissGrid>
        <motion.div 
          className="col-span-4 md:col-span-8 lg:col-span-12 mb-20 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {/* Eyebrow Text */}
          <div className="overflow-hidden mb-6">
            <motion.p 
              variants={{
                hidden: { y: '100%' },
                visible: { y: '0%', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-sm md:text-base font-mono uppercase tracking-widest text-graphite/60 origin-left"
            >
              Crafting digital experiences that matter
            </motion.p>
          </div>
          
          {/* Sliced Title Words */}
          <div className="flex flex-wrap gap-x-4 md:gap-x-6 overflow-hidden pb-4 pt-4 -mt-4">
            <motion.h2 
              variants={{
                hidden: { y: '110%', rotateZ: 5, skewX: -10 },
                visible: { y: '0%', rotateZ: 0, skewX: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-[12vw] md:text-[6vw] font-black tracking-tighter uppercase leading-none origin-bottom-left"
            >
              Selected
            </motion.h2>
            <motion.h2 
              variants={{
                hidden: { y: '110%', rotateZ: 5, skewX: -10 },
                visible: { y: '0%', rotateZ: 0, skewX: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 } }
              }}
              className="text-[12vw] md:text-[6vw] font-black tracking-tighter uppercase leading-none text-stormy-teal origin-bottom-left"
            >
              Works
            </motion.h2>
          </div>
        </motion.div>
        
        <motion.div 
          className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col border-t border-graphite/20 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ perspective: '1200px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 120, rotateX: -15, scale: 0.95, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="group border-b border-graphite/20 cursor-crosshair relative origin-bottom"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="py-8 md:py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 transition-colors duration-500 hover:bg-alabaster-grey/50 px-4 md:px-8 -mx-4 md:-mx-8">
                
                {/* Left: ID & Name */}
                <div className="flex flex-col gap-4 lg:w-1/3">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-graphite/40">{project.id}</span>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase transition-transform duration-500 group-hover:translate-x-4">
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex gap-4 font-mono text-xs uppercase tracking-widest text-graphite/60 pl-8">
                    <span>{project.platform}</span>
                    <span>•</span>
                    <span>{project.type}</span>
                  </div>
                </div>
                
                {/* Middle: Description */}
                <div className="lg:w-1/3 pl-8 lg:pl-0">
                  <p className="text-base md:text-lg font-medium text-graphite/80">
                    {project.description}
                  </p>
                </div>

                {/* Right: Tech & Year */}
                <div className="lg:w-1/4 flex flex-col items-start lg:items-end gap-4 pl-8 lg:pl-0">
                  <span className="font-mono text-sm uppercase tracking-widest text-graphite/60">{project.year}</span>
                  <div className="flex flex-wrap lg:justify-end gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 border border-graphite/20 rounded-full text-xs font-mono uppercase whitespace-nowrap bg-white group-hover:bg-transparent transition-colors duration-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </SwissGrid>

      {/* Floating Image Reveal — only renders when cursor is inside the section */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[400px] h-[300px] z-50 hidden md:flex items-center justify-center opacity-0"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: showImage ? 1 : 0,
          scale: showImage ? 1 : 0.85,
        }}
        transition={{ opacity: { duration: 0.25, ease: 'easeOut' }, scale: { duration: 0.25, ease: 'easeOut' } }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredProject === project.id && showImage ? 1 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <img
              src={project.img}
              alt={project.name}
              className="max-w-full max-h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-lg"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
