import React, { useRef } from 'react';
import { 
  Sparkles, 
  Trash2, 
  ClipboardPaste, 
  Sliders, 
  Info, 
  ChevronRight,
  Flame,
  ShieldAlert,
  Briefcase,
  ZapOff,
  HeartHandshake,
  Users
} from 'lucide-react';
import { SITUATIONS, VIBES, calculateSoftDirectMeter } from '../utils/engine.ts';
import { SituationId, VibeId, ReplyLength } from '../types/index.ts';

interface ComposerProps {
  message: string;
  setMessage: (msg: string) => void;
  situation: SituationId;
  setSituation: (s: SituationId) => void;
  vibe: VibeId;
  setVibe: (v: VibeId) => void;
  toneIntensity: number;
  setToneIntensity: (val: number) => void;
  replyLength: ReplyLength;
  setReplyLength: (len: ReplyLength) => void;
  context: string;
  setContext: (ctx: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  loadingStage: 'idle' | 'overthinking' | 'polishing';
}

export const Composer: React.FC<ComposerProps> = ({
  message,
  setMessage,
  situation,
  setSituation,
  vibe,
  setVibe,
  toneIntensity,
  setToneIntensity,
  replyLength,
  setReplyLength,
  context,
  setContext,
  onGenerate,
  isGenerating,
  loadingStage,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const toneData = calculateSoftDirectMeter(toneIntensity);

  const samplePrompts = [
    { label: 'Dating compliment', text: 'You looked really good last night btw', situation: 'flirting' as SituationId },
    { label: 'Tense invite', text: 'So are you actually coming or not?', situation: 'argument' as SituationId },
    { label: 'Weekend work', text: 'Can you finish this report over the weekend? Need it Monday 9am.', situation: 'professional' as SituationId },
    { label: 'Dead texter', text: 'k haha', situation: 'dry-texter' as SituationId },
    { label: 'Friend shade', text: 'Saw you guys hung out yesterday without telling anyone.', situation: 'friendship-drama' as SituationId },
    { label: 'Late wait', text: 'I waited almost 40 minutes for you. Could have texted.', situation: 'apology' as SituationId },
  ];

  const contextPresets = [
    'I like this person but don\'t want to seem too interested.',
    'This is my manager and I need to establish a weekend boundary.',
    'I\'m angry but I don\'t want to start another explosive fight.',
    'This is my ex and I have zero interest in getting back together.',
  ];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setMessage(text);
    } catch {
      // Fallback: focus textarea for manual paste
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (message.trim()) {
        onGenerate();
      }
    }
  };

  const getSituationIcon = (name: string) => {
    switch (name) {
      case 'flirting': return <Flame className="w-3.5 h-3.5 text-rose-400" />;
      case 'argument': return <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />;
      case 'professional': return <Briefcase className="w-3.5 h-3.5 text-sky-400" />;
      case 'dry-texter': return <ZapOff className="w-3.5 h-3.5 text-stone-400" />;
      case 'apology': return <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />;
      case 'friendship-drama': return <Users className="w-3.5 h-3.5 text-purple-400" />;
      default: return null;
    }
  };

  return (
    <section id="composer" className="py-16 sm:py-24 relative scroll-mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Response Studio</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-3">
            DROP THE MESSAGE.
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Paste what they said. We’ll figure out what you can say back.
          </p>
        </div>

        {/* Quick Sample Prompts Pills */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1">
            Try a text:
          </span>
          {samplePrompts.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setMessage(p.text);
                setSituation(p.situation);
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-all cursor-pointer truncate max-w-[260px]"
            >
              <span className="text-emerald-400 font-semibold mr-1.5">[{p.label}]</span>
              "{p.text}"
            </button>
          ))}
        </div>

