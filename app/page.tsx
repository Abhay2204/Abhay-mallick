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

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

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
        {isMobile ? (
          <MobileView key="mobile" />
        ) : (
          <div key="desktop">
            <ChatWidget />
            <main className="w-full min-h-screen bg-white">
              <HeroSection />
              <AboutSection />
              <ExpertiseSection />
              <SkillsSection />
              <TimelineSection />
              <ProjectsSection />
              <UiUxGallery />
              <Footer />
            </main>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
