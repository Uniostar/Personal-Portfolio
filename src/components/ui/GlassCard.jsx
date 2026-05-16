/* Reusable glassmorphism card container.
   Accepts className overrides and all standard div props. */
export default function GlassCard({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={[
        'glass rounded-2xl',
        hover ? 'hover-glow-cyan transition-all duration-300' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
