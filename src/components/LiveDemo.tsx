import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Sparkles, Terminal, Sliders } from 'lucide-react';
import { DEMO_PRESETS, VIBES } from '../utils/engine.ts';
import { VibeId } from '../types/index.ts';
import { copyToClipboard } from '../utils/clipboard.ts';

interface LiveDemoProps {
  onTryCustomMessage: (incoming: string, vibe: VibeId) => void;
  onSaveToRecent?: (text: string, vibe: VibeId, explanation: string, incoming: string) => void;
}

export const LiveDemo: React.FC<LiveDemoProps> = ({ 
  onTryCustomMessage,
  onSaveToRecent,
}) => {
  const [selectedDemoKey, setSelectedDemoKey] = useState<'disappeared' | 'comingOrNot'>('disappeared');
  const [activeVibe, setActiveVibe] = useState<VibeId>('casual');
  const [copied, setCopied] = useState(false);

  const currentPreset = DEMO_PRESETS[selectedDemoKey];
  const activeResponse = currentPreset.replies[activeVibe] || currentPreset.replies.casual;
  const currentVibeData = VIBES.find((v) => v.id === activeVibe) || VIBES[0];

  const handleCopy = async () => {
    await copyToClipboard(activeResponse.reply);
    setCopied(true);
    if (onSaveToRecent) {
      onSaveToRecent(activeResponse.reply, activeVibe, activeResponse.explanation, currentPreset.incoming);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo" className="py-16 sm:py-24 bg-stone-900/30 border-t border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Playground</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            TEST-DRIVE THE VIBES
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            See how the exact same awkward incoming text completely transforms depending on which personality you select.
          </p>
        </div>

        {/* Demo Box */}
        <div className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          
          {/* Preset Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-stone-800 gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Sample scenario:
            </span>
            <div className="inline-flex rounded-xl bg-stone-950 p-1 border border-stone-800">
              <button
                onClick={() => setSelectedDemoKey('disappeared')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDemoKey === 'disappeared'
                    ? 'bg-emerald-400 text-stone-950 shadow-md shadow-emerald-400/20'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                "You disappeared for 3 days..."
              </button>
              <button
                onClick={() => setSelectedDemoKey('comingOrNot')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDemoKey === 'comingOrNot'
                    ? 'bg-emerald-400 text-stone-950 shadow-md shadow-emerald-400/20'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                "So are you coming or not?"
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Vibe Pills Grid */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                Choose Vibe:
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                {VIBES.map((v) => {
                  const isCurrent = activeVibe === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVibe(v.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-stone-800/90 border-emerald-400/80 shadow-md shadow-emerald-500/10 text-white ring-1 ring-emerald-400/40'
                          : 'bg-stone-950/60 border-stone-800/80 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      <span className="text-base">{v.emoji}</span>
                      <div className="truncate">
                        <p className="text-xs font-bold text-white">{v.name}</p>
                        <p className="text-[10px] text-stone-400 truncate">{v.tagline.split(',')[0]}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action: Use in main editor */}
              <button
                onClick={() => onTryCustomMessage(currentPreset.incoming, activeVibe)}
                className="mt-4 w-full py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span>Customize this message in full editor</span>
              </button>
            </div>

            {/* Right: Simulated Chat Bubbles */}
            <div className="lg:col-span-7 bg-stone-950 rounded-2xl border border-stone-800 p-6 flex flex-col justify-between min-h-[380px]">
              
              <div className="space-y-6">
                {/* Incoming Bubble */}
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-stone-500" />
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      They said:
                    </span>
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-stone-900 border border-stone-800 px-5 py-3.5 text-stone-200 text-sm font-medium shadow-inner">
                    “{currentPreset.incoming}”
                  </div>
                </div>

                {/* Outgoing Reply Bubble (Active Vibe) */}
                <div className="flex flex-col items-end pt-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      TextCraft ({currentVibeData.name} Mode):
                    </span>
                    <span className="text-xs">{currentVibeData.emoji}</span>
                  </div>

                  <div className="max-w-[90%] rounded-2xl rounded-tr-sm bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 text-white px-5 py-4 text-sm sm:text-base font-semibold leading-relaxed shadow-lg">
                    {activeResponse.reply}
                  </div>

                  {/* Why this works insight */}
                  <div className="mt-3 max-w-[85%] text-right bg-stone-900/70 border border-stone-800/80 rounded-xl px-3.5 py-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mr-1.5">
                      Why this works:
                    </span>
                    <span className="text-xs text-stone-300">
                      {activeResponse.explanation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-stone-800/80 flex items-center justify-between">
                <span className="text-xs text-stone-400">
                  Ready to paste into your chat
                </span>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold border border-stone-700 transition-all cursor-pointer shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-300" />
                      <span>Copy Reply</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
