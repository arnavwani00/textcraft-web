import React from 'react';
import { Clipboard, Sliders, SendHorizontal, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'PASTE',
      subtitle: 'Paste the message you received.',
      desc: 'Got hit with an awkward text, dry one-liner, or tricky boss request? Drop it into TextCraft without overthinking.',
      icon: <Clipboard className="w-6 h-6 text-emerald-400" />,
      accent: 'border-emerald-500/30 bg-emerald-500/5',
    },
    {
      step: '02',
      title: 'PICK THE VIBE',
      subtitle: 'Choose how you want to sound.',
      desc: 'Select from Casual, Funny, Cold, Flirty, Direct, or Polite. Adjust the Soft-to-Direct slider to calibrate exact intensity.',
      icon: <Sliders className="w-6 h-6 text-teal-400" />,
      accent: 'border-teal-500/30 bg-teal-500/5',
    },
    {
      step: '03',
      title: 'SEND IT',
      subtitle: 'Copy the reply and send it.',
      desc: 'Get 3 to 5 realistic options with "Why this works" tactical explanations. 1-click copy directly to WhatsApp, iMessage, or DMs.',
      icon: <SendHorizontal className="w-6 h-6 text-sky-400" />,
      accent: 'border-sky-500/30 bg-sky-500/5',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-t border-stone-800/80 bg-stone-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            THREE STEPS. NO OVERTHINKING.
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Stop staring at the blinking cursor for 20 minutes. Here is how TextCraft works.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, index) => (
            <div
              key={s.step}
              className={`relative rounded-3xl border ${s.accent} p-8 flex flex-col justify-between backdrop-blur-sm group hover:-translate-y-1 transition-all duration-300`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="text-3xl font-black font-mono text-stone-700 group-hover:text-stone-500 transition-colors">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white tracking-tight mb-1">
                  {s.title}
                </h3>
                <p className="text-sm font-bold text-emerald-400 mb-3">
                  {s.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/60 flex items-center gap-2 text-xs font-medium text-stone-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant & Effortless</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
