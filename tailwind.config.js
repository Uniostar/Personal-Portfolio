/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-cyan':   '#00f5ff',
        'neon-purple': '#7b2fff',
        'neon-green':  '#00ff88',
        'neon-pink':   '#ff2d78',
        'neon-orange': '#FF6B00',
        'dark-bg':     '#05050f',
        'dark-surface':'#0a0a1f',
        'dark-card':   '#0d0d24',
      },
      fontFamily: {
        mono:        ['"Roboto Mono"', 'monospace'],
        sans:        ['Inter', 'sans-serif'],
        display:     ['Monoton', 'cursive'],
        'space-mono': ['"Roboto Mono"', 'monospace'],
      },
      animation: {
        'glow-pulse':  'glowPulse 3s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'scan-line':   'scanLine 4s linear infinite',
        'blink-cursor':'blinkCursor 1s step-end infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'spin-slow':   'spin 8s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.7', filter: 'brightness(1)' },
          '50%':      { opacity: '1',   filter: 'brightness(1.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blinkCursor: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'neon-cyan':   '0 0 10px rgba(0,245,255,0.2), 0 0 28px rgba(0,245,255,0.08)',
        'neon-purple': '0 0 10px rgba(123,47,255,0.2), 0 0 28px rgba(123,47,255,0.08)',
        'neon-green':  '0 0 10px rgba(0,255,136,0.2)',
        'neon-orange': '0 0 10px rgba(255,107,0,0.2), 0 0 28px rgba(255,107,0,0.08)',
        'glass':       '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
    },
  },
  /* Safelist covers dynamic class names built from template literals at runtime.
     Without this, Tailwind's scanner won't find them and they'll be purged. */
  safelist: [
    // Text colours
    'text-neon-cyan', 'text-neon-purple', 'text-neon-green',
    'text-neon-cyan/80', 'text-neon-purple/80', 'text-neon-green/80',
    // Background colours — solid and opacity variants
    'bg-neon-cyan',    'bg-neon-cyan/8',  'bg-neon-cyan/10',  'bg-neon-cyan/20',
    'bg-neon-purple',  'bg-neon-purple/8','bg-neon-purple/10','bg-neon-purple/20',
    'bg-neon-green',   'bg-neon-green/8', 'bg-neon-green/10', 'bg-neon-green/20',
    // Border colours + opacity variants
    'border-neon-cyan/20', 'border-neon-cyan/25', 'border-neon-cyan/30', 'border-neon-cyan/40',
    'border-neon-purple/20','border-neon-purple/25','border-neon-purple/30',
    'border-neon-green/20','border-neon-green/25','border-neon-green/30',
    // Shadows (defined in theme.extend.boxShadow)
    'shadow-neon-cyan', 'shadow-neon-purple', 'shadow-neon-green',
    // Dot indicators on timeline/skills
    'w-1.5', 'h-1.5',
    // Hover glow utilities (defined in index.css but referenced dynamically)
    'hover-glow-cyan', 'hover-glow-purple',
    // Platform badge — Hackster.io orange tint
    'bg-orange-500/15', 'text-orange-300/80', 'border-orange-500/25',
    'text-orange-400/70', 'hover:text-orange-300',
    // Neon /8 tints used in experience pills and active backgrounds
    'bg-neon-cyan/8', 'bg-neon-purple/8', 'bg-neon-green/8',
    'bg-neon-cyan/5', 'bg-neon-purple/5', 'bg-neon-green/5', 'bg-neon-orange/5',
    // Active borders (higher opacity)
    'border-neon-cyan/55', 'border-neon-purple/55', 'border-neon-green/55', 'border-neon-orange/55',
    // /60 and /70 text variants
    'text-neon-cyan/70', 'text-neon-purple/70', 'text-neon-green/70',
    'text-neon-cyan/60', 'text-neon-purple/60', 'text-neon-green/60',
    // Dot colors
    'bg-neon-cyan', 'bg-neon-purple', 'bg-neon-green',
    // UT Austin burnt-orange timeline card / education section
    'bg-neon-orange/8',  'bg-neon-orange/10', 'border-neon-orange/20',
    'text-neon-orange', 'text-neon-orange/70', 'text-neon-orange/60',
    'bg-neon-orange/70', 'shadow-neon-orange', 'hover-glow-orange',
  ],
  plugins: [],
};
