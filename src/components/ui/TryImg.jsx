import { useState } from 'react';

const EXTS = ['jpg', 'jpeg', 'png'];

function stripExt(src) {
  return src.replace(/\.(jpe?g|png)$/i, '');
}

/* Tries jpg → jpeg → png in order. Calls onGiveUp() when all fail.
   Reset automatically when src changes (key the parent on the base path). */
export default function TryImg({ src, alt, className, onGiveUp, ...rest }) {
  const base = stripExt(src);
  const [extIdx, setExtIdx] = useState(0);

  const handleError = () => {
    const next = extIdx + 1;
    if (next < EXTS.length) {
      setExtIdx(next);
    } else {
      onGiveUp?.();
    }
  };

  return (
    <img
      src={`${base}.${EXTS[extIdx]}`}
      alt={alt}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
}
