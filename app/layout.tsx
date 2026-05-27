import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const siteUrl = 'https://abhay-mallick.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Abhay Mallick | Full Stack Developer & Freelancer',
    template: '%s | Abhay Mallick',
  },

  description:
    'Abhay Mallick — Full Stack Developer, Freelancer & Project Developer from India. Builds high-performance web apps, mobile apps, CRMs, and AI solutions with Next.js, React, Node.js & MongoDB. Available for freelance projects.',

  keywords: [
    'Abhay Mallick',
    'abhay mallick developer',
    'abhay mallick freelancer',
    'abhay mallick full stack developer',
    'abhay mallick portfolio',
    'abhay mallick project developer',
    'abhay mallick india',
    'full stack developer india',
    'freelance developer india',
    'next.js developer',
    'react developer',
    'node.js developer',
    'web developer maharashtra',
    'mobile app developer',
    'software engineer india',
    'hire freelance developer',
  ],

  authors: [{ name: 'Abhay Mallick', url: siteUrl }],
  creator: 'Abhay Mallick',
  publisher: 'Abhay Mallick',

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Abhay Mallick Portfolio',
    title: 'Abhay Mallick | Full Stack Developer & Freelancer',
    description:
      'Full Stack Developer & Freelancer specialising in Next.js, React, Node.js, and Mobile Apps. 50+ projects completed. Available for freelance work.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Abhay Mallick — Full Stack Developer & Freelancer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Abhay Mallick | Full Stack Developer & Freelancer',
    description:
      'Full Stack Developer & Freelancer — Next.js, React, Node.js, Mobile Apps. 50+ projects. Hire me for your next project.',
    images: ['/og-image.jpg'],
    creator: '@abhaymallick',
  },

  verification: {
    google: 'EyA8e9tGGxU34-rICF_oQ3Hyw7FFog5K395fgBp_rDo',
  },

  category: 'technology',
};

// JSON-LD Structured Data — Person + WebSite schemas
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Abhay Mallick',
      url: siteUrl,
      email: 'abhaymallick.dev@gmail.com',
      telephone: '+918421822204',
      image: {
        '@type': 'ImageObject',
        url: `${siteUrl}/profile img.jpg`,
        contentUrl: `${siteUrl}/profile img.jpg`,
        caption: 'Abhay Mallick — Full Stack Developer',
      },
      sameAs: [
        'https://github.com/Abhay2204',
        'https://www.linkedin.com/in/abhaymallick2002',
        'https://www.instagram.com/abhay_as_u_like_it/',
      ],
      jobTitle: 'Full Stack Developer',
      description:
        'Abhay Mallick is a Full Stack Developer and Freelancer from Chandrapur, Maharashtra, India. He specialises in Next.js, React, Node.js, MongoDB, and mobile app development with Kotlin & Jetpack Compose.',
      knowsAbout: [
        'Full Stack Development',
        'Next.js',
        'React',
        'Node.js',
        'MongoDB',
        'TypeScript',
        'Kotlin',
        'Jetpack Compose',
        'UI/UX Design',
        'AI Integration',
        'REST APIs',
        'System Design',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chandrapur',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Computer Science Engineering',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Abhay Mallick Portfolio',
      description:
        'Portfolio of Abhay Mallick — Full Stack Developer, Freelancer & Project Developer',
      author: { '@id': `${siteUrl}/#person` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: 'Abhay Mallick — Freelance Development Services',
      description:
        'Freelance web development, mobile app development, UI/UX design, CRM systems, e-commerce, and AI integrations.',
      provider: { '@id': `${siteUrl}/#person` },
      url: siteUrl,
      areaServed: 'Worldwide',
      serviceType: [
        'Full Stack Web Development',
        'Mobile App Development',
        'UI/UX Design',
        'CRM Development',
        'E-commerce Development',
        'AI Integration',
        'API Development',
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {/* Favicons & PWA */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a2332" />

        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className="font-sans antialiased bg-white text-graphite selection:bg-stormy-teal selection:text-white"
        suppressHydrationWarning
      >
        <div className="hidden md:block">
          <Navigation />
        </div>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
