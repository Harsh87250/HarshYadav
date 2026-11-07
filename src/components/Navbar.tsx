import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Glowing scroll progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg, #4CA8FF, #6CE6FF, #8B7BFF)',
          boxShadow: '0 0 8px rgba(108,230,255,0.6), 0 0 16px rgba(76,168,255,0.4)',
        }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-bg-primary/70 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          {/* Logo */}
          <button
            onClick={() => handleClick('home')}
            className="group relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] font-display text-sm font-extrabold tracking-tight text-white transition-all hover:border-neon-blue/50 hover:shadow-neon-blue"
            data-cursor-hover
          >
            HY
            <span className="absolute inset-0 rounded-lg bg-neon-blue/0 transition-colors group-hover:bg-neon-blue/5" />
          </button>

          {/* Desktop links with animated underline */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleClick(link.id)}
                  data-cursor-hover
                  className={`group relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active === link.id
                      ? 'text-neon-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan transition-all duration-300 ${
                      active === link.id
                        ? 'w-2/3 opacity-100'
                        : 'w-0 opacity-0 group-hover:w-2/3 group-hover:opacity-60'
                    }`}
                    style={{ boxShadow: '0 0 6px rgba(108,230,255,0.6)' }}
                  />
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg border border-neon-blue/30 bg-neon-blue/10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-text-primary md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/10 bg-bg-secondary/95 backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col gap-1 px-6 py-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => handleClick(link.id)}
                      className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                        active === link.id
                          ? 'bg-neon-blue/10 text-neon-cyan'
                          : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
