'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';
import SwissGrid from './SwissGrid';

export default function Footer() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      }) + ' IST');
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-graphite text-white relative overflow-hidden pt-32 pb-8">
      <SwissGrid>
        {/* Top Section: Let's Collaborate */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/20 pb-16 gap-12">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-sm uppercase tracking-widest text-stormy-teal">
              [ 04 ] Contact
            </p>
            <h2 className="text-[12vw] md:text-[8vw] font-black tracking-tighter uppercase leading-[0.85] group cursor-pointer">
              <span className="block overflow-hidden">
                <motion.span 
                  className="block"
                  whileHover={{ y: -10, color: '#4A90E2' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  LET'S
                </motion.span>
              </span>
              <span className="block overflow-hidden text-stormy-teal">
                <motion.span 
                  className="block"
                  whileHover={{ y: -10, color: '#ffffff' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  COLLABORATE
                </motion.span>
              </span>
            </h2>
          </div>
          
          <div className="shrink-0">
            <MagneticButton className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white text-black flex items-center justify-center text-lg md:text-2xl font-bold uppercase tracking-tighter hover:bg-stormy-teal hover:text-white transition-colors duration-500">
              Get In<br/>Touch
            </MagneticButton>
          </div>
        </div>

        {/* Middle Section: Links & Info */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/20">
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50">Socials</h4>
            <ul className="flex flex-col gap-2 text-lg font-medium">
              {[
                { name: 'GitHub', url: 'https://github.com/Abhay2204' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/abhaymallick2002' },
                { name: 'Instagram', url: 'https://www.instagram.com/abhay_as_u_like_it/' }
              ].map((social) => (
                <li key={social.name}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden group inline-block">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">{social.name}</span>
                    <span className="block absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-stormy-teal">{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50">Location</h4>
            <div className="text-lg font-medium">
              <p>Chandrapur, Maharashtra</p>
              <p>India</p>
              <p className="mt-4 font-mono text-sm text-stormy-teal">{time}</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50">Direct</h4>
            <div className="text-lg font-medium">
              <a href="mailto:abhaymallick.dev@gmail.com" className="hover:text-stormy-teal transition-colors duration-300">
                abhaymallick.dev@gmail.com
              </a>
              <p className="mt-2 text-white/70">+91 84218 22204</p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/40">
          <p>© {new Date().getFullYear()} Abhay Mallick Portfolio</p>
          <p>Designed & Developed with Precision</p>
          <p>All Rights Reserved</p>
        </div>
      </SwissGrid>
    </footer>
  );
}
