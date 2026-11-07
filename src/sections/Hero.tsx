import { motion } from 'framer-motion';
import { ArrowDown, Download, FolderGit2, Mail, MapPin, Sparkles } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import NeonButton from '@/components/ui/NeonButton';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Soft glow accents */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-neon-blue/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-neon-purple/10 blur-[120px]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        {/* Status pill */}
        <motion.div
          variants={item}
          className="mb-6 flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-neon-cyan">
            {PROFILE.status}
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={item}
          className="mb-2 font-mono text-sm uppercase tracking-[0.3em] text-text-secondary"
        >
          Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-text-primary md:text-7xl lg:text-8xl"
        >
          HARSH <span className="gradient-text neon-text">YADAV.</span>
        </motion.h1>

        {/* Title */}
        <motion.h2
          variants={item}
          className="mt-4 text-xl font-semibold tracking-tight text-neon-cyan md:text-2xl"
        >
          {PROFILE.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-text-secondary md:text-lg"
        >
          A Computer Science and Business Systems graduate passionate about networking, IT
          infrastructure, technical troubleshooting and technology.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <NeonButton
            variant="primary"
            size="lg"
            icon={<FolderGit2 className="h-4 w-4" />}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore My Work
          </NeonButton>
          <NeonButton
            variant="secondary"
            size="lg"
            href={PROFILE.resumeUrl}
            download
            icon={<Download className="h-4 w-4" />}
          >
            Download Resume
          </NeonButton>
          <NeonButton
            variant="ghost"
            size="lg"
            icon={<Mail className="h-4 w-4" />}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </NeonButton>
        </motion.div>

        {/* Meta info */}
        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary"
        >
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-neon-blue" />
            {PROFILE.location}
          </span>
          <span className="hidden h-4 w-px bg-white/10 sm:block" />
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-neon-purple" />
            Fresher · Entry-Level Candidate
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-text-secondary transition-colors hover:text-neon-cyan"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
