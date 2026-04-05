'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticRadius?: number;
}

export default function MagneticButton({
  children,
  className = '',
  magneticRadius = 50,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(button, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Calculate distance from center
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < magneticRadius) {
        // Pull towards cursor
        xTo(distanceX * 0.4);
        yTo(distanceY * 0.4);
      } else {
        // Reset
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magneticRadius]);

  return (
    <button
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center px-8 py-4 font-bold tracking-tight uppercase transition-colors duration-300 bg-graphite text-white hover:bg-stormy-teal ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
