import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowDown, Check, Copy, MessageCircle, Play } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard.ts';

interface HeroProps {
  onStartReplying: () => void;
  onSeeHowItWorks: () => void;
  onSaveToRecent?: (text: string, vibe: string, explanation: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onStartReplying, 
  onSeeHowItWorks,
  onSaveToRecent,
}) => {
  const [activeVibeIndex, setActiveVibeIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const sampleReplies = [
    {
      vibe: 'Casual',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      text: "Yeah, I'll be there around 9!",
      explanation: 'Friendly and low-pressure without overexplaining.',
    },
    {
      vibe: 'Funny',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      text: 'Depends. Is there food, or am I surviving on small talk?',
      explanation: 'Playfully defuses the demand with cheeky humor.',
    },
    {
      vibe: 'Cold',
      badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
      text: 'Probably not.',
      explanation: 'Clear detachment that leaves zero room for guilt-tripping.',
    },
    {
      vibe: 'Flirty',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      text: 'Only if you save a spot right next to you.',
      explanation: 'Turns an RSVP into tension and gives them the next move.',
    },
  ];

  // Auto-cycle through vibes every 4 seconds if untouched
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVibeIndex((prev) => (prev + 1) % sampleReplies.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [sampleReplies.length]);

  const handleCopyHero = async (text: string, index: number) => {
    await copyToClipboard(text);
    setCopiedIndex(index);
    if (onSaveToRecent) {
      onSaveToRecent(
        text, 
        sampleReplies[index].vibe.toLowerCase(),
        sampleReplies[index].explanation
      );
    }
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-emerald-500/30 text-stone-300 text-xs font-semibold tracking-wide mb-6 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Paste the text. Pick the vibe. Get the reply.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6">
              HOW DO I REPLY <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                TO THIS?
              </span>
            </h1>

            {/* Core Promise Subtitle */}
            <p className="text-lg sm:text-xl text-stone-300 font-normal leading-relaxed max-w-2xl mb-8">
              You know what you want to say. <br className="hidden sm:inline" />
              <strong className="text-white font-semibold">We help you figure out how to say it.</strong>
              {' '}Whether it's an awkward crush, dry texter, tense argument, or tricky boss, TextCraft gives you instant tailored responses.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onStartReplying}
                className="group flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-black text-base tracking-wide transition-all duration-200 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>HELP ME REPLY</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onSeeHowItWorks}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-200 font-bold text-base transition-all hover:text-white cursor-pointer"
              >
                <Play className="w-4 h-4 fill-stone-300 text-stone-300" />
                <span>SEE HOW IT WORKS</span>
              </button>
            </div>

            {/* Social Proof / Relatability stats */}
            <div className="mt-10 pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-6 sm:gap-10">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-mono">100%</p>
                <p className="text-xs text-stone-400 font-medium mt-1">Private & On-Device</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">6+</p>
                <p className="text-xs text-stone-400 font-medium mt-1">Conversational Vibes</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-mono">&lt; 1s</p>
                <p className="text-xs text-stone-400 font-medium mt-1">Instant Generation</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Live Messaging Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md w-full rounded-3xl bg-stone-900/90 border border-stone-800/80 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
              
              {/* Header bar of mock chat */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-800/80 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 font-bold text-xs border border-stone-700">
                    Alex
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Alex Rivera</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[10px] text-stone-400">Received 3 mins ago</p>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded-md bg-stone-800 text-[10px] font-mono text-stone-400">
                  iMessage
                </div>
              </div>

              {/* Incoming Bubble */}
              <div className="flex flex-col items-start mb-6">
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 pl-1">
                  Incoming Message
                </span>
                <div className="relative max-w-[85%] rounded-2xl rounded-tl-sm bg-stone-800/90 border border-stone-700/60 px-4 py-3 text-stone-100 text-sm font-medium leading-relaxed shadow-sm">
                  “So are you actually coming or not?”
                </div>
              </div>

              {/* Vibe Pill Switcher */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Pick a vibe:
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium">Click to preview</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sampleReplies.map((item, idx) => (
                    <button
                      key={item.vibe}
                      onClick={() => setActiveVibeIndex(idx)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeVibeIndex === idx
                          ? 'bg-emerald-400 text-stone-950 shadow-md shadow-emerald-400/20'
                          : 'bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700'
                      }`}
                    >
                      {item.vibe}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Output Bubble */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1.5 pr-1">
                  <span className="text-[10px] text-stone-400">TextCraft Suggestion</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${sampleReplies[activeVibeIndex].badge}`}>
                    {sampleReplies[activeVibeIndex].vibe}
                  </span>
                </div>

                <div className="relative max-w-[90%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 text-sm font-medium leading-relaxed shadow-md transition-all duration-300">
                  <p>{sampleReplies[activeVibeIndex].text}</p>
                </div>

                {/* Explanation pill */}
                <div className="mt-2 text-right">
                  <p className="text-[11px] text-stone-400 italic">
                    💡 {sampleReplies[activeVibeIndex].explanation}
                  </p>
                </div>

                {/* Quick copy in hero */}
                <button
                  onClick={() => handleCopyHero(sampleReplies[activeVibeIndex].text, activeVibeIndex)}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold border border-stone-700 transition-all cursor-pointer"
                >
                  {copiedIndex === activeVibeIndex ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy reply</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live typing indicator subtle dot */}
              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Real-time response synthesis</span>
                </div>
                <span className="font-mono text-stone-400">Ready to send</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
