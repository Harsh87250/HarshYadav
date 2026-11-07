import { motion } from 'framer-motion';
import { Download, FileText, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { Reveal, fadeInUp } from '@/lib/motion';

export default function Resume() {
  const resumeAvailable = true;

  return (
    <section id="resume" className="section-padding relative">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Resume"
          title="A Closer Look at"
          highlight="My Profile"
          subtitle="Download a complete PDF summary of my background, skills and projects."
        />

        <Reveal variants={fadeInUp} className="mt-16">
          <GlassCard glow className="overflow-hidden p-0">
            <div className="grid gap-0 md:grid-cols-2">
              {/* Visual side */}
              <div className="relative flex items-center justify-center border-b border-white/5 p-10 md:border-b-0 md:border-r">
                <div className="pointer-events-none absolute inset-0 bg-neon-radial opacity-60" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative flex h-40 w-32 items-center justify-center rounded-xl border border-neon-blue/30 bg-white/[0.02] shadow-neon-blue"
                >
                  <FileText className="h-16 w-16 text-neon-cyan" />
                  <span className="absolute bottom-3 text-[10px] uppercase tracking-widest text-text-muted">
                    PDF
                  </span>
                </motion.div>
              </div>

              {/* Action side */}
              <div className="flex flex-col justify-center gap-5 p-10">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">My Resume</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    A consolidated document covering my education, technical skills, projects and
                    career interests — ready to share with recruiters and hiring managers.
                  </p>
                </div>

                {resumeAvailable ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-neon-cyan">
                      <CheckCircle2 className="h-4 w-4" />
                      Resume available for download
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <a
                        href={PROFILE.resumeUrl}
                        download
                        className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl border border-transparent bg-gradient-to-r from-neon-blue/90 to-neon-cyan/80 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-neon-blue hover:to-neon-cyan hover:shadow-neon-blue"
                      >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <Download className="h-4 w-4" />
                        Download My Resume
                      </a>
                      <a
                        href={PROFILE.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-neon-cyan/30 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-neon-cyan transition-all hover:bg-neon-cyan/10 hover:border-neon-cyan/60 hover:shadow-neon-cyan"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Resume
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-2 rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-3 text-sm text-yellow-200/80">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        The resume PDF hasn't been uploaded yet. The site owner can add
                        <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-xs">
                          Harsh-Kumar-Yadav-Resume.pdf
                        </code>
                        to the public folder to enable download.
                      </span>
                    </div>
                    <button
                      disabled
                      className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-text-muted"
                    >
                      <Download className="h-4 w-4" />
                      Download My Resume
                    </button>
                  </>
                )}
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
