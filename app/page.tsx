import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import SkillsSection from '@/components/SkillsSection';
import TimelineSection from '@/components/TimelineSection';
import ProjectsSection from '@/components/ProjectsSection';
import UiUxGallery from '@/components/UiUxGallery';
import Footer from '@/components/Footer';

export default function Home() {
  return (
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
  );
}
