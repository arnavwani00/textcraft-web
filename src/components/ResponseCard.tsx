import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Edit3, 
  RotateCw, 
  Save, 
  X, 
  Sparkles, 
  Lightbulb, 
  Share2,
  BookmarkCheck,
  Bookmark
} from 'lucide-react';
import { GeneratedReply } from '../types/index.ts';
import { VIBES, SITUATIONS } from '../utils/engine.ts';
import { copyToClipboard } from '../utils/clipboard.ts';

interface ResponseCardProps {
  reply: GeneratedReply;
  originalMessage: string;
  onUpdateText: (id: string, newText: string) => void;
  onRegenerateSingle: (id: string) => void;
  isRegeneratingThis?: boolean;
  onSaveToRecent: (reply: GeneratedReply) => void;
  isSaved?: boolean;
}

export const ResponseCard: React.FC<ResponseCardProps> = ({
  reply,
  originalMessage,
  onUpdateText,
  onRegenerateSingle,
  isRegeneratingThis = false,
  onSaveToRecent,
  isSaved = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(reply.text);

  const vibeData = VIBES.find((v) => v.id === reply.vibeId) || VIBES[0];
  const situationData = SITUATIONS.find((s) => s.id === reply.situationId);

  const handleCopy = async () => {
    await copyToClipboard(reply.text);
    setCopied(true);
    onSaveToRecent(reply); // auto-preserve recently copied reply
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onUpdateText(reply.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(reply.text);
    setIsEditing(false);
  };

  return (
    <div className="relative rounded-2xl bg-stone-900 border border-stone-800 p-5 sm:p-6 transition-all duration-300 hover:border-stone-700 shadow-xl flex flex-col justify-between group">
      
      {/* Top Header of Card */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800/80">
          <div className="flex items-center gap-2">
            <span className="text-base">{vibeData.emoji}</span>
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${vibeData.colorClass}`}>
              {vibeData.name} Angle
            </span>
            {reply.isCustomEdited && (
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                Custom Edited
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSaveToRecent(reply)}
              title={isSaved ? "Saved to recent" : "Save to recent"}
              aria-label={isSaved ? "Saved to recent" : "Save to recent"}
              className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-400 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-emerald-400" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <span className="text-[10px] font-mono text-stone-400 px-2 py-0.5 rounded bg-stone-950 border border-stone-800">
              Tone: {reply.toneScore}% Direct
            </span>
          </div>
        </div>

        {/* Message Bubble Body */}
        {isEditing ? (
          <div className="space-y-3 mb-4">
            <textarea
              rows={3}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-3 rounded-xl bg-stone-950 border border-emerald-500/60 text-white text-base focus:outline-none leading-relaxed"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-stone-950 text-xs font-bold cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative mb-5">
            <div className="rounded-2xl rounded-tr-sm bg-gradient-to-tr from-stone-950 to-stone-900 border border-stone-800/80 p-4 sm:p-5 shadow-inner">
              <p className="text-white text-base sm:text-lg font-medium leading-relaxed tracking-tight">
                "{reply.text}"
              </p>
            </div>
          </div>
        )}

        {/* Why this works insight pill */}
        <div className="mb-5 flex items-start gap-2 bg-stone-950/60 rounded-xl p-3 border border-stone-800/60">
          <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-stone-300">
            <span className="font-bold text-white mr-1">Why this works:</span>
            <span>{reply.explanation}</span>
          </div>
        </div>
      </div>

      {/* Card Action Buttons: Copy, Edit, Try Again */}
      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800/70 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium border border-stone-700/60 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          )}

          <button
            onClick={() => onRegenerateSingle(reply.id)}
            disabled={isRegeneratingThis}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800/70 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium border border-stone-700/60 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRegeneratingThis ? 'animate-spin' : ''}`} />
            <span>Try Again</span>
          </button>
        </div>

        {/* Primary Copy Button */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-md ${
            copied
              ? 'bg-emerald-400 text-stone-950 font-black scale-105'
              : 'bg-emerald-500/10 hover:bg-emerald-400 hover:text-stone-950 text-emerald-400 border border-emerald-500/30'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-stone-950 stroke-[3]" />
              <span>COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Reply</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
