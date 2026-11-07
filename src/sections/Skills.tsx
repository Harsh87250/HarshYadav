import { motion } from 'framer-motion';
import {
  Network, Wrench, Code, Database, BarChart3, Cpu,
  type LucideIcon,
} from 'lucide-react';
import { SKILL_GROUPS } from '@/data/portfolio';
import { glowMap, levelColor } from '@/lib/glow';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { staggerFast, fadeInUp } from '@/lib/motion';

const iconMap: Record<string, LucideIcon> = {
  Network,
  Wrench,
  Code,
  Database,
  BarChart3,
  Cpu,
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Technical Skills"
          title="Tools & Technologies"
          highlight="I'm Building With"
          subtitle="An honest view of where I am today — labeled by learning stage, not invented proficiency scores."
        />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILL_GROUPS.map((group) => {
            const Icon = iconMap[group.icon] ?? Code;
            return (
              <motion.div key={group.category} variants={fadeInUp}>
                <GlassCard glow tilt lift className="group h-full p-6" data-cursor-hover>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neon-blue/30 bg-neon-blue/10">
                      <Icon className="h-5 w-5 text-neon-cyan" />
                    </div>
                    <h3 className="text-base font-semibold text-text-primary">{group.category}</h3>
                  </div>

                  <ul className="space-y-2.5">
                    {group.skills.map((skill) => {
                      const glow = glowMap[levelColor[skill.level]];
                      return (
                        <li
                          key={skill.name}
                          className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 transition-colors hover:border-white/10"
                        >
                          <span className="text-sm text-text-secondary">{skill.name}</span>
                          <span
                            className={`shrink-0 rounded-full border ${glow.border} ${glow.bg} px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${glow.text}`}
                          >
                            {skill.level}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Legend */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-text-secondary"
        >
          {(['Foundational', 'Learning', 'Working Knowledge'] as const).map((lvl) => {
            const glow = glowMap[levelColor[lvl]];
            return (
              <span key={lvl} className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${glow.bg} ${glow.text}`}>•</span>
                {lvl}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
