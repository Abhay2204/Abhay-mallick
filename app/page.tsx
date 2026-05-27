'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import SkillsSection from '@/components/SkillsSection';
import TimelineSection from '@/components/TimelineSection';
import ProjectsSection from '@/components/ProjectsSection';
import UiUxGallery from '@/components/UiUxGallery';
import Footer from '@/components/Footer';
import MobileView from '@/components/MobileView';
import ChatWidget from '@/components/ChatWidget';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={`${isLoading ? 'h-screen overflow-hidden' : ''} relative z-0`}>
        {isMobile ? (
          <MobileView key="mobile" />
        ) : (
          <div key="desktop">
            <ChatWidget />
            <main id="main-content" className="w-full min-h-screen bg-white" aria-label="Abhay Mallick Portfolio">
              {/* SEO: Visually hidden h1 for crawlers — hero text is JS-driven and invisible to search engines */}
              <h1 className="sr-only">
                Abhay Mallick — Full Stack Developer, Freelancer &amp; Project Developer | Next.js, React, Node.js
              </h1>
              <HeroSection />
              <section id="about" aria-label="About Abhay Mallick"><AboutSection /></section>
              <section id="expertise" aria-label="Core Expertise"><ExpertiseSection /></section>
              <section id="skills" aria-label="Skills & Technologies"><SkillsSection /></section>
              <section id="timeline" aria-label="Career Timeline"><TimelineSection /></section>
              <section id="projects" aria-label="Projects Portfolio"><ProjectsSection /></section>
              <section id="gallery" aria-label="UI/UX Design Gallery"><UiUxGallery /></section>
              <section id="contact" aria-label="Contact Abhay Mallick"><Footer /></section>
            </main>
          </div>
        )}
      </div>
    </>
  );
}
