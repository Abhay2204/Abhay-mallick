import React from 'react';

interface SwissGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function SwissGrid({ children, className = '' }: SwissGridProps) {
  return (
    <div className={`grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
