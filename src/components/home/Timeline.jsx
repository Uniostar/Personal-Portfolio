import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap, PenTool, BookOpen, Trophy, Plane,
  Code2, Rocket, Building,
} from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const SLUGS = [
  'technical-author',
  'sigma',
  'doom-mini',
  'mathematics-tutor',
  'project-sunflower',
  'aa-extern',
  'aa-intern',
];

const ICON_MAP = {
  GraduationCap, PenTool, BookOpen, Trophy, Plane, Code2, Rocket, Building,
};

/* Static string maps — Tailwind scanner finds these at build time */
const COLOR_MAP = {
  'neon-cyan': {
    iconBg:    'bg-neon-cyan/10 border-neon-cyan/20',
    iconText:  'text-neon-cyan',
    yearText:  'text-neon-cyan/70',
    orgText:   'text-neon-cyan/60',
    dotBg:     'bg-neon-cyan/70',
    glow:      'hover-glow-cyan',
    shadow:    'group-hover:shadow-neon-cyan',
  },
  'neon-purple': {
    iconBg:    'bg-neon-purple/10 border-neon-purple/20',
    iconText:  'text-neon-purple',
    yearText:  'text-neon-purple/70',
    orgText:   'text-neon-purple/60',
    dotBg:     'bg-neon-purple/70',
    glow:      'hover-glow-purple',
    shadow:    'group-hover:shadow-neon-purple',
  },
  'neon-green': {
    iconBg:    'bg-neon-green/10 border-neon-green/20',
    iconText:  'text-neon-green',
    yearText:  'text-neon-green/70',
    orgText:   'text-neon-green/60',
    dotBg:     'bg-neon-green/70',
    glow:      'hover-glow-cyan',
    shadow:    'group-hover:shadow-neon-green',
  },
  'neon-orange': {
    iconBg:    'bg-neon-orange/10 border-neon-orange/20',
    iconText:  'text-neon-orange',
    yearText:  'text-neon-orange/70',
    orgText:   'text-neon-orange/60',
    dotBg:     'bg-neon-orange/70',
    glow:      'hover-glow-orange',
    shadow:    'group-hover:shadow-neon-orange',
  },
};

function TimelineItem({ event, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const isLeft = index % 2 === 0;
  const c      = COLOR_MAP[event.color] ?? COLOR_MAP['neon-cyan'];
  const Icon   = ICON_MAP[event.icon] ?? GraduationCap;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.06, ease: 'easeOut' }}
      className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-0 md:gap-8 items-start md:items-center`}
    >
      {/* Card */}
      <div className={`md:w-[calc(50%-2rem)] w-full ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <div className={`glass rounded-xl p-5 ${c.glow} transition-all duration-300 group`}>
          <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <div className={`p-2 rounded-lg border ${c.iconBg} ${c.shadow} transition-shadow`}>
              <Icon size={16} className={c.iconText} />
            </div>
            <span className={`font-mono text-xs ${c.yearText} tracking-wide`}>{event.year}</span>
          </div>
          <h3 className="font-bold text-slate-100 text-sm mb-0.5">{event.title}</h3>
          <p className={`${c.orgText} text-xs font-mono mb-2`}>{event.org}</p>
          <p className="text-slate-500 text-xs leading-relaxed">{event.detail}</p>
        </div>
      </div>

      {/* Centre dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-dark-bg border-2 border-neon-purple/50 items-center justify-center z-10">
        <div className={`w-1.5 h-1.5 rounded-full ${c.dotBg} animate-glow-pulse`} />
      </div>

      <div className="md:w-[calc(50%-2rem)] hidden md:block" />
    </motion.div>
  );
}

export default function Timeline() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Promise.allSettled(
      SLUGS.map(slug =>
        fetch(`${import.meta.env.BASE_URL}timeline-data/${slug}.json`).then(r => {
          if (!r.ok) throw new Error(r.status);
          return r.json();
        })
      )
    ).then(results => {
      setEvents(
        results
          .filter(r => r.status === 'fulfilled')
          .map(r => r.value)
      );
    });
  }, []);

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Experience"
          title="The Timeline"
          subtitle="Where I've been, what I've built, and what keeps me up at night (usually in a good way)."
          centered
        />

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple/40 via-neon-cyan/25 to-transparent" />
          <div className="flex flex-col gap-8">
            {events.map((event, i) => (
              <TimelineItem key={event.title ?? i} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
