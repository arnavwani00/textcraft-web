import React from 'react';
import { 
  Flame, 
  ShieldAlert, 
  Briefcase, 
  ZapOff, 
  HeartHandshake, 
  Users, 
  ArrowUpRight 
} from 'lucide-react';
import { SITUATIONS } from '../utils/engine.ts';
import { SituationId } from '../types/index.ts';

interface SituationCardsProps {
  selectedSituation: SituationId;
  onSelectSituation: (id: SituationId) => void;
}

export const SituationCards: React.FC<SituationCardsProps> = ({
  selectedSituation,
  onSelectSituation,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-rose-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-sky-400" />;
      case 'ZapOff': return <ZapOff className="w-5 h-5 text-stone-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-emerald-400" />;
      case 'Users': return <Users className="w-5 h-5 text-purple-400" />;
      default: return <Flame className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getBorderColor = (id: SituationId, isSelected: boolean) => {
    if (isSelected) return 'border-emerald-400 bg-stone-900/90 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-400/30';
    return 'border-stone-800/80 bg-stone-900/40 hover:bg-stone-900/80 hover:border-stone-700';
  };

  return (
    <section id="situations" className="py-16 sm:py-24 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span>Categories</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              WHAT KIND OF MESS ARE YOU IN?
            </h2>
          </div>
          <p className="text-stone-400 text-sm sm:text-base max-w-md mt-3 md:mt-0">
            Select your scenario. TextCraft auto-tunes conversational stakes, social dynamics, and boundary strength.
          </p>
        </div>

        {/* 6 Situation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SITUATIONS.map((sit) => {
            const isSelected = selectedSituation === sit.id;

            return (
              <button
                key={sit.id}
                onClick={() => onSelectSituation(sit.id)}
                className={`group relative text-left p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${getBorderColor(
                  sit.id,
                  isSelected
                )}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-800/90 border border-stone-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(sit.iconName)}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-stone-800 text-stone-400 border border-stone-700/60">
                      {sit.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white tracking-tight mb-1 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                    <span>{sit.name.toUpperCase()}</span>
                    <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  <p className="text-sm font-semibold text-emerald-400/90 mb-2">
                    {sit.tagline}
                  </p>

                  <p className="text-xs text-stone-400 leading-relaxed mb-4">
                    {sit.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Example message:</span>
                  <span className="text-stone-300 font-medium truncate max-w-[180px]">
                    "{sit.exampleIncoming}"
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 block animate-ping" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
