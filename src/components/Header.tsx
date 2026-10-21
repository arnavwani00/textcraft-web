import React from 'react';
import { MessageSquare, Sparkles, History, ShieldCheck, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenPrivacy: () => void;
  onScrollToComposer: () => void;
  onScrollToDemo: () => void;
  onScrollToSituations: () => void;
  recentCount: number;
  onOpenRecent: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPrivacy,
  onScrollToComposer,
  onScrollToDemo,
  onScrollToSituations,
  recentCount,
  onOpenRecent,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-950/80 border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
          aria-label="TextCraft Home"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
            <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold tracking-tighter text-emerald-400 text-sm font-mono">TC</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                TextCraft
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                v1.0
              </span>
            </div>
            <span className="hidden md:inline-block text-[11px] text-stone-400 font-medium">
              Paste the text. Pick the vibe. Get the reply.
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-300">
          <button 
            onClick={onScrollToSituations}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Situations
          </button>
          <button 
            onClick={onScrollToDemo}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Live Demo
          </button>
          <button 
            onClick={onOpenPrivacy}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Private</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {recentCount > 0 && (
            <button
              onClick={onOpenRecent}
              aria-label={`View ${recentCount} saved recent replies`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-xs font-medium text-stone-300 hover:text-white hover:border-stone-700 transition-all cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-emerald-400" />
              <span>Recent</span>
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-bold">
                {recentCount}
              </span>
            </button>
          )}

          <button
            onClick={onScrollToComposer}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Reply Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
