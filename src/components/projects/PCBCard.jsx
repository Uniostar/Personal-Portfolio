import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Cpu, Wrench, Image, X, ExternalLink } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';
import AnimatedSection from '../ui/AnimatedSection';
import PhotoSlideshow from './PhotoSlideshow';
import TryImg from '../ui/TryImg';
import { pcbPhotoData } from '../../data/pcbPhotoData';
import { pub } from '../../utils/asset';

function buildPhotos(slug, fabricated = true) {
  const data = pcbPhotoData[slug];
  if (!data) return { photos: [], schematicSrc: '', schematicCaption: '' };
  const count = fabricated ? 4 : 3;
  return {
    photos: data.photos.slice(0, count).map((caption, i) => ({
      src:     pub(`/pcb-data/${slug}/photo-${i + 1}.jpg`),
      caption,
    })),
    schematicSrc:     pub(`/pcb-data/${slug}/schematic.jpg`),
    schematicCaption: data.schematic,
  };
}

function PCBModal({ info, photos, schematicSrc, schematicCaption, onClose }) {
  const [schError, setSchError] = useState(false);
  const isFab = info.fabricated;

  /* Body scroll lock + Escape to close */
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
    /* Full-screen overlay */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-3 sm:p-6 pt-[6vh] sm:pt-6"
    >
      {/* Blurred backdrop — blocks all interaction behind */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl max-h-[88vh] flex flex-col glass rounded-2xl border border-neon-cyan/25 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Sticky header ── */}
        <div className="flex items-start justify-between gap-3 px-5 sm:px-7 pt-5 pb-4 border-b border-white/06 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-full border bg-neon-cyan/8 text-neon-cyan/75 border-neon-cyan/25 mb-2">
              {isFab ? <Cpu size={10} /> : <Wrench size={10} />}
              {isFab ? 'Fabricated' : 'Concept'}
            </span>
            <h2 className="font-bold text-slate-100 text-base sm:text-lg leading-snug">
              {info.header}
            </h2>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 -mt-0.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors touch-manipulation"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-5 sm:px-7 py-5 space-y-5">
          {/* Photo slideshow */}
          {photos.length > 0 && (
            <div className="-mx-5 sm:-mx-7 -mt-5 mb-0">
              <PhotoSlideshow photos={photos} />
            </div>
          )}

          {/* Description */}
          {(() => {
            const paras = info.description.split('\n\n');
            const isBullets = paras.every(p => p.trimStart().startsWith('•'));
            return isBullets ? (
              <ul className="space-y-2">
                {paras.map((p, i) => (
                  <li key={i} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                    <span className="text-neon-cyan/50 flex-shrink-0 mt-0.5">•</span>
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

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {info.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/04 border border-white/10 text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hackster article link */}
          {info.articleUrl && (
            <NeonButton href={info.articleUrl} variant="primary" className="w-full justify-center">
              <ExternalLink size={13} />
              Read on Hackster.io
            </NeonButton>
          )}

          {/* Schematic */}
          <div>
            <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-2">
              Schematic
            </p>
            <div className="rounded-xl overflow-hidden border border-white/08 bg-dark-bg">
              {!schError ? (
                <TryImg
                  src={schematicSrc}
                  alt={schematicCaption}
                  className="w-full h-auto"
                  onGiveUp={() => setSchError(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-7 text-slate-700">
                  <Image size={28} strokeWidth={1} />
                  <p className="text-xs font-mono text-center px-4">{schematicCaption}</p>
                  <p className="text-xs text-slate-800">Image coming soon</p>
                </div>
              )}
            </div>
            {!schError && (
              <p className="text-slate-600 text-xs mt-1.5">{schematicCaption}</p>
            )}
          </div>
        </div>
      </motion.div>

    </motion.div>,
    document.body
  );
}

export default function PCBCard({ slug, index }) {
  const [info,      setInfo]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(pub(`/pcb-data/${slug}/info.json`))
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(data => { setInfo(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [slug]);

  const { photos, schematicSrc, schematicCaption } = buildPhotos(slug, info?.fabricated ?? true);

  if (loading) {
    return (
      <AnimatedSection delay={index * 0.06}>
        <div className="glass rounded-2xl shimmer-bg" style={{ height: '340px' }} />
      </AnimatedSection>
    );
  }

  if (error || !info) {
    return (
      <AnimatedSection delay={index * 0.06}>
        <GlassCard className="p-5 text-slate-500 text-sm">
          Could not load data for <code className="font-mono text-xs">{slug}</code>.
        </GlassCard>
      </AnimatedSection>
    );
  }

  const isFab = info.fabricated;

  return (
    <AnimatedSection delay={index * 0.06}>
      <GlassCard
        hover={false}
        className="flex flex-col overflow-hidden border border-neon-cyan/20 hover-glow-cyan transition-all duration-300 group"
      >
        {/* Slideshow */}
        <PhotoSlideshow photos={photos} />

        {/* Collapsed card info */}
        <div className="flex flex-col flex-1 p-4 gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-full border bg-neon-cyan/8 text-neon-cyan/75 border-neon-cyan/25">
              {isFab ? <Cpu size={10} /> : <Wrench size={10} />}
              {isFab ? 'Fabricated' : 'Concept'}
            </span>
            {info.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/04 border border-white/10 text-slate-600">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-bold text-slate-100 text-sm leading-tight">{info.header}</h3>
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 flex-1">
            {info.elevator_pitch}
          </p>

          {/* Open modal button */}
          <NeonButton onClick={() => setModalOpen(true)} variant="primary" className="w-full justify-center mt-1 hover:[box-shadow:none] hover:bg-neon-cyan/5">
            View Details
          </NeonButton>
        </div>
      </GlassCard>

      {/* Modal — rendered into document.body */}
      {modalOpen && (
        <PCBModal
          info={info}
          photos={photos}
          schematicSrc={schematicSrc}
          schematicCaption={schematicCaption}
          onClose={() => setModalOpen(false)}
        />
      )}
    </AnimatedSection>
  );
}
