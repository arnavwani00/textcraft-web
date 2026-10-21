/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { SituationCards } from './components/SituationCards.tsx';
import { LiveDemo } from './components/LiveDemo.tsx';
import { Composer } from './components/Composer.tsx';
import { ResponseWorkspace } from './components/ResponseWorkspace.tsx';
import { RecentReplies } from './components/RecentReplies.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { PrivacyModal } from './components/PrivacyModal.tsx';
import { Footer } from './components/Footer.tsx';
import { 
  SituationId, 
  VibeId, 
  ReplyLength, 
  GeneratedReply, 
  StoredReply 
} from './types/index.ts';
import { generateSmartReplies, categorizeIncomingMessage } from './utils/engine.ts';
import { copyToClipboard } from './utils/clipboard.ts';

const RECENT_STORAGE_KEY = 'textcraft_recent_replies_v1';

export default function App() {
  const [message, setMessage] = useState('');
  const [situation, setSituation] = useState<SituationId>('flirting');
  const [vibe, setVibe] = useState<VibeId>('flirty');
  const [toneIntensity, setToneIntensity] = useState<number>(50);
  const [replyLength, setReplyLength] = useState<ReplyLength>('medium');
  const [context, setContext] = useState('');

  const [replies, setReplies] = useState<GeneratedReply[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStage, setLoadingStage] = useState<'idle' | 'overthinking' | 'polishing'>('idle');
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [isRegeneratingAll, setIsRegeneratingAll] = useState(false);

  const [recentReplies, setRecentReplies] = useState<StoredReply[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Load recent replies from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecentReplies(parsed);
          setSavedIds(new Set(parsed.map((p: StoredReply) => p.id)));
        }
      }
    } catch {
      // Local storage unavailable or restricted
    }
  }, []);

  // Save recent replies to localStorage
  const saveRecentToStorage = (updated: StoredReply[]) => {
    setRecentReplies(updated);
    setSavedIds(new Set(updated.map((u) => u.id)));
    try {
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated.slice(0, 30)));
    } catch {
      // Local storage write error ignore
    }
  };

  const handleSaveToRecent = (reply: GeneratedReply) => {
    if (savedIds.has(reply.id)) return;

    const newItem: StoredReply = {
      id: reply.id,
      originalMessage: message || 'Preset prompt',
      situationId: reply.situationId,
      vibeId: reply.vibeId,
      text: reply.text,
      explanation: reply.explanation,
      timestamp: Date.now(),
    };

    const updated = [newItem, ...recentReplies.filter((r) => r.id !== reply.id)];
    saveRecentToStorage(updated);
  };

  const handleSaveGenericToRecent = (
    text: string,
    vibeId: string,
    explanation: string,
    original = 'Incoming prompt'
  ) => {
    const newItem: StoredReply = {
      id: `saved-${Date.now()}`,
      originalMessage: original,
      situationId: situation,
      vibeId: (vibeId as VibeId) || 'casual',
      text,
      explanation,
      timestamp: Date.now(),
    };
    const updated = [newItem, ...recentReplies.filter((r) => r.text !== text)];
    saveRecentToStorage(updated);
  };

  const handleDeleteRecent = (id: string) => {
    const updated = recentReplies.filter((r) => r.id !== id);
    saveRecentToStorage(updated);
  };

  const handleClearAllRecent = () => {
    saveRecentToStorage([]);
  };

  const handleReuseRecent = (item: StoredReply) => {
    setMessage(item.originalMessage);
    setSituation(item.situationId);
    setVibe(item.vibeId);
    scrollToSection('composer');
  };

  // Scroll helpers
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Main Generation Handler
  const handleGenerate = async () => {
    if (!message.trim()) return;

    setIsGenerating(true);
    setLoadingStage('overthinking');

    // Smooth stage transition
    const stageTimer = setTimeout(() => {
      setLoadingStage('polishing');
    }, 450);

    try {
      // First attempt server-side proxy
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          situation,
          vibe,
          toneIntensity,
          length: replyLength,
          context: context.trim() || undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.replies) && data.replies.length > 0) {
          setReplies(data.replies);
          setTimeout(() => scrollToSection('results'), 200);
          return;
        }
      }
    } catch {
      // Network or API failure: fallback directly to smart local engine
    } finally {
      clearTimeout(stageTimer);
    }

    // High quality offline fallback synthesis
    const localReplies = generateSmartReplies({
      incoming: message.trim(),
      situation,
      vibe,
      intensity: toneIntensity,
      length: replyLength,
      context: context.trim() || undefined,
    });

    setReplies(localReplies);
    setIsGenerating(false);
    setLoadingStage('idle');
    setTimeout(() => scrollToSection('results'), 200);
  };

  // Update text for single reply after user edit
  const handleUpdateText = (id: string, newText: string) => {
    setReplies((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, text: newText, isCustomEdited: true } : r
      )
    );
  };

  // Regenerate single reply card
  const handleRegenerateSingle = (id: string) => {
    setRegeneratingId(id);
    setTimeout(() => {
      const freshOptions = generateSmartReplies({
        incoming: message.trim() || 'Prompt',
        situation,
        vibe,
        intensity: toneIntensity,
        length: replyLength,
        context: context.trim() || undefined,
      });

      // Find an option not currently displayed
      const currentTexts = new Set(replies.map((r) => r.text));
      const alternative = freshOptions.find((o) => !currentTexts.has(o.text)) || freshOptions[0];

      if (alternative) {
        setReplies((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  id: `reply-${Date.now()}`,
                  text: alternative.text,
                  explanation: alternative.explanation,
                  toneScore: alternative.toneScore,
                  isCustomEdited: false,
                }
              : r
          )
        );
      }
      setRegeneratingId(null);
    }, 400);
  };

  // Regenerate all options
  const handleRegenerateAll = () => {
    setIsRegeneratingAll(true);
    setTimeout(() => {
      const fresh = generateSmartReplies({
        incoming: message.trim(),
        situation,
        vibe,
        intensity: toneIntensity,
        length: replyLength,
        context: context.trim() || undefined,
      });
      setReplies(fresh);
      setIsRegeneratingAll(false);
    }, 500);
  };

  // Quick action from Situation Cards
  const handleSelectSituationFromCard = (sitId: SituationId) => {
    setSituation(sitId);
    scrollToSection('composer');
  };

  // Quick action from Live Demo
  const handleTryDemoMessageInComposer = (incoming: string, demoVibe: VibeId) => {
    setMessage(incoming);
    setVibe(demoVibe);
    const suggestedSituation = categorizeIncomingMessage(incoming);
    setSituation(suggestedSituation);
    scrollToSection('composer');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-stone-950">
      
      {/* Top Navigation */}
      <Header
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onScrollToComposer={() => scrollToSection('composer')}
        onScrollToDemo={() => scrollToSection('demo')}
        onScrollToSituations={() => scrollToSection('situations')}
        recentCount={recentReplies.length}
        onOpenRecent={() => scrollToSection('recent')}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onStartReplying={() => scrollToSection('composer')}
          onSeeHowItWorks={() => scrollToSection('how-it-works')}
          onSaveToRecent={(text, vibe, exp) => handleSaveGenericToRecent(text, vibe, exp, 'So are you actually coming or not?')}
        />

        {/* 2. Situation Section ("WHAT KIND OF MESS ARE YOU IN?") */}
        <SituationCards
          selectedSituation={situation}
          onSelectSituation={handleSelectSituationFromCard}
        />

        {/* 3. Main Response Studio ("DROP THE MESSAGE.") */}
        <Composer
          message={message}
          setMessage={setMessage}
          situation={situation}
          setSituation={setSituation}
          vibe={vibe}
          setVibe={setVibe}
          toneIntensity={toneIntensity}
          setToneIntensity={setToneIntensity}
          replyLength={replyLength}
          setReplyLength={setReplyLength}
          context={context}
          setContext={setContext}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          loadingStage={loadingStage}
        />

        {/* 4. Generated Response Workspace ("HERE’S WHAT YOU COULD SAY.") */}
        <ResponseWorkspace
          originalMessage={message}
          situation={situation}
          vibe={vibe}
          replies={replies}
          onUpdateText={handleUpdateText}
          onRegenerateSingle={handleRegenerateSingle}
          onRegenerateAll={handleRegenerateAll}
          isRegeneratingAll={isRegeneratingAll}
          regeneratingId={regeneratingId}
          onSaveToRecent={handleSaveToRecent}
          savedIds={savedIds}
        />

        {/* 5. Live Demo Section */}
        <LiveDemo
          onTryCustomMessage={handleTryDemoMessageInComposer}
          onSaveToRecent={(text, vibe, exp, incoming) => handleSaveGenericToRecent(text, vibe, exp, incoming)}
        />

        {/* 6. How It Works ("THREE STEPS. NO OVERTHINKING.") */}
        <HowItWorks />

        {/* 7. Recent Replies (Local Browser Storage) */}
        <RecentReplies
          recentReplies={recentReplies}
          onCopyReply={(text) => copyToClipboard(text)}
          onDeleteReply={handleDeleteRecent}
          onClearAll={handleClearAllRecent}
          onReuseReply={handleReuseRecent}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onScrollToSituations={() => scrollToSection('situations')}
        onScrollToDemo={() => scrollToSection('demo')}
        onScrollToComposer={() => scrollToSection('composer')}
      />

      {/* Privacy Guarantee Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

    </div>
  );
}
