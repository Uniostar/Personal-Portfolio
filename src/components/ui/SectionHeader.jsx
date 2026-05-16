import AnimatedSection from './AnimatedSection';

/* Consistent section title + optional subtitle used across all pages. */
export default function SectionHeader({ eyebrow, title, subtitle, centered = false }) {
  const align = centered ? 'text-center items-center' : '';
  return (
    <AnimatedSection className={`flex flex-col gap-3 mb-12 ${align}`}>
      {eyebrow && (
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-neon-cyan">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-display gradient-text leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-slate-400 max-w-2xl text-base leading-relaxed">{subtitle}</p>
      )}
    </AnimatedSection>
  );
}
