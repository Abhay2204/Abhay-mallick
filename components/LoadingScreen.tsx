'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'complete'>('loading');

  useEffect(() => {
    // After 4s of loading, start the reveal phase (show msg and image)
    const loadingTimer = setTimeout(() => {
      setPhase('reveal');
    }, 4000);

    // After 5s of reveal (9s total), start the curtain animation
    const completeTimer = setTimeout(() => {
      setPhase('complete');
      // Wait for the curtain animation (1.5s) to finish before unmounting
      setTimeout(onComplete, 2000); 
    }, 9000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const panels = [0, 1, 2, 3, 4]; // 5 sections

  return (
    <div className={`fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center ${phase === 'complete' ? 'pointer-events-none' : ''}`}>
      {/* Background Panels (Curtain) */}
      <div className="absolute inset-0 flex pointer-events-none">
        {panels.map((i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={phase === 'complete' ? { y: '-100%' } : { y: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.19, 1, 0.22, 1], // Better ease for curtain
              delay: i * 0.1,
            }}
            className="h-[105vh] flex-1 bg-black border-x border-white/5"
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {(phase === 'loading' || phase === 'reveal') && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center"
          >
            {phase === 'loading' ? (
              <motion.div
                key="loading-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.8, ease: "linear" }}
                    className="h-full bg-white"
                  />
                </div>
                <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase">Initializing Experience</p>
              </motion.div>
            ) : (
              <motion.div
                key="reveal-content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center px-6 max-w-2xl"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                  className="relative w-48 h-48 mb-8 rounded-full overflow-hidden border-4 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] p-1 bg-gradient-to-tr from-white/20 via-transparent to-white/10"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image 
                      src="/profile img.jpg" 
                      alt="Abhay Mallick" 
                      fill 
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                  className="text-white text-5xl md:text-7xl font-extralight tracking-tight mb-4"
                >
                  Hello, I am <span className="font-semibold italic text-zinc-200">Abhay Mallick</span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="text-zinc-500 text-xl md:text-2xl font-light tracking-widest italic"
                >
                  & Welcome to my creative universe
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingScreen;
