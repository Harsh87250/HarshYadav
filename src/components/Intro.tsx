import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { ArrowRight, Zap, SkipForward } from 'lucide-react';

interface IntroProps {
  onEnter: () => void;
}

const FULL_NAME = 'HARSH KUMAR YADAV';
const TITLES = [
  'Aspiring IT & Network Engineer',
  'Network · IT Support · NOC',
  'Open to Entry-Level Opportunities',
];

export default function Intro({ onEnter }: IntroProps) {
  const [stage, setStage] = useState(0);
  const [nameRevealed, setNameRevealed] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState('');
  const [showEnter, setShowEnter] = useState(false);
  const [bursting, setBursting] = useState(false);

  const finish = useCallback(() => {
    setStage(99);
    setNameRevealed(FULL_NAME.length);
    setTypedTitle(TITLES[TITLES.length - 1]);
    setShowEnter(true);
  }, []);

  // Stage progression: 0 dark -> 1 streak -> 2 HY 3D -> 3 scan -> 4 name -> 5 titles -> 6 enter
  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setStage(1), 300));   // streak
    timers.push(window.setTimeout(() => setStage(2), 1100));  // HY 3D reveal
    timers.push(window.setTimeout(() => setStage(3), 2200));  // scan line
    timers.push(window.setTimeout(() => setStage(4), 3000));  // name reveal start
    return () => timers.forEach(clearTimeout);
  }, []);

  // Reveal name letters progressively
  useEffect(() => {
    if (stage < 4) return;
    if (nameRevealed >= FULL_NAME.length) {
      const t = window.setTimeout(() => setStage(5), 500);
      return () => clearTimeout(t);
    }
    const t = window.setTimeout(() => setNameRevealed((n) => n + 1), 55);
    return () => clearTimeout(t);
  }, [stage, nameRevealed]);

  // Fast typing titles
  useEffect(() => {
    if (stage < 5) return;
    const current = TITLES[titleIndex];
    if (typedTitle.length < current.length) {
      const t = window.setTimeout(() => {
        setTypedTitle(current.slice(0, typedTitle.length + 1));
      }, 28);
      return () => clearTimeout(t);
    }
    // Pause then move to next title or show enter
    const t = window.setTimeout(() => {
      if (titleIndex < TITLES.length - 1) {
        setTitleIndex((i) => i + 1);
        setTypedTitle('');
      } else {
        setShowEnter(true);
        setStage(6);
      }
    }, 600);
    return () => clearTimeout(t);
  }, [stage, typedTitle, titleIndex]);

  const handleEnter = () => {
    setBursting(true);
    window.setTimeout(onEnter, 600);
  };

  const skip = () => {
    finish();
  };

  const visibleName = FULL_NAME.slice(0, nameRevealed);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-bg-primary"
        exit={{ opacity: 0, scale: 1.08, filter: 'blur(16px)' }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] as const }}
      >
        {/* Background grid + radial glow */}
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-neon-radial opacity-40" />

        {/* Fast-moving neon light streak (stage 1) */}
        <AnimatePresence>
          {stage >= 1 && stage < 3 && (
            <motion.div
              className="pointer-events-none absolute top-1/2 h-[2px] w-[40%] -translate-y-1/2"
              initial={{ left: '-25%', opacity: 0 }}
              animate={{ left: '120%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, ease: 'easeInOut', times: [0, 0.15, 0.85, 1] }}
              exit={{ opacity: 0 }}
              style={{
                background:
                  'linear-gradient(90deg, transparent, #6CE6FF 40%, #4CA8FF 60%, transparent)',
                boxShadow: '0 0 20px #4CA8FF, 0 0 40px #6CE6FF, 0 0 60px rgba(76,168,255,0.4)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Digital scan line (stage 3) */}
        <AnimatePresence>
          {stage >= 3 && stage < 4 && (
            <motion.div
              className="pointer-events-none absolute left-0 top-0 h-[3px] w-full scan-line"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(108,230,255,0.8) 50%, transparent)',
                boxShadow: '0 0 30px rgba(108,230,255,0.8), 0 0 60px rgba(76,168,255,0.4)',
              }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={skip}
          className="absolute right-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-secondary transition-all hover:border-neon-cyan/40 hover:text-neon-cyan"
        >
          <SkipForward className="h-3 w-3" /> Skip Intro
        </motion.button>

        {/* Energy core with 3D HY */}
        <div
          className="relative flex h-[280px] w-[280px] items-center justify-center"
          style={{ perspective: '1000px' }}
        >
          {/* Expanding light burst */}
          <motion.div
            className="absolute rounded-full"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={
              stage >= 2
                ? { width: 240, height: 240, opacity: [0, 1, 0.6] }
                : { width: 0, height: 0, opacity: 0 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              background:
                'radial-gradient(circle, rgba(108,230,255,0.4) 0%, rgba(76,168,255,0.15) 40%, transparent 70%)',
            }}
          />

          {/* Rotating rings */}
          {stage >= 2 && (
            <>
              <motion.div
                className="absolute h-[200px] w-[200px] rounded-full border border-neon-blue/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ boxShadow: '0 0 30px rgba(76,168,255,0.2) inset' }}
              />
              <motion.div
                className="absolute h-[150px] w-[150px] rounded-full border border-neon-cyan/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute h-[100px] w-[100px] rounded-full border border-neon-purple/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}

          {/* HY letters with 3D rotation */}
          <motion.div
            className="preserve-3d"
            initial={{ opacity: 0, rotateY: -180, scale: 0.5, filter: 'blur(10px)' }}
            animate={
              stage >= 2
                ? { opacity: 1, rotateY: 0, scale: 1, filter: 'blur(0px)' }
                : { opacity: 0, rotateY: -180, scale: 0.5, filter: 'blur(10px)' }
            }
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span
              className="font-display text-6xl font-extrabold tracking-tight text-white md:text-7xl"
              style={{
                textShadow:
                  '0 0 30px rgba(76,168,255,0.9), 0 0 60px rgba(108,230,255,0.5), 0 0 80px rgba(139,123,255,0.3)',
              }}
            >
              HY
            </span>
          </motion.div>
        </div>

        {/* Name with progressive reveal */}
        <div className="relative z-10 mt-4 flex flex-col items-center gap-3 px-6 text-center">
          {stage >= 4 && (
            <h1 className="font-display text-xl font-bold tracking-[0.1em] text-text-primary md:text-3xl">
              {visibleName.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.3 }}
                  className={ch === ' ' ? 'inline-block w-2' : 'inline-block'}
                  style={{ textShadow: '0 0 15px rgba(76,168,255,0.5)' }}
                >
                  {ch}
                </motion.span>
              ))}
              {nameRevealed < FULL_NAME.length && (
                <span className="typing-caret inline-block" />
              )}
            </h1>
          )}

          {/* Fast typing titles */}
          {stage >= 5 && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#6CE6FF]">{'>'}</span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan md:text-sm">
                {typedTitle}
                {typedTitle.length < TITLES[titleIndex].length && (
                  <span className="typing-caret inline-block" />
                )}
              </p>
            </div>
          )}
        </div>

        {/* Light burst on enter */}
        <AnimatePresence>
          {bursting && (
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 40, opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                background:
                  'radial-gradient(circle, rgba(108,230,255,0.9) 0%, rgba(76,168,255,0.5) 30%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Enter button */}
        <AnimatePresence>
          {showEnter && !bursting && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={handleEnter}
              className="group relative mt-10 flex items-center gap-3 overflow-hidden rounded-full border border-neon-blue/50 bg-neon-blue/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:border-neon-cyan hover:shadow-neon-blue"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Zap className="h-4 w-4 text-neon-cyan" />
              Enter Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <motion.span
                className="absolute -inset-px rounded-full border border-neon-cyan/30"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
