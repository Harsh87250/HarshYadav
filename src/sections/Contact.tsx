import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, AlertCircle, Info } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { Reveal, fadeInUp } from '@/lib/motion';

type Status = 'idle' | 'success';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const empty: FormState = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    const subject = encodeURIComponent(form.subject || `Portfolio message from ${form.name}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setStatus('success');
    setForm(empty);
  };

  const field =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-neon-cyan/50 focus:bg-white/[0.05]';

  const contacts = [
    { icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Phone, label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'harshkumaryadav', href: PROFILE.linkedin },
    { icon: Github, label: 'GitHub', value: 'Harsh87250', href: PROFILE.github },
  ];

  return (
    <section id="contact" className="section-padding relative">
      {/* Glow background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-blue/5 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something"
          highlight="Useful."
          subtitle="I am open to entry-level opportunities in networking, IT support, NOC operations and IT project support across Delhi NCR."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Contact details */}
          <Reveal variants={fadeInUp}>
            <GlassCard glow className="h-full p-8">
              <h3 className="text-lg font-semibold text-text-primary">Get in touch</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Reach out directly through any of the channels below — I usually respond within a
                day or two.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {contacts.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.icon === Linkedin || c.icon === Github ? '_blank' : undefined}
                    rel={c.icon === Linkedin || c.icon === Github ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-neon-blue/30 hover:bg-white/[0.04]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neon-blue/20 bg-neon-blue/10">
                      <c.icon className="h-4 w-4 text-neon-cyan" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-text-muted">{c.label}</p>
                      <p className="truncate text-sm text-text-primary group-hover:text-neon-cyan">
                        {c.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 flex items-start gap-2 rounded-xl border border-neon-cyan/15 bg-neon-cyan/5 p-4 text-xs leading-relaxed text-text-secondary">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan" />
                <span>
                  The contact form opens your email client addressed to Harsh. It is not connected
                  to an automated email service yet — messages are not stored on a server.
                </span>
              </div>
            </GlassCard>
          </Reveal>

          {/* Contact form */}
          <Reveal variants={fadeInUp} delay={0.1}>
            <GlassCard glow className="h-full p-8">
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs uppercase tracking-wider text-text-muted">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs uppercase tracking-wider text-text-muted">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      className={field}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-text-muted">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="What is this about?"
                    className={field}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-text-muted">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message..."
                    className={`${field} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-transparent bg-gradient-to-r from-neon-blue/90 to-neon-cyan/80 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-neon-blue hover:to-neon-cyan hover:shadow-neon-blue"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Send className="h-4 w-4" />
                  Send Message
                </motion.button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-3 text-sm text-neon-cyan"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Your email client should have opened with the message ready to send.
                  </motion.div>
                )}
              </form>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
