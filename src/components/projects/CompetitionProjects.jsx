import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ExternalLink, X, Image } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';
import AnimatedSection from '../ui/AnimatedSection';
import TryImg from '../ui/TryImg';
import { competitionProjects } from '../../data/competitionProjects';
import { pub } from '../../utils/asset';

const ACCENT = {
  border:     'border-neon-green/20',
  glow:       'hover-glow-green',
  badge:      'bg-neon-green/8 text-neon-green/80 border-neon-green/25',
  thumbStyle: { background: 'linear-gradient(135deg, rgba(0,255,136,0.10) 0%, rgba(5,5,15,0.95) 100%)' },
  btn:        'border-neon-green/25 text-neon-green/75 hover:text-neon-green hover:border-neon-green/45 hover:[box-shadow:none] hover:bg-neon-green/5',
  yearBadge:  'text-neon-green/70',
};

/* ── Modal for projects without an external page (e.g. Doom Mini) ── */
function ProjectModal({ project, onClose }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-3 sm:p-6 pt-[6vh] sm:pt-6"
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl max-h-[88vh] flex flex-col glass rounded-2xl border border-neon-green/25 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="flex items-start justify-between gap-3 px-5 sm:px-7 pt-5 pb-4 border-b border-white/06 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.tags.map(t => (
                <span key={t} className={`text-xs px-2 py-0.5 rounded-full border font-mono ${ACCENT.badge}`}>{t}</span>
              ))}
            </div>
            <h2 className="font-bold text-slate-100 text-base sm:text-lg leading-snug">{project.title}</h2>
            <p className="text-neon-green/60 text-xs font-mono mt-0.5">{project.year}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 -mt-0.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors touch-manipulation"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden flex items-center justify-center" style={ACCENT.thumbStyle}>
            {!imgError ? (
              <TryImg
                src={pub(project.thumbnail)}
                alt={project.title}
                className="w-full h-full object-cover"
                onGiveUp={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-700 py-10">
                <Image size={36} strokeWidth={1} />
                <span className="text-xs font-mono">thumbnail coming soon</span>
              </div>
            )}
          </div>

          <div className="px-5 sm:px-7 py-5 space-y-4">
            {/* Description */}
            {(() => {
              const paras = project.description.split('\n\n').filter(Boolean);
              const isBullets = paras.length > 0 && paras.every(p => p.trimStart().startsWith('•'));
              return isBullets ? (
                <ul className="space-y-2">
                  {paras.map((p, i) => (
                    <li key={i} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                      <span className="text-neon-green/50 flex-shrink-0 mt-0.5">•</span>
                      <span>{p.replace(/^•\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                paras.map((para, i) => (
                  <p key={i} className="text-slate-400 text-sm leading-relaxed">{para}</p>
                ))
              );
            })()}

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/04 border border-white/10 text-slate-500"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function ProjectCard({ project, index }) {
  const [imgError,   setImgError]   = useState(false);
  const [modalOpen,  setModalOpen]  = useState(false);

  return (
    <AnimatedSection delay={index * 0.1}>
      <GlassCard
        hover={false}
        className={`flex flex-col overflow-hidden border ${ACCENT.border} ${ACCENT.glow} transition-all duration-300 group`}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden flex items-center justify-center" style={ACCENT.thumbStyle}>
          {!imgError ? (
            <TryImg
              src={pub(project.thumbnail)}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onGiveUp={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-700">
              <Image size={36} strokeWidth={1} />
              <span className="text-xs font-mono">thumbnail coming soon</span>
            </div>
          )}
          <span className={`absolute top-3 right-3 font-mono text-xs px-2.5 py-1 glass rounded-full ${ACCENT.yearBadge}`}>
            {project.year}
          </span>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(t => (
              <span key={t} className={`text-xs px-2 py-0.5 rounded-full border font-mono ${ACCENT.badge}`}>{t}</span>
            ))}
          </div>

          <h3 className="font-bold text-slate-100 text-base leading-snug">{project.title}</h3>
          <p className="text-slate-500 text-xs leading-relaxed flex-1">{project.tagline}</p>

          {/* Action button */}
          {project.hasExternalPage ? (
            <NeonButton
              href={project.externalLink}
              variant="ghost"
              className={`w-full justify-center ${ACCENT.btn}`}
            >
              <ExternalLink size={13} />
              {project.externalLabel}
            </NeonButton>
          ) : (
            <NeonButton
              onClick={() => setModalOpen(true)}
              variant="ghost"
              className={`w-full justify-center ${ACCENT.btn}`}
            >
              View Details
            </NeonButton>
          )}
        </div>
      </GlassCard>

      {modalOpen && (
        <ProjectModal project={project} onClose={() => setModalOpen(false)} />
      )}
    </AnimatedSection>
  );
}

export default function CompetitionProjects() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {competitionProjects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </div>
  );
}
