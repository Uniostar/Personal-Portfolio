import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import StatsCards from '../components/home/StatsCards';
import EducationSection from '../components/home/EducationSection';
import ExperienceSection from '../components/home/ExperienceSection';

export default function Home() {
  useEffect(() => {
    const section = sessionStorage.getItem('scrollTo');
    if (section) {
      sessionStorage.removeItem('scrollTo');
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  return (
    <>
      <Hero />
      <StatsCards />
      <EducationSection />
      <ExperienceSection />
    </>
  );
}
