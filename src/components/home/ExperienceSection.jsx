import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';

/* Place square logos (256×256 transparent-bg PNG) at:
     public/assets/logos/texas-scl.png
     public/assets/logos/american-airlines.png
     public/assets/logos/hackster.png
   Missing files fall back to styled initials automatically. */

/* Static color map — full string literals so Tailwind JIT keeps every class */
const C = {
  'neon-cyan': {
    border:       'border-neon-cyan/25',
    activeBorder: 'border-neon-cyan/55',
    text:         'text-neon-cyan',
    sub:          'text-neon-cyan/60',
    iconBg:       'bg-neon-cyan/10 border-neon-cyan/20',
    pill:         'bg-neon-cyan/8 border-neon-cyan/20 text-neon-cyan/70',
    activeBg:     'bg-neon-cyan/5',
    dot:          'bg-neon-cyan',
    bullet:       'bg-neon-cyan/60',
  },
  'neon-purple': {
    border:       'border-neon-purple/25',
    activeBorder: 'border-neon-purple/55',
    text:         'text-neon-purple',
    sub:          'text-neon-purple/60',
    iconBg:       'bg-neon-purple/10 border-neon-purple/20',
    pill:         'bg-neon-purple/8 border-neon-purple/20 text-neon-purple/70',
    activeBg:     'bg-neon-purple/5',
    dot:          'bg-neon-purple',
    bullet:       'bg-neon-purple/60',
  },
  'neon-green': {
    border:       'border-neon-green/25',
    activeBorder: 'border-neon-green/55',
    text:         'text-neon-green',
    sub:          'text-neon-green/60',
    iconBg:       'bg-neon-green/10 border-neon-green/20',
    pill:         'bg-neon-green/8 border-neon-green/20 text-neon-green/70',
    activeBg:     'bg-neon-green/5',
    dot:          'bg-neon-green',
    bullet:       'bg-neon-green/60',
  },
  'neon-orange': {
    border:       'border-neon-orange/25',
    activeBorder: 'border-neon-orange/55',
    text:         'text-neon-orange',
    sub:          'text-neon-orange/60',
    iconBg:       'bg-neon-orange/10 border-neon-orange/20',
    pill:         'bg-neon-orange/8 border-neon-orange/20 text-neon-orange/70',
    activeBg:     'bg-neon-orange/5',
    dot:          'bg-neon-orange',
    bullet:       'bg-neon-orange/60',
  },
};

const EXPERIENCES = [
  {
    id: 'texas-scl',
    company: 'Texas Spacecraft Laboratory',
    role: 'Electronics Team Member',
    year: '2025 — Present',
    logoFile: 'texas-scl',
    initials: 'TSL',
    color: 'neon-cyan',
    bullets: [
      'Contributing to the electronics subsystem of student-built CubeSat spacecraft at UT Austin.',
      'Designing and reviewing PCBs for power regulation, sensor interfacing, and data acquisition.',
      'Writing and testing embedded firmware for avionics components in C.',
      'Collaborating across power systems, communications, and attitude-determination subsystems.',
    ],
    skills: ['PCB Design', 'KiCad', 'Embedded C', 'Avionics', 'CubeSat'],
  },
  {
    id: 'aa-extern',
    company: 'American Airlines',
    role: 'Technology Extern',
    year: 'Spring 2025',
    logoFile: 'american-airlines',
    initials: 'AA',
    color: 'neon-purple',
    bullets: [
      "Completed a structured externship inside American Airlines' Technology division.",
      'Gained hands-on exposure to enterprise software architecture and IT infrastructure at scale.',
      'Participated in team standups, product reviews, and shadow sessions with senior engineers.',
      'Explored technology strategy in the context of commercial aviation operations.',
    ],
    skills: ['Enterprise IT', 'Tech Strategy', 'Aviation Systems'],
  },
  {
    id: 'pcbway',
    company: 'PCBWay',
    role: 'Sponsored PCB Designer',
    year: '2026 — Present',
    logoFile: 'pcbway',
    initials: 'PW',
    color: 'neon-cyan',
    bullets: [
      'Received fabrication sponsorship from PCBWay for open-source hardware projects.',
      'Designing multi-layer PCBs for rocketry, RF systems, and embedded applications.',
      'Submitting production-ready Gerber files and collaborating through the PCBWay review process.',
      'Contributing documented designs to the PCBWay open-source community.',
    ],
    skills: ['PCB Design', 'KiCad', 'Gerber Files', 'Multi-layer PCB', 'Open Source'],
  },
  {
    id: 'technical-author',
    company: 'Hackster.io & Arduino Hub',
    role: 'Technical Author',
    year: '2024 — Present',
    logoFile: 'hackster',
    initials: 'H.',
    color: 'neon-green',
    bullets: [
      'Publishing in-depth guides on embedded systems, PCB design, and RF communications.',
      'Accumulated 75k+ combined article views across Hackster.io and Arduino Project Hub.',
      'Articles featured in platform newsletters and curated project showcases.',
      'Topics include Bluetooth modules, GPS tracking, RC systems, and flight data logging.',
    ],
    skills: ['Arduino', 'ESP32', 'Technical Writing', 'RF Systems', 'PCB Design'],
  },
  {
    id: 'mathematics-tutor',
    company: 'Mathnasium',
    role: 'Mathematics Tutor',
    year: '2022 — 2025',
    logoFile: 'mathnasium',
    initials: 'MN',
    color: 'neon-orange',
    bullets: [
      'Tutored students in calculus, linear algebra, and differential equations.',
      'Translated abstract mathematical concepts into intuitive frameworks for each student.',
      'Developed custom problem sets and visual aids tailored to individual learning styles.',
    ],
    skills: ['Calculus', 'Linear Algebra', 'Differential Equations'],
  },
];

