'use client';

import React from 'react';
import SwissGrid from './SwissGrid';
import HyperTextParagraph from '@/components/ui/hyper-text-with-decryption';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const bio = "I am a Computer Science Engineer and Full Stack Developer passionate about building robust web and mobile applications. From SpringBoot microservices to interactive React/Next.js interfaces, I turn complex problems into efficient, scalable software.";

  const triggers = ["Engineer", "Developer", "passionate", "SpringBoot", "microservices", "React/Next.js", "interfaces", "scalable"];

  return (
    <section className="relative w-full py-32 md:py-48 bg-alabaster-grey text-graphite overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px]" />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <SwissGrid className="relative z-10">
        <div className="col-span-4 md:col-span-2 lg:col-span-3 mb-8 md:mb-0">
          <div className="text-sm md:text-base font-bold tracking-widest uppercase text-stormy-teal flex items-center gap-4">
            <span>01</span>
            <div className="w-8 h-[2px] bg-stormy-teal" />
            <span>About</span>
          </div>
        </div>

        <div className="col-span-4 md:col-span-6 lg:col-span-9">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full relative"
          >
            {/* Main Content Card */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2rem] p-8 md:p-12 lg:p-16">
              <HyperTextParagraph
                text={bio}
                highlightWords={triggers}
                className="text-2xl md:text-3xl lg:text-4xl text-graphite font-normal"
              />
            </div>
          </motion.div>
        </div>
      </SwissGrid>
    </section>
  );
}
