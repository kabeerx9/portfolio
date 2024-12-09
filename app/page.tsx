'use client';

import { useEffect } from 'react';
import About from '@/components/sections/About';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import Experience from '@/components/sections/Experience';
import GitHubStats from '@/components/sections/GitHubStats';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import TerminalSection from '@/components/sections/TerminalSection';
import Footer from '@/components/ui/Footer';

export default function Home() {
  useEffect(() => {
    // Force scroll to top on initial load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <TerminalSection />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <GitHubStats />
      <Contact />
      <Footer />
    </main>
  );
}
