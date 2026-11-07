import { motion } from 'framer-motion';
import { GraduationCap, MapPin, BookOpen, Calendar } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal, fadeInUp } from '@/lib/motion';

export default function Education() {
  return (
    <section id="education" className="section-padding relative">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Education"
          title="Academic"
          highlight="Foundation"
        />

        <div className="mt-16 flex justify-center">
          <Reveal variants={fadeInUp} className="w-full max-w-2xl">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-10"
            >
              {/* Glow accents */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-neon-blue/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-neon-purple/10 blur-3xl" />

              {/* Timeline marker */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-neon-blue via-neon-cyan to-neon-purple" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neon-blue/30 bg-neon-blue/10 shadow-neon-blue">
                  <GraduationCap className="h-6 w-6 text-neon-cyan" />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-neon-cyan">
                      <Calendar className="h-3 w-3" /> Bachelor of Technology
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-text-primary md:text-2xl">
                      B.Tech — Computer Science & Business Systems
                    </h3>
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <p className="flex items-start gap-2 text-sm text-text-primary">
                      <BookOpen className="mt-0.5 h-4 w-4 text-neon-blue" />
                      {PROFILE.college}
                    </p>
                    <p className="flex items-start gap-2 text-sm text-text-secondary">
                      <MapPin className="mt-0.5 h-4 w-4 text-neon-purple" />
                      {PROFILE.collegeLocation}
                    </p>
                  </div>

                  <p className="border-t border-white/5 pt-4 text-sm leading-relaxed text-text-secondary">
                    A four-year engineering programme blending computer science fundamentals with
                    business systems thinking — building the analytical and technical base for a
                    career in IT and networking.
                  </p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
