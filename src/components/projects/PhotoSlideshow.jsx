import { useState } from 'react';
import { ChevronLeft, ChevronRight, Image } from 'lucide-react';
import TryImg from '../ui/TryImg';

/* Reusable slideshow for PCB cards.
   photos: [{ src, caption }]
   Shows prev/next controls, photo count, and graceful image-error fallback. */
export default function PhotoSlideshow({ photos }) {
  const [idx, setIdx]            = useState(0);
  const [imgErrors, setImgErrors] = useState({});

  if (!photos || photos.length === 0) return null;

  const prev = () => setIdx(i => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx(i => (i + 1) % photos.length);

  const current = photos[idx];
  const hasError = imgErrors[idx];

  return (
    <div className="relative rounded-xl overflow-hidden bg-dark-bg border border-white/08">
      {/* Photo area */}
      <div className="relative aspect-video flex items-center justify-center bg-gradient-to-br from-dark-surface to-dark-bg">
        {!hasError ? (
          <TryImg
            key={current.src}
            src={current.src}
            alt={current.caption}
            className="w-full h-full object-cover transition-opacity duration-300"
            onGiveUp={() => setImgErrors(e => ({ ...e, [idx]: true }))}
          />
        ) : (
          /* Placeholder when image is not yet available */
          <div className="flex flex-col items-center gap-3 text-slate-600 p-8 text-center">
            <Image size={40} strokeWidth={1} />
            <p className="text-xs font-mono max-w-xs">{current.caption}</p>
            <p className="text-xs text-slate-700">Image coming soon</p>
          </div>
        )}

        {/* Prev / Next overlays */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg glass text-white/70 hover:text-white hover:bg-white/15 transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg glass text-white/70 hover:text-white hover:bg-white/15 transition-all"
              aria-label="Next photo"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Counter badge */}
        <span className="absolute top-3 right-3 font-mono text-xs px-2 py-1 glass rounded-full text-slate-400">
          {idx + 1} / {photos.length}
        </span>
      </div>

      {/* Caption */}
      <div className="px-4 py-2.5 border-t border-white/08">
        <p className="text-slate-400 text-xs leading-snug">{current.caption}</p>
      </div>

      {/* Dot indicators */}
      {photos.length > 1 && (
        <div className="flex justify-center gap-1.5 pb-3">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={[
                'w-1.5 h-1.5 rounded-full transition-all duration-200',
                i === idx ? 'bg-neon-cyan w-4' : 'bg-white/20 hover:bg-white/40',
              ].join(' ')}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