function LogoBadge({ logoFile, initials, color, size = 'md' }) {
  const [failed, setFailed] = useState(false);
  const c = C[color] ?? C['neon-cyan'];
  const dim      = size === 'lg' ? 'w-16 h-16' : 'w-11 h-11';
  const textSize = size === 'lg' ? 'text-sm'   : 'text-xs';

  return (
    <div className={`${dim} flex-shrink-0 rounded-xl border ${c.iconBg} flex items-center justify-center overflow-hidden`}>
      {logoFile && !failed ? (
        <img
          src={`/assets/logos/${logoFile}.png`}
          alt={logoFile}
          className="w-4/5 h-4/5 object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={`${textSize} font-mono font-bold ${c.text}`}>{initials}</span>
      )}
    </div>
  );
}

export default function ExperienceSection() {
  const [activeId, setActiveId] = useState(EXPERIENCES[0].id);
  const active = EXPERIENCES.find(e => e.id === activeId);
  const c = C[active.color] ?? C['neon-cyan'];

  return (
    <section id="experience" className="py-16 px-6 max-w-6xl mx-auto">
      {/* Left-aligned heading */}
      <AnimatedSection className="mb-10">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-neon-cyan block mb-3">
          Experience
        </span>
        <h2 className="text-3xl md:text-4xl font-display gradient-text leading-tight">
          The Mission Log
        </h2>
      </AnimatedSection>

      <AnimatedSection>
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Left: clickable experience list */}
          <div className="flex flex-col gap-3 lg:w-64 flex-shrink-0">
            {EXPERIENCES.map(exp => {
              const isActive = exp.id === activeId;
              const ec = C[exp.color] ?? C['neon-cyan'];
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveId(exp.id)}
                  className={[
                    'glass rounded-xl px-4 py-4 flex items-center gap-3 text-left transition-all duration-200 border focus:outline-none w-full',
                    isActive
                      ? `${ec.activeBorder} ${ec.activeBg}`
                      : `${ec.border} opacity-55 hover:opacity-100`,
                  ].join(' ')}
                >
                  <LogoBadge logoFile={exp.logoFile} initials={exp.initials} color={exp.color} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm truncate ${isActive ? ec.text : 'text-slate-300'}`}>
                      {exp.company}
                    </p>
                    <p className="text-slate-500 text-xs font-mono mt-0.5 truncate">{exp.year}</p>
                  </div>
                  {isActive && (
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ec.dot}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <div className="flex-1 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className={`glass rounded-2xl p-7 sm:p-10 h-full border ${c.activeBorder} flex flex-col gap-6`}
              >
                {/* Header */}
                <div className="flex items-start gap-5">
                  <LogoBadge logoFile={active.logoFile} initials={active.initials} color={active.color} size="lg" />
                  <div>
                    <span className={`font-mono text-xs tracking-wider ${c.sub} block mb-1`}>
                      {active.year}
                    </span>
                    <h3 className={`text-xl font-bold ${c.text}`}>{active.company}</h3>
                    <p className="text-slate-400 text-sm mt-0.5">{active.role}</p>
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="flex flex-col gap-2.5 flex-1">
                  {active.bullets.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.bullet}`} />
                      <span className="text-slate-400 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {active.skills.map(skill => (
                    <span
                      key={skill}
                      className={`font-mono text-xs px-2.5 py-1 rounded-full border ${c.pill}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </AnimatedSection>
    </section>
  );
}
