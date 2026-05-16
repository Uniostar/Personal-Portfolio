import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';
import AnimatedSection from '../ui/AnimatedSection';

const LINKS = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'akvkmg2007@gmail.com',
    href:  'mailto:akvkmg2007@gmail.com',
    color: 'neon-cyan',
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    value: 'aryan-kumar-65abb0245',
    href:  'https://www.linkedin.com/in/aryan-kumar-65abb0245/',
    color: 'neon-purple',
  },
  {
    Icon: Github,
    label: 'GitHub',
    value: 'Uniostar',
    href:  'https://github.com/Uniostar',
    color: 'neon-green',
  },
];

/* Controlled input / textarea with neon focus ring */
function Field({ label, id, type = 'text', rows, value, onChange }) {
  const Tag = rows ? 'textarea' : 'input';
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-mono text-slate-400 tracking-wide">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        type={type}
        rows={rows}
        value={value}
        onChange={onChange}
        required
        className={[
          'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400',
          'outline-none focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30 transition-all duration-200',
          rows ? 'resize-y min-h-[120px]' : '',
        ].join(' ')}
      />
    </div>
  );
}

export default function ContactSection() {
  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sent | error

  const onChange = e => setForm(f => ({ ...f, [e.target.id]: e.target.value }));

  /* Opens a pre-filled mailto: — no backend needed for GitHub Pages */
  const handleSubmit = e => {
    e.preventDefault();
    try {
      const mailto = `mailto:akvkmg2007@gmail.com?subject=${encodeURIComponent(
        form.subject || 'Portfolio Contact'
      )}&body=${encodeURIComponent(
        `Hi Aryan,\n\n${form.message}\n\n— ${form.name} (${form.email})`
      )}`;
      window.location.href = mailto;
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      {/* Heading */}
      <AnimatedSection className="text-center mb-14">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-neon-cyan mb-3">
          Get In Touch
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">
          Let's Build Something
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Open to internship opportunities, project collabs, technical writing gigs, or just a
          good conversation about rocket engines and embedded systems.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ── Contact links sidebar ─────────────────────────────── */}
        <AnimatedSection delay={0.1} className="lg:col-span-2 flex flex-col gap-4">
          {LINKS.map(({ Icon, label, value, href, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className={`glass rounded-xl p-4 flex items-center gap-4 border border-white/08 hover-glow-cyan group transition-all duration-300`}
            >
              <div className={`p-2.5 rounded-lg bg-${color}/10 border border-${color}/20 group-hover:shadow-neon-${color} transition-shadow`}>
                <Icon size={18} className={`text-${color}`} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-mono">{label}</p>
                <p className={`text-sm font-semibold text-${color} group-hover:underline`}>{value}</p>
              </div>
            </a>
          ))}

          {/* Availability note */}
          <GlassCard hover={false} className="p-4 mt-2 border border-neon-green/20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-neon-green text-xs font-mono">Available</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Actively seeking internships in embedded systems, hardware engineering, or PCB design.
            </p>
          </GlassCard>
        </AnimatedSection>

        {/* ── Contact form ──────────────────────────────────────── */}
        <AnimatedSection delay={0.2} className="lg:col-span-3">
          <GlassCard hover={false} className="p-6 border border-white/08">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name"  id="name"  value={form.name}  onChange={onChange} />
                <Field label="Email" id="email" type="email" value={form.email} onChange={onChange} />
              </div>
              <Field label="Subject" id="subject" value={form.subject} onChange={onChange} />
              <Field label="Message" id="message" rows={5} value={form.message} onChange={onChange} />

              {/* Status feedback */}
              {status === 'sent' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-neon-green text-sm p-3 rounded-lg bg-neon-green/08 border border-neon-green/25"
                >
                  <CheckCircle size={16} /> Your email client should open. If not, email me directly.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-neon-pink text-sm p-3 rounded-lg bg-neon-pink/08 border border-neon-pink/25"
                >
                  <AlertCircle size={16} /> Something went wrong. Email me at akvkmg2007@gmail.com.
                </motion.div>
              )}

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-neon-cyan/75 bg-transparent border border-neon-cyan/30 hover:text-neon-cyan hover:border-neon-cyan/50 hover:shadow-neon-cyan transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/50"
              >
                <Send size={15} />
                Send Message
              </button>

            </form>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
