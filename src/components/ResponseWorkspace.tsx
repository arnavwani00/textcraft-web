import React from 'react';
import { Sparkles, RotateCw, CheckCircle2, MessageSquare, ArrowDown, ChevronRight } from 'lucide-react';
import { GeneratedReply, SituationId, VibeId } from '../types/index.ts';
import { ResponseCard } from './ResponseCard.tsx';
import { SITUATIONS, VIBES } from '../utils/engine.ts';

interface ResponseWorkspaceProps {
  originalMessage: string;
  situation: SituationId;
  vibe: VibeId;
  replies: GeneratedReply[];
  onUpdateText: (id: string, newText: string) => void;
  onRegenerateSingle: (id: string) => void;
  onRegenerateAll: () => void;
  isRegeneratingAll: boolean;
  regeneratingId: string | null;
  onSaveToRecent: (reply: GeneratedReply) => void;
  savedIds: Set<string>;
}

export const ResponseWorkspace: React.FC<ResponseWorkspaceProps> = ({
  originalMessage,
  situation,
  vibe,
  replies,
  onUpdateText,
  onRegenerateSingle,
  onRegenerateAll,
  isRegeneratingAll,
  regeneratingId,
  onSaveToRecent,
  savedIds,
}) => {
  if (replies.length === 0) return null;

  const currentSituation = SITUATIONS.find((s) => s.id === situation);
  const currentVibe = VIBES.find((v) => v.id === vibe);

  return (
    <section id="results" className="py-16 sm:py-24 bg-stone-950 border-t border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header of results */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-stone-800/80 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{replies.length} Tailored Replies Ready</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
              HERE’S WHAT YOU COULD SAY.
            </h2>

            <p className="text-stone-400 text-sm sm:text-base">
              Choose the reply that feels most true to you, or edit it right here before sending.
            </p>
          </div>

          {/* Regenerate All Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRegenerateAll}
              disabled={isRegeneratingAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs sm:text-sm font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 text-emerald-400 ${isRegeneratingAll ? 'animate-spin' : ''}`} />
              <span>Regenerate All Options</span>
            </button>
          </div>
        </div>

        {/* Original Message Banner recap */}
        <div className="mb-10 p-5 rounded-2xl bg-stone-900/50 border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center shrink-0 text-stone-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                Responding to:
              </span>
              <p className="text-stone-200 font-medium text-sm sm:text-base italic">
                “{originalMessage}”
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-md bg-stone-800 border border-stone-700 text-stone-300 text-xs font-medium">
              {currentSituation?.name}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-stone-800 border border-stone-700 text-stone-300 text-xs font-medium flex items-center gap-1">
              <span>{currentVibe?.emoji}</span>
              <span>{currentVibe?.name}</span>
            </span>
          </div>
        </div>

        {/* Responses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {replies.map((reply) => (
            <ResponseCard
              key={reply.id}
              reply={reply}
              originalMessage={originalMessage}
              onUpdateText={onUpdateText}
              onRegenerateSingle={onRegenerateSingle}
              isRegeneratingThis={regeneratingId === reply.id}
              onSaveToRecent={onSaveToRecent}
              isSaved={savedIds.has(reply.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
