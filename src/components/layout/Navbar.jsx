import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

/* Home-page section anchors in scroll order */
const HOME_SECTIONS = [
  { id: 'skills',     label: 'Skills'     },
  { id: 'education',  label: 'Education'  },
  { id: 'experience', label: 'Experience' },
];

/* Top-level page links */
const PAGE_LINKS = [
  { to: '/projects', label: 'Projects' },
  { to: '/blog',     label: 'Blog'     },
  { to: '/contact',  label: 'Contact'  },
];

function currentPath() {
  const hash = window.location.hash;
  return hash.startsWith('#') ? hash.slice(1) || '/' : '/';
}

function isHome() { return currentPath() === '/'; }

function hardNav(to) {
  window.location.hash = to;
  window.location.reload();
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    sessionStorage.setItem('scrollTo', id);
    hardNav('/');
  }
}

/* Unified link class — same size/weight for all nav items */
function linkCls(active) {
  return [
    'font-display text-sm tracking-wide transition-colors duration-200 whitespace-nowrap',
    active ? 'text-neon-cyan' : 'text-slate-400 hover:text-white',
  ].join(' ');
}

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [open, setOpen]                   = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const onHome = isHome();

  /* Scroll spy — detects which home section is currently in view */
  useEffect(() => {
    if (!onHome) { setActiveSection(null); return; }

    const update = () => {
      if (window.scrollY < 180) { setActiveSection(null); return; }
      let current = null;
      for (const { id } of HOME_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 130) current = id;
      }
      setActiveSection(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [onHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const homeActive    = onHome && !activeSection;
  const pageActive    = (to) => currentPath().startsWith(to);

  const handlePage = (e, to) => { e.preventDefault(); setOpen(false); hardNav(to); };
  const handleSection = (e, id) => { e.preventDefault(); setOpen(false); scrollToSection(id); };

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'py-3 glass border-b border-white/10 shadow-glass' : 'py-5 bg-transparent',
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo mark — visual identity, not a nav link */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Zap size={18} className="text-neon-cyan" />
          <span className="font-display text-white tracking-widest text-lg">
            AK<span className="text-neon-cyan">.</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {/* Home */}
          <a href="#/" onClick={e => handlePage(e, '/')} className={linkCls(homeActive)}>
            Home
          </a>

          {/* Section links (same styling as page links) */}
          {HOME_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#/${id}`}
              onClick={e => handleSection(e, id)}
              className={linkCls(activeSection === id)}
            >
              {label}
            </a>
          ))}

          {/* Divider line */}
          <span className="w-px h-5 bg-white/20 flex-shrink-0" />

          {/* Page links */}
          {PAGE_LINKS.map(({ to, label }) => (
            <a
              key={to}
              href={`#${to}`}
              onClick={e => handlePage(e, to)}
              className={linkCls(pageActive(to))}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(p => !p)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              <a href="#/" onClick={e => handlePage(e, '/')} className={linkCls(homeActive)}>
                Home
              </a>
              {HOME_SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#/${id}`}
                  onClick={e => handleSection(e, id)}
                  className={linkCls(activeSection === id)}
                >
                  {label}
                </a>
              ))}
              <div className="w-full h-px bg-white/20" />
              {PAGE_LINKS.map(({ to, label }) => (
                <a
                  key={to}
                  href={`#${to}`}
                  onClick={e => handlePage(e, to)}
                  className={linkCls(pageActive(to))}
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
