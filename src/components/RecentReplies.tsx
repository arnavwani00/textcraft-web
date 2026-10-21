import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  X,
  Clock
} from 'lucide-react';
import { StoredReply } from '../types/index.ts';
import { SITUATIONS, VIBES } from '../utils/engine.ts';
import { copyToClipboard } from '../utils/clipboard.ts';

interface RecentRepliesProps {
  recentReplies: StoredReply[];
  onCopyReply: (text: string) => void;
  onDeleteReply: (id: string) => void;
  onClearAll: () => void;
  onReuseReply: (reply: StoredReply) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const RecentReplies: React.FC<RecentRepliesProps> = ({
  recentReplies,
  onCopyReply,
  onDeleteReply,
  onClearAll,
  onReuseReply,
  isOpen = false,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    await copyToClipboard(text);
    onCopyReply(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <section id="recent" className="py-16 sm:py-24 border-t border-stone-800/80 bg-stone-950/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-stone-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-emerald-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                YOUR RECENT REPLIES
              </h2>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved locally in your browser. Never uploaded to remote servers.</span>
              </div>
            </div>
          </div>

          {recentReplies.length > 0 && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-rose-950/40 text-stone-400 hover:text-rose-300 border border-stone-800 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Empty state */}
        {recentReplies.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-stone-900/30 border border-stone-800/80">
            <Clock className="w-10 h-10 text-stone-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-300 mb-1">No saved replies yet</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Any replies you copy or bookmark will automatically be saved here so you can reuse them later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentReplies.map((item) => {
              const sit = SITUATIONS.find((s) => s.id === item.situationId);
              const vibe = VIBES.find((v) => v.id === item.vibeId);

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-stone-700 p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-stone-400">
                        {formatTime(item.timestamp)}
                      </span>
                      {sit && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-800 text-stone-300 border border-stone-700">
                          {sit.name}
                        </span>
                      )}
                      {vibe && (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${vibe.colorClass}`}>
                          {vibe.emoji} {vibe.name}
                        </span>
                      )}
                    </div>

                    <div className="mb-2">
                      <p className="text-xs text-stone-400 italic mb-1 truncate">
                        Original: “{item.originalMessage}”
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-white tracking-tight">
                        “{item.text}”
                      </p>
                    </div>

                    <p className="text-[11px] text-stone-400">
                      💡 {item.explanation}
                    </p>
                  </div>

                  {/* Actions for this saved item */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-800">
                    <button
                      onClick={() => onReuseReply(item)}
                      title="Load into composer"
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Reuse</span>
                    </button>

                    <button
                      onClick={() => handleCopy(item.id, item.text)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        copiedId === item.id
                          ? 'bg-emerald-400 text-stone-950'
                          : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                      }`}
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onDeleteReply(item.id)}
                      title="Delete saved reply"
                      aria-label="Delete saved reply"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
