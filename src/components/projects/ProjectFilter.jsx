import { motion } from 'framer-motion';

const TABS = [
  {
    id: 'competition',
    label: 'Competition',
    active:  'text-neon-green/80',
    pill:    'border-neon-green/35 bg-neon-green/6',
    ring:    'focus-visible:ring-neon-green/50',
  },
  {
    id: 'pcb',
    label: 'PCB Design',
    active:  'text-neon-cyan/80',
    pill:    'border-neon-cyan/35 bg-neon-cyan/6',
    ring:    'focus-visible:ring-neon-cyan/50',
  },
];

export default function ProjectFilter({ active, onChange }) {
  return (
    <div className="flex items-center gap-2 p-1.5 glass rounded-2xl w-fit mx-auto">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={[
            `relative px-5 py-2.5 rounded-xl text-sm font-space-mono tracking-wide transition-colors duration-200 focus:outline-none ${tab.ring}`,
            active === tab.id ? tab.active : 'text-slate-500 hover:text-slate-300',
          ].join(' ')}
        >
          {active === tab.id && (
            <motion.span
              layoutId="filter-pill"
              className={`absolute inset-0 rounded-xl border ${tab.pill}`}
              style={{ zIndex: -1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
