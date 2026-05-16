import { ExternalLink, Image, Eye } from 'lucide-react';
import { useState } from 'react';
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';
import AnimatedSection from '../ui/AnimatedSection';
import TryImg from '../ui/TryImg';
import { blogPosts } from '../../data/blogPosts';
import { pub } from '../../utils/asset';

/* Per-platform styles — pill badge, content tags, and CTA button */
const PLATFORM = {
  'Hackster.io': {
    pill:    'bg-orange-500/15 text-orange-300/80 border-orange-500/25',
    tag:     'bg-orange-500/8 border-orange-500/20 text-orange-300/70',
    btnVariant: 'orange',
    btnLabel: 'Read on Hackster.io',
  },
  'Arduino Project Hub': {
    pill:    'bg-yellow-400/10 text-yellow-300/80 border-yellow-400/25',
    tag:     'bg-yellow-400/8 border-yellow-300/20 text-yellow-300/70',
    btnVariant: 'yellow',
    btnLabel: 'Read on Arduino Hub',
  },
};

function BlogCard({ post, index }) {
  const [imgError, setImgError] = useState(false);
  const p = PLATFORM[post.source] ?? PLATFORM['Hackster.io'];

  return (
    <AnimatedSection delay={index * 0.06}>
      <GlassCard className="flex flex-col h-full group overflow-hidden border border-neon-purple/15 hover-glow-purple">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-dark-surface to-dark-bg overflow-hidden">
          {!imgError ? (
            <TryImg
              src={pub(post.thumbnail)}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onGiveUp={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 gap-2">
              <Image size={32} strokeWidth={1} />
              <span className="text-xs font-mono">thumbnail coming soon</span>
            </div>
          )}

          {/* Source platform badge */}
          <span className={`absolute bottom-3 left-3 text-xs font-mono px-2 py-0.5 rounded-full border ${p.pill}`}>
            {post.source}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <h3 className="font-bold text-slate-100 text-sm leading-snug group-hover:text-neon-purple/80 transition-colors duration-200">
            {post.title}
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed flex-1">{post.blurb}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map(tag => (
              <span
                key={tag}
                className={`font-mono text-xs px-2 py-0.5 rounded-full border ${p.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <NeonButton href={post.readMoreUrl} variant={p.btnVariant} className="w-full justify-center mt-1">
            <ExternalLink size={13} />
            {p.btnLabel}
          </NeonButton>
        </div>
      </GlassCard>
    </AnimatedSection>
  );
}

export default function BlogGrid() {
  const hacksterCount = blogPosts.filter(p => p.source === 'Hackster.io').length;
  const arduinoCount  = blogPosts.filter(p => p.source === 'Arduino Project Hub').length;

  return (
    <div>
      {/* 68k+ views banner */}
      <div className="glass rounded-xl px-5 py-3.5 mb-6 flex flex-wrap items-center gap-3 border border-neon-purple/15">
        <div className="flex items-center gap-2">
          <Eye size={15} className="text-neon-purple/60 flex-shrink-0" />
          <span className="text-slate-300 font-semibold text-sm">75k+</span>
          <span className="text-slate-500 text-sm">combined views to date</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 text-xs font-mono ml-auto">
          <span>{hacksterCount} on Hackster.io</span>
          <span>·</span>
          <span>{arduinoCount} on Arduino Project Hub</span>
        </div>
      </div>

      {/* Source legend */}
      <p className="text-slate-600 text-xs mb-5 font-mono">
        Only posts with 1,000+ views are shown. &nbsp;
        <a href="https://www.hackster.io/Uniostar"       target="_blank" rel="noopener noreferrer" className="text-orange-400/70 hover:text-orange-300 transition-colors">hackster.io/Uniostar</a>
        &nbsp;·&nbsp;
        <a href="https://projecthub.arduino.cc/uniostar" target="_blank" rel="noopener noreferrer" className="text-yellow-400/70 hover:text-yellow-300 transition-colors">projecthub.arduino.cc/uniostar</a>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {blogPosts.map((post, i) => (
          <BlogCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </div>
  );
}
