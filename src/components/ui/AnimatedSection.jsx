import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* Wraps children in a Framer Motion div that fades + slides up when scrolled into view.
   delay (seconds) staggers children in a list. */
export default function AnimatedSection({ children, delay = 0, className = '', once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '0px 0px -80px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
