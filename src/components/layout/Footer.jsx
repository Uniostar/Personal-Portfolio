import { Github, Linkedin, Mail, Zap } from 'lucide-react';

const HOME_SECTIONS = [
  { id: 'skills',     label: 'Skills'     },
  { id: 'education',  label: 'Education'  },
  { id: 'experience', label: 'Experience' },
];

const PAGE_LINKS = [
  { to: '/projects', label: 'Projects' },
  { to: '/blog',     label: 'Blog'     },
  { to: '/contact',  label: 'Contact'  },
];

const SOCIALS = [
  { Icon: Github,   href: 'https://github.com/Uniostar',                        label: 'GitHub'   },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/aryan-kumar-65abb0245/', label: 'LinkedIn' },
  { Icon: Mail,     href: 'mailto:akvkmg2007@gmail.com',                        label: 'Email'    },
];

function isHome() {
  const hash = window.location.hash;
  const path = hash.startsWith('#') ? hash.slice(1) || '/' : '/';
  return path === '/';
}

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

export default function Footer() {
  const handlePage    = (e, to)  => { e.preventDefault(); hardNav(to); };
  const handleSection = (e, id)  => { e.preventDefault(); scrollToSection(id); };

  const linkCls = 'font-mono text-xs text-slate-500 hover:text-neon-cyan transition-colors duration-200 whitespace-nowrap';
  const dimCls  = 'font-mono text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200 whitespace-nowrap';

  return (
    <footer className="relative border-t border-white/08 bg-dark-surface">
      {/* Accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-purple/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">

        {/* Top row — brand + socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Zap size={15} className="text-neon-cyan" />
            <span className="font-mono text-sm font-bold text-white">
              AK<span className="text-neon-cyan">.</span>
            </span>
            <span className="text-slate-500 text-xs font-mono ml-2">Aryan Kumar — ECE Student</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-slate-500 hover:text-neon-cyan hover:bg-neon-cyan/10 border border-transparent hover:border-neon-cyan/20 transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav row — mirrors navbar structure */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/06 pt-6">
          {/* Home */}
          <a href="#/" onClick={e => handlePage(e, '/')} className={linkCls}>Home</a>

          {/* Section links */}
          {HOME_SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#/${id}`} onClick={e => handleSection(e, id)} className={dimCls}>
              {label}
            </a>
          ))}

          {/* Divider */}
          <span className="w-px h-3 bg-white/15 flex-shrink-0" />

          {/* Page links */}
          {PAGE_LINKS.map(({ to, label }) => (
            <a key={to} href={`#${to}`} onClick={e => handlePage(e, to)} className={linkCls}>
              {label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-slate-700 text-xs font-mono">
          © {new Date().getFullYear()} Aryan Kumar — Built with React + Tailwind
        </p>
      </div>
    </footer>
  );
}
