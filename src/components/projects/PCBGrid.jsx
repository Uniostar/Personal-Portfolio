import SectionHeader from '../ui/SectionHeader';
import PCBCard from './PCBCard';

const FABRICATED_SLUGS = [
  'arduino-nano-rc-receiver',
  'esp32-cam-flight-camera',
  'non-inverting-amplifier',
  'switching-buck-converter',
];

/* Concept slugs kept for reference — rendering commented out
const CONCEPT_SLUGS = [
  'esp32-s3-breakout',
  'esp32-s3-flight-breakout',
  'tps6302x-buck-boost',
  'mpu6050-9dof',
  'bme280-breakout',
  'lm2596-step-up',
];
*/

export default function PCBGrid() {
  return (
    <div className="space-y-12">
      {/* Fabricated section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-neon-cyan">
            Fabricated PCBs
          </span>
          <div className="flex-1 h-px bg-neon-cyan/20" />
          <span className="text-xs text-slate-600 font-mono">4 boards</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FABRICATED_SLUGS.map((slug, i) => (
            <PCBCard key={slug} slug={slug} index={i} />
          ))}
        </div>
      </div>

      {/* Concept section — commented out, data files preserved
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-neon-cyan">
            Concept Designs
          </span>
          <div className="flex-1 h-px bg-neon-cyan/20" />
          <span className="text-xs text-slate-600 font-mono">6 designs</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONCEPT_SLUGS.map((slug, i) => (
            <PCBCard key={slug} slug={slug} index={i} />
          ))}
        </div>
      </div>
      */}
    </div>
  );
}