        {/* The Main Composer Container */}
        <div className="rounded-3xl bg-stone-900/80 border border-stone-800/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Text Area Card */}
          <div className="relative rounded-2xl bg-stone-950 border border-stone-800 focus-within:border-emerald-500/80 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all p-4 mb-6">
            
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-800/60 text-xs">
              <span className="font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>The message you received:</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePaste}
                  aria-label="Paste from clipboard"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors cursor-pointer"
                >
                  <ClipboardPaste className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Paste</span>
                </button>
                {message && (
                  <button
                    type="button"
                    onClick={() => setMessage('')}
                    aria-label="Clear input message"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-900 hover:bg-rose-950/40 text-stone-400 hover:text-rose-300 border border-stone-800 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            <textarea
              ref={textareaRef}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste their message here... (e.g. 'So are you actually coming or not?')"
              className="w-full bg-transparent text-white placeholder-stone-400 resize-none focus:outline-none text-base sm:text-lg font-medium leading-relaxed"
            />

            <div className="flex items-center justify-between pt-2 border-t border-stone-800/40 text-xs text-stone-400">
              <span className="hidden sm:inline">
                Press <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 font-mono text-[10px]">⌘+Enter</kbd> to generate
              </span>
              <span className="font-mono ml-auto">
                {message.length} chars
              </span>
            </div>
          </div>

          {/* 1. Situation Category Selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                1. Context / Situation:
              </label>
              <span className="text-[11px] text-emerald-400 font-semibold">
                {SITUATIONS.find((s) => s.id === situation)?.tagline}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {SITUATIONS.map((sit) => {
                const isSelected = situation === sit.id;
                return (
                  <button
                    key={sit.id}
                    type="button"
                    onClick={() => setSituation(sit.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-800 border-emerald-400 text-white shadow-md shadow-emerald-500/10'
                        : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    {getSituationIcon(sit.id)}
                    <span className="text-xs font-bold truncate">{sit.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Response Vibe / Personality Selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                2. Pick the Vibe:
              </label>
              <span className="text-[11px] text-stone-400">
                {VIBES.find((v) => v.id === vibe)?.description}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {VIBES.map((v) => {
                const isSelected = vibe === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVibe(v.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-800 border-emerald-400 text-white ring-1 ring-emerald-400 shadow-md'
                        : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-xl">{v.emoji}</span>
                    <div className="truncate">
                      <p className="text-xs font-extrabold text-white">{v.name}</p>
                      <p className="text-[10px] text-stone-400 truncate">{v.tagline.split(',')[0]}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Controls Grid: Tone Slider & Reply Length */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 rounded-2xl bg-stone-950 border border-stone-800 mb-8">
            
            {/* Tone Slider: SOFT <--> DIRECT */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Response Tone Intensity:</span>
                </label>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${toneData.badgeColor}`}>
                  {toneData.label} ({toneIntensity}%)
                </span>
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={toneIntensity}
                  onChange={(e) => setToneIntensity(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  aria-label="Tone slider from Soft to Direct"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>SOFT (Gentle)</span>
                  <span>BALANCED</span>
                  <span>DIRECT (Blunt)</span>
                </div>
              </div>
            </div>

            {/* Length Control: Short, Medium, Detailed */}
            <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone-800 pt-4 md:pt-0 md:pl-6">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                Reply Length:
              </label>
              
              <div className="grid grid-cols-3 gap-1.5">
                {(['short', 'medium', 'detailed'] as ReplyLength[]).map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setReplyLength(len)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                      replyLength === len
                        ? 'bg-emerald-400 text-stone-950 shadow-md font-black'
                        : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-stone-400 mt-2">
                {replyLength === 'short' && '1 crisp, punchy sentence'}
                {replyLength === 'medium' && '1-2 natural sentences'}
                {replyLength === 'detailed' && 'Thoughtful explanation'}
              </p>
            </div>

          </div>

          {/* 4. Optional Context Field */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-stone-400" />
                <span>Give us some context (Optional):</span>
              </label>
              <span className="text-[11px] text-stone-400">Better backstory = sharper replies</span>
            </div>

            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Ex. This is my ex and I don’t want to get back together."
              className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 focus:border-emerald-500/80 focus:outline-none text-sm text-white placeholder-stone-400 font-medium"
            />

            {/* Context chip suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {contextPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setContext(preset)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800/80 text-stone-400 hover:text-stone-300 transition-colors cursor-pointer truncate max-w-full"
                >
                  + "{preset}"
                </button>
              ))}
            </div>
          </div>

          {/* 5. Big Submit CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              disabled={isGenerating || !message.trim()}
              onClick={onGenerate}
              className={`w-full py-4 px-8 rounded-2xl font-black text-base sm:text-lg tracking-wide flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-xl ${
                !message.trim()
                  ? 'bg-stone-800 text-stone-400 cursor-not-allowed border border-stone-700'
                  : isGenerating
                  ? 'bg-emerald-500/80 text-stone-950 animate-pulse'
                  : 'bg-emerald-400 hover:bg-emerald-300 text-stone-950 shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5'
              }`}
            >
              <Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>
                {isGenerating
                  ? loadingStage === 'overthinking'
                    ? 'TextCraft is overthinking this for you...'
                    : 'Found a better reply...'
                  : 'GENERATE REPLIES'}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
