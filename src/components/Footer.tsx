import React from 'react';
import { ShieldCheck, Heart, Sparkles, MessageCircle, Github, Twitter } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onScrollToTop: () => void;
  onScrollToSituations: () => void;
  onScrollToDemo: () => void;
  onScrollToComposer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onScrollToTop,
  onScrollToSituations,
  onScrollToDemo,
  onScrollToComposer,
}) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] shadow-md shadow-emerald-500/20">
                <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold tracking-tighter text-emerald-400 text-xs font-mono">TC</span>
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                TextCraft
              </span>
            </div>

            <p className="text-sm font-semibold text-stone-300 mb-2">
              Paste the text. Pick the vibe. Get the reply.
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm mb-4">
              You know what you want to say. We help you figure out how to say it. Built for people who refuse to send dry "haha" texts.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero tracking • Ephemeral synthesis • On-device memory</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button onClick={onScrollToComposer} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Response Studio
                </button>
              </li>
              <li>
                <button onClick={onScrollToSituations} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Situation Catalog
                </button>
              </li>
              <li>
                <button onClick={onScrollToDemo} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Interactive Live Demo
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                  Three Steps
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Trust & Safety
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button 
                  onClick={onOpenPrivacy} 
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy & Local Storage</span>
                </button>
              </li>
              <li>
                <span className="text-stone-400">No public feed or user tracking</span>
              </li>
              <li>
                <span className="text-stone-400">De-escalation & anti-harassment safeguards</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} TextCraft. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted for smoother conversations</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
