import React from 'react';
import { ShieldCheck, Lock, EyeOff, ServerOff, X, Check } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Privacy Modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 id="privacy-modal-title" className="text-xl font-black text-white">
              Your conversations are yours.
            </h3>
            <p className="text-xs text-stone-400 font-medium">
              TextCraft Privacy & Data Architecture
            </p>
          </div>
        </div>

        {/* Principles */}
        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">No Public Feeds or Profiles</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                TextCraft is a personal utility. We never share, publish, or broadcast your messages. There are no public user feeds.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 flex items-start gap-3">
            <ServerOff className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Local-Only History</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Your "Recent Replies" are stored in your device's browser localStorage. They are never sent or stored on a persistent database.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Ephemeral Processing</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Messages sent for reply generation are processed strictly in real-time memory and immediately discarded.
              </p>
            </div>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-bold text-sm transition-all cursor-pointer shadow-lg"
        >
          Got it, keep it private
        </button>

      </div>
    </div>
  );
};
