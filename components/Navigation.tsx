'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Expertise', href: '#' },
  { name: 'Projects', href: '#' },
  { name: 'Gallery', href: '#' },
  { name: 'Contact', href: '#' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const easeCurve: [number, number, number, number] = [0.76, 0, 0.24, 1]; // Smooth, organic easing

  return (
    <>
      {/* Magnetic-style Brutalist Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-[110] mix-blend-difference hover:scale-105 transition-transform duration-300 group"
        aria-label="Toggle Menu"
      >
        <div className="flex flex-col items-end gap-[6px] w-[32px] md:w-10">
          <div 
            className={`w-full h-[2px] bg-white origin-center transition-all duration-500 will-change-transform ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
          />
          <div 
            className={`h-[2px] bg-white transition-all duration-500 will-change-transform ${isOpen ? 'w-0 opacity-0' : 'w-[70%] group-hover:w-full opacity-100'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
          />
          <div 
            className={`w-full h-[2px] bg-white origin-center transition-all duration-500 will-change-transform ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
          />
        </div>
      </button>

      {/* Slide-in Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeCurve }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel sliding from Left */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: easeCurve }}
              className="fixed top-0 left-0 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] h-screen bg-graphite text-white z-[100] border-r border-white/10 flex flex-col justify-center px-8 md:px-16"
            >
              <div className="flex flex-col gap-6 lg:gap-8">
                {navLinks.map((link, i) => (
                  <div key={link.name} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ y: '100%', opacity: 0, rotateZ: 5 }}
                      animate={{ y: '0%', opacity: 1, rotateZ: 0 }}
                      exit={{ y: '100%', opacity: 0, rotateZ: 5 }}
                      transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: easeCurve }}
                      className="text-5xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter hover:text-stormy-teal hover:translate-x-4 transition-all duration-300 block transform-origin-bottom-left"
                    >
                      {link.name}
                    </motion.a>
                  </div>
                ))}
              </div>

              {/* Bottom Info */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-8 left-8 md:bottom-12 md:left-16 flex flex-col gap-2 font-mono text-xs uppercase tracking-widest text-white/50"
              >
                <p>Designed in IST</p>
                <a href="mailto:abhaymallick.dev@gmail.com" className="hover:text-stormy-teal transition-colors">
                  abhaymallick.dev@gmail.com
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
