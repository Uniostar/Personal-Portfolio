import { Github, Linkedin, Mail, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const SOCIALS = [
  { Icon: Github,   href: 'https://github.com/Uniostar',                            label: 'GitHub'   },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/aryan-kumar-65abb0245/',     label: 'LinkedIn' },
  { Icon: Mail,     href: 'mailto:akvkmg2007@gmail.com',                            label: 'Email'    },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/08 bg-dark-surface">
      {/* Accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-purple/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-neon-cyan" />
          <span className="font-mono text-sm font-bold text-white">
            AK<span className="text-neon-cyan">.</span>
          </span>
          <span className="text-slate-500 text-sm ml-2">Aryan Kumar — ECE Student</span>
        </div>

        {/* Nav */}
        <nav className="flex gap-6 text-sm font-mono text-slate-500">
          {['/', '/projects', '/contact'].map((to, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="hover:text-neon-cyan transition-colors duration-200"
            >
              {['home', 'projects', 'contact'][i]}
            </NavLink>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg text-slate-500 hover:text-neon-cyan hover:bg-neon-cyan/10 border border-transparent hover:border-neon-cyan/30 transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      <p className="text-center text-slate-600 text-xs pb-6 font-mono">
        © {new Date().getFullYear()} Aryan Kumar — Built with React + Tailwind
      </p>
    </footer>
  );
}
