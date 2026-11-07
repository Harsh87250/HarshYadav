import { motion } from 'framer-motion';
import { Reveal } from '@/lib/motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <Reveal className={`flex flex-col ${alignClass} gap-4`}>
      <motion.div className="flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-neon-blue" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-neon-blue" />
      </motion.div>
      <h2 className="max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
        {title} {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
