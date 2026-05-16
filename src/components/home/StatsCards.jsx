import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeader from '../ui/SectionHeader';

/* Skills — languages low→high level, then tools hardware→software, then web dev.
   slug entries use Simple Icons CDN; localPng entries load from /assets/logos/. */
const SKILL_LOGOS = [
  // ── Languages (lowest → highest level) ────────────────────────────────
  { name: 'Assembly',         localPng: 'skill-asm',     initials: 'ASM' },
  { name: 'C / C++',         slug: 'cplusplus',          color: '00599C' },
  { name: 'Java',             localPng: 'skill-java',    initials: 'JV'  },
  { name: 'C#',               localPng: 'skill-csharp',  initials: 'C#'  },
  { name: 'Python',           slug: 'python',            color: '3776AB' },
  // ── Tools (hardware → software) ───────────────────────────────────────
  { name: 'Texas Instruments', localPng: 'skill-ti',     initials: 'TI'  },
  { name: 'LTspice',          localPng: 'skill-ltspice', initials: 'LT'  },
  { name: 'KiCad',            slug: 'kicad',             color: '314CB0' },
  { name: 'Arduino',          slug: 'arduino',           color: '00979D' },
  { name: 'Linux',            localPng: 'skill-linux',   initials: 'LX'  },
  { name: 'WSL2',             localPng: 'skill-wsl',     initials: 'WSL' },
  { name: 'GitHub',           slug: 'github',            color: 'ffffff' },
  { name: 'Figma',            slug: 'figma',             color: 'F24E1E' },
  // ── Web dev ───────────────────────────────────────────────────────────
  { name: 'HTML',             slug: 'html5',             color: 'E34F26' },
  { name: 'CSS',              localPng: 'skill-css',     initials: 'CSS' },
  { name: 'JavaScript',       slug: 'javascript',        color: 'F7DF1E' },
  { name: 'React',            slug: 'react',             color: '61DAFB' },
  { name: 'Tailwind',         slug: 'tailwindcss',       color: '06B6D4' },
];

const STATS = [
  { value: '10+',  label: 'PCB Designs'       },
  { value: '3',    label: 'Major Projects'     },
  { value: '8',    label: 'Articles Published' },
  { value: '75k+', label: 'Article Views'      },
  { value: '∞',    label: 'Things to Build'    },
];

function StatItem({ value, label, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 200 }}
      className="flex flex-col items-center"
    >
      <span className="text-4xl font-extrabold gradient-text">{value}</span>
      <span className="text-slate-500 text-sm mt-1 font-mono">{label}</span>
    </motion.div>
  );
}

function HexCell({ name, slug, color, localPng, initials }) {
  const [imgFailed, setImgFailed] = useState(false);
  const iconUrl = imgFailed ? null
    : localPng ? `/assets/logos/${localPng}.png`
    : slug     ? `https://cdn.simpleicons.org/${slug}/${color}`
    : null;

  return (
    <div className="flex flex-col items-center gap-3 group cursor-default">
      <div className="relative flex items-center justify-center w-36 h-[167px]">
        {/* SVG hexagon background */}
        <svg viewBox="0 0 64 74" className="absolute inset-0 w-full h-full">
          <polygon
            points="32,2 62,20 62,54 32,72 2,54 2,20"
            fill="rgba(55,58,75,0.90)"
            stroke="rgba(0,245,255,0.18)"
            strokeWidth="1.5"
            className="transition-all duration-300 group-hover:[stroke:rgba(0,245,255,0.45)]"
          />
        </svg>
        <div className="relative z-10 w-[72px] h-[72px] flex items-center justify-center">
          {iconUrl ? (
            <img
              src={iconUrl}
              alt={name}
              className="w-[60px] h-[60px] object-contain"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="text-sm font-mono font-bold text-neon-cyan/70">
              {initials ?? name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      </div>
      <span className="text-slate-500 text-xs font-mono text-center leading-tight max-w-[162px] group-hover:text-slate-300 transition-colors duration-200">
        {name}
      </span>
    </div>
  );
}

export default function StatsCards() {
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Skills"
        title="What I Work With"
        subtitle="From bare-metal firmware to analog circuit design — I build across the full stack of engineering."
      />

      {/* Stats row */}
      <AnimatedSection className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16 glass rounded-2xl p-8">
        {STATS.map((s, i) => <StatItem key={s.label} {...s} index={i} />)}
      </AnimatedSection>

      {/* Hex logo grid */}
      <AnimatedSection>
        <div className="flex flex-wrap justify-center gap-7">
          {SKILL_LOGOS.map((skill, i) => (
            <HexCell key={skill.name} {...skill} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
