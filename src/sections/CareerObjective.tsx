import { motion } from 'framer-motion';
import { Network, Server, Activity, Headphones, Wrench, ClipboardList, type LucideIcon } from 'lucide-react';
import { CAREER_INTERESTS } from '@/data/portfolio';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { staggerFast, fadeInUp } from '@/lib/motion';

const iconByInterest: Record<string, LucideIcon> = {
  'Network Engineering': Network,
  'IT Infrastructure': Server,
  'NOC Operations': Activity,
  'IT Support': Headphones,
  'Technical Troubleshooting': Wrench,
  'IT Project Coordination': ClipboardList,
};

export default function CareerObjective() {
  return (
    <section id="career" className="section-padding relative">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Career Objective"
          title="Where I Want"
          highlight="to Grow"
        />

        <RevealBlock />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CAREER_INTERESTS.map((interest) => {
            const Icon = iconByInterest[interest] ?? Network;
            return (
              <motion.div key={interest} variants={fadeInUp}>
                <GlassCard glow className="group flex h-full items-center gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neon-blue/30 bg-neon-blue/10 transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{interest}</span>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function RevealBlock() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mx-auto mt-12 max-w-3xl"
    >
      <GlassCard glow className="p-8 text-center md:p-10">
        <p className="text-balance text-lg leading-relaxed text-text-secondary md:text-xl">
          "I am seeking an entry-level opportunity where I can strengthen my technical foundation,
          contribute to IT operations and develop practical experience with real-world technology
          environments."
        </p>
      </GlassCard>
    </motion.div>
  );
}
