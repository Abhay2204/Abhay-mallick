import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Abhay Mallick | Interaction Designer',
  description: 'A high-performance, bespoke portfolio using Next.js, Framer Motion, and GSAP following the International Typographic Style.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-graphite selection:bg-stormy-teal selection:text-white" suppressHydrationWarning>
        <div className="hidden md:block">
          <Navigation />
        </div>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
