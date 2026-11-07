import { motion } from 'framer-motion';
import {
  TrendingUp, Network, Globe, Github, ExternalLink, ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { PROJECTS, type Project } from '@/data/portfolio';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { staggerFast, fadeInUp } from '@/lib/motion';

const iconMap: Record<string, LucideIcon> = { TrendingUp, Network, Globe };

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've"
          highlight="Built & Practised"
          subtitle="Personal projects and learning labs that show how I'm applying what I study."
        />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = iconMap[project.icon] ?? Globe;
  const viewUrl = project.github ?? '#';

  return (
    <motion.div variants={fadeInUp} className="h-full">
      <GlassCard glow tilt className="group flex h-full flex-col overflow-hidden p-0" data-cursor-hover>
        {/* Header banner */}
        <div className="relative flex h-32 items-center justify-center overflow-hidden border-b border-white/5">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <motion.div
            whileHover={{ scale: 1.15, rotate: 6 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]"
          >
            <Icon className="h-7 w-7 text-neon-cyan" />
          </motion.div>
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-bg-primary/60 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-text-secondary backdrop-blur">
            {project.tag}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-base font-semibold leading-snug text-text-primary">
            {project.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-[10px] font-medium text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-text-secondary transition-colors hover:text-neon-cyan"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            ) : (
              <span className="flex items-center gap-2 text-xs text-text-muted">
                <Github className="h-4 w-4" /> No repo
              </span>
            )}
            <span className="h-3 w-px bg-white/10" />
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link ml-auto flex items-center gap-1.5 text-xs font-medium text-neon-blue transition-colors hover:text-neon-cyan"
            >
              View Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
