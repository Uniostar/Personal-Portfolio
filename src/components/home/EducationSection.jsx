import { useState, useEffect } from 'react';
import SectionHeader from '../ui/SectionHeader';
import AnimatedSection from '../ui/AnimatedSection';

export default function EducationSection() {
  const [edu, setEdu] = useState(null);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}timeline-data/bs-ece.json`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setEdu(data); })
      .catch(() => {});
  }, []);

  if (!edu) return null;

  return (
    <section id="education" className="py-16 px-6 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Education"
        title="Where I Study"
        subtitle="Building a rigorous foundation in electrical engineering, embedded systems, and computer science."
      />

      <AnimatedSection>
        <div className="glass rounded-2xl p-6 sm:p-8 border border-neon-orange/20 transition-transform duration-300 hover:scale-[1.015]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* UT Austin logo */}
            <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-neon-orange/10 border border-neon-orange/20 flex items-center justify-center overflow-hidden self-start">
              {!logoFailed ? (
                <img
                  src="/assets/logos/ut-austin.png"
                  alt="UT Austin"
                  className="w-4/5 h-4/5 object-contain"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <span className="text-xs font-mono font-bold text-neon-orange">UT</span>
              )}
            </div>

            {/* Text */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h3 className="font-bold text-slate-100 text-base sm:text-lg">{edu.title}</h3>
                <span className="font-mono text-xs text-neon-orange/70 tracking-wide bg-neon-orange/8 border border-neon-orange/20 px-2 py-0.5 rounded-full">
                  {edu.year}
                </span>
              </div>
              <p className="text-neon-orange/60 text-sm font-mono mb-3">{edu.org}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{edu.detail}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
