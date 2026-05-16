/* Glowing neon button — toned down so it reads clearly without being blinding. */
export default function NeonButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2';

  const variants = {
    primary:
      'bg-transparent text-neon-cyan/75 border border-neon-cyan/25 hover:text-neon-cyan hover:border-neon-cyan/45 hover:shadow-neon-cyan focus-visible:ring-neon-cyan/50',
    secondary:
      'bg-transparent text-neon-purple/75 border border-neon-purple/25 hover:text-neon-purple hover:border-neon-purple/45 hover:shadow-neon-purple focus-visible:ring-neon-purple/50',
    ghost:
      'text-slate-500 border border-white/08 hover:border-white/20 hover:text-slate-300 hover:bg-white/4 focus-visible:ring-white/20',
    orange:
      'bg-transparent text-orange-400/75 border border-orange-400/30 hover:text-orange-300 hover:border-orange-400/50 focus-visible:ring-orange-400/50',
    yellow:
      'bg-transparent text-yellow-300/75 border border-yellow-300/30 hover:text-yellow-200 hover:border-yellow-300/50 focus-visible:ring-yellow-300/50',
  };

  const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cls} {...props}>
      {children}
    </button>
  );
}
