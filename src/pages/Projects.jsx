import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectFilter from '../components/projects/ProjectFilter';
import CompetitionProjects from '../components/projects/CompetitionProjects';
import PCBGrid from '../components/projects/PCBGrid';
import SectionHeader from '../components/ui/SectionHeader';

const SECTIONS = {
  competition: {
    eyebrow:      'Competition Submissions',
    eyebrowColor: 'text-neon-green',
    title:        'Built Under Pressure',
    subtitle:     'Hackathon entries, class competitions, and collaborative engineering challenges.',
    Component:    CompetitionProjects,
  },
  pcb: {
    eyebrow:      'PCB Design Portfolio',
    eyebrowColor: 'text-neon-cyan',
    title:        'From KiCad to Fab',
    subtitle:     '4 fabricated boards — click any card to expand the full technical breakdown.',
    Component:    PCBGrid,
  },
};

export default function Projects() {
  const [active, setActive] = useState('competition');
  const section = SECTIONS[active];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Portfolio"
          title="Projects"
          subtitle="Engineering across hardware, firmware, and circuit design."
          centered
        />

        <div className="mb-12">
          <ProjectFilter active={active} onChange={setActive} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="mb-8">
              <p className={`font-space-mono text-xs tracking-[0.25em] uppercase ${section.eyebrowColor} mb-1`}>
                {section.eyebrow}
              </p>
              <h2 className="text-2xl font-display text-white">{section.title}</h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">{section.subtitle}</p>
            </div>
            <section.Component />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
