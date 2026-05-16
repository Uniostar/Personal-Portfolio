import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';
import NeonButton from '../ui/NeonButton';
import TryImg from '../ui/TryImg';

/* Rotating role titles shown under the name */
const ROLES = [
  'ECE Student @ UT Austin',
  'Embedded Systems Engineer',
  'PCB Designer',
  'Technical Writer',
  'Maker & Tinkerer',
];

/* The about-me paragraph — reproduced verbatim from brief */
const ABOUT = `Hi, I'm Aryan — part engineer, part storyteller, and part "let's see if this works" experimenter. I've spent the last few years building everything from Bluetooth gadgets to tiny ion engines (yes, they work… mostly), and explaining them in a way that doesn't require a PhD or three cups of coffee.

When I'm not writing technical guides for Hackster.io or Arduino, you'll probably find me tinkering with Java code, designing user interfaces, or running a club meeting that somehow turns into a brainstorm about rockets. I love mixing tech skills (UI/UX design, embedded systems, Java development) with people skills (leadership, outreach, making complex things simple).

I like solving problems, teaching others, and occasionally making robots do my bidding. If it beeps, blinks, or launches into the sky, I'm interested.`;

export default function Hero() {
  const [roleIdx,    setRoleIdx]    = useState(0);
  const [imgFailed,  setImgFailed]  = useState(false);

  /* Cycle through roles every 2.5 s */
  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ── Backgrounds ─────────────────────────────────────────── */}
      <div className="absolute inset-0 circuit-grid" aria-hidden="true" />
      <ParticleBackground />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-cyan/8 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 pt-24">

        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex-shrink-0 animate-float"
        >
          <div className="relative w-44 h-44 md:w-56 md:h-56">
            {/* Glowing ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/50 to-neon-purple/50 blur-md animate-glow-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-neon-cyan/50 shadow-neon-cyan">
              {imgFailed ? (
                <div className="w-full h-full flex items-center justify-center bg-dark-surface">
                  <span className="text-4xl font-bold gradient-text font-mono">AK</span>
                </div>
              ) : (
                <TryImg
                  src="/assets/profile.jpg"
                  alt="Aryan Kumar"
                  className="w-full h-full object-cover"
                  onGiveUp={() => setImgFailed(true)}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Text block */}
        <div className="flex flex-col gap-5 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-neon-cyan text-sm tracking-[0.3em] uppercase mb-2">
              Hello, World 👋
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight">
              <span className="text-white">Aryan </span>
              <span className="gradient-text">Kumar</span>
            </h1>
          </motion.div>

          {/* Animated role */}
          <motion.div
            key={roleIdx}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-lg text-slate-400 typing-cursor"
          >
            {ROLES[roleIdx]}
          </motion.div>

          {/* About paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-2xl"
          >
            {ABOUT.split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-400 text-sm leading-relaxed mb-3 last:mb-0">
                {para}
              </p>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <Link to="/projects">
              <NeonButton variant="primary">View Projects</NeonButton>
            </Link>
            <Link to="/contact">
              <NeonButton variant="secondary">Get In Touch</NeonButton>
            </Link>
            <NeonButton
              variant="ghost"
              href="https://github.com/Uniostar"
            >
              <Github size={16} /> GitHub
            </NeonButton>
            <NeonButton
              variant="ghost"
              href="https://www.linkedin.com/in/aryan-kumar-65abb0245/"
            >
              <Linkedin size={16} /> LinkedIn
            </NeonButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
      >
        <span className="font-mono text-xs tracking-widest">scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
