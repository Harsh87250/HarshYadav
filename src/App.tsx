import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from '@/components/Intro';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import CursorGlow from '@/components/CursorGlow';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Education from '@/sections/Education';
import CareerObjective from '@/sections/CareerObjective';
import Resume from '@/sections/Resume';
import Contact from '@/sections/Contact';

const INTRO_KEY = 'hy-portfolio-intro-seen';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY) === '1';
    setShowIntro(!seen);
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem(INTRO_KEY, '1');
    setShowIntro(false);
  };

  if (showIntro === null) return null;

  return (
    <>
      <ParticleBackground />
      <CursorGlow />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <Intro key="intro" onEnter={handleEnter} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Education />
              <CareerObjective />
              <Resume />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
