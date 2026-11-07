import { Mail, Linkedin, Github, Phone, ArrowUp, Heart } from 'lucide-react';
import { PROFILE, NAV_LINKS } from '@/data/portfolio';

export default function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/5 px-6 py-12 md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-neon-radial opacity-30" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => scrollTo('home')}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-neon-blue/30 bg-neon-blue/10 font-display text-base font-extrabold text-white transition-all hover:shadow-neon-blue"
          >
            HY
          </button>
          <p className="max-w-md text-center text-sm text-text-secondary">
            Aspiring IT & Network Engineer — open to entry-level opportunities across Delhi NCR.
          </p>
        </div>

        {/* Quick links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-neon-cyan"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {[
            { icon: Mail, href: `mailto:${PROFILE.email}`, label: 'Email' },
            { icon: Phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}`, label: 'Phone' },
            { icon: Linkedin, href: PROFILE.linkedin, label: 'LinkedIn' },
            { icon: Github, href: PROFILE.github, label: 'GitHub' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.label === 'LinkedIn' || s.label === 'GitHub' ? '_blank' : undefined}
              rel={s.label === 'LinkedIn' || s.label === 'GitHub' ? 'noopener noreferrer' : undefined}
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-text-secondary transition-all duration-300 hover:border-neon-cyan/40 hover:text-neon-cyan hover:shadow-neon-cyan hover:rotate-12"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-text-muted sm:flex-row">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Harsh Yadav. Built with
            <Heart className="h-3 w-3 fill-neon-purple/60 text-neon-purple" /> and React.
          </p>
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-1.5 text-text-muted transition-colors hover:text-neon-cyan"
          >
            Back to top <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
