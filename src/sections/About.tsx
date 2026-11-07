import { motion } from 'framer-motion';
import { GraduationCap, Cpu, Network, Target, MapPin, BookOpen, Download } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { Reveal, fadeInUp, staggerFast } from '@/lib/motion';

const interests = [
  { icon: Network, label: 'Networking', desc: 'TCP/IP, routing, switching and infrastructure fundamentals.' },
  { icon: Cpu, label: 'IT Infrastructure', desc: 'System configuration, support and maintenance.' },
  { icon: Target, label: 'Technical Troubleshooting', desc: 'Diagnosing and resolving connectivity and hardware issues.' },
];

const learningGoals = [
  'Hands-on practice with network configuration and diagnostics',
  'Strengthening Python and scripting for automation tasks',
  'Building real-world IT support and troubleshooting experience',
  'Exploring NOC operations and IT operations workflows',
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About Me"
          title="Curious Mind."
          highlight="Practical Mindset."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* Profile card */}
          <Reveal className="lg:col-span-2" variants={fadeInUp}>
            <GlassCard glow className="h-full p-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neon-blue/30 bg-neon-blue/10 font-display text-2xl font-extrabold text-white shadow-neon-blue">
                    HY
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">{PROFILE.name}</h3>
                    <p className="text-sm text-neon-cyan">{PROFILE.title}</p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-6">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="mt-0.5 h-5 w-5 text-neon-blue" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-muted">Education</p>
                      <p className="text-sm text-text-primary">{PROFILE.degree}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="mt-0.5 h-5 w-5 text-neon-cyan" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-muted">College</p>
                      <p className="text-sm text-text-primary">{PROFILE.college}</p>
                      <p className="text-xs text-text-secondary">{PROFILE.collegeLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-neon-purple" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-muted">Location</p>
                      <p className="text-sm text-text-primary">{PROFILE.location}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-3">
                  <p className="text-sm font-medium text-neon-cyan">{PROFILE.status}</p>
                </div>

                <a
                  href={PROFILE.resumeUrl}
                  download
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-neon-blue/40 bg-neon-blue/10 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-neon-blue/20 hover:shadow-neon-blue"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Download className="h-4 w-4 text-neon-cyan" />
                  Download Resume
                </a>
              </div>
            </GlassCard>
          </Reveal>

          {/* Bio + interests */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Reveal variants={fadeInUp}>
              <GlassCard className="p-8">
                <div className="space-y-4 text-text-secondary">
                  <p className="text-base leading-relaxed">
                    I am a B.Tech graduate in Computer Science and Business Systems from{' '}
                    <span className="text-text-primary">Oriental Institute of Science and
                    Technology, Bhopal</span>
                    .
                  </p>
                  <p className="text-base leading-relaxed">
                    I am interested in networking, IT infrastructure, technical support and
                    troubleshooting.
                  </p>
                  <p className="text-base leading-relaxed">
                    As a fresher, I am continuously improving my technical knowledge through
                    structured learning, hands-on practice and personal projects.
                  </p>
                  <p className="text-base leading-relaxed">
                    I am looking for an opportunity where I can apply my knowledge, learn from
                    experienced professionals and grow as an IT professional.
                  </p>
                </div>
              </GlassCard>
            </Reveal>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid gap-4 sm:grid-cols-3"
            >
              {interests.map((it) => (
                <motion.div key={it.label} variants={fadeInUp}>
                  <GlassCard glow className="h-full p-5">
                    <it.icon className="mb-3 h-6 w-6 text-neon-blue" />
                    <h4 className="text-sm font-semibold text-text-primary">{it.label}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-text-secondary">{it.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Learning goals */}
        <Reveal className="mt-8" variants={fadeInUp}>
          <GlassCard className="p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex items-center gap-3 md:w-1/3">
                <Target className="h-6 w-6 text-neon-cyan" />
                <h3 className="text-lg font-semibold text-text-primary">Current Learning Goals</h3>
              </div>
              <ul className="grid gap-3 md:w-2/3 md:grid-cols-2">
                {learningGoals.map((g) => (
                  <li key={g} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
