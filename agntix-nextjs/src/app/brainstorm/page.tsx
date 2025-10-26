'use client'

import React, { useState, useCallback, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Brief, Stage, Trigger, ShortlistedTrigger } from '@/lib/brainstorm/types';
import { INITIAL_BRIEF } from '@/lib/brainstorm/constants';
import { generateTriggers } from '@/lib/brainstorm/geminiService';
import BriefForm from '@/components/brainstorm/BriefForm';
import EngineLoading from '@/components/brainstorm/EngineLoading';
import TriggerBoard from '@/components/brainstorm/TriggerBoard';
import Workshop from '@/components/brainstorm/Workshop';
import BriefViewer from '@/components/brainstorm/BriefViewer';
import { DocumentIcon } from '@/components/brainstorm/icons';
import BrainstormHeader from '@/layouts/headers/BrainstormHeader';
import CreativeAgencyFooter from '@/layouts/footers/CreativeAgencyFooter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

function BrainstormContent() {
  const searchParams = useSearchParams();
  const [stage, setStage] = useState<Stage>(Stage.BRIEF);
  const [brief, setBrief] = useState<Brief>(INITIAL_BRIEF);
  const [allTriggers, setAllTriggers] = useState<Trigger[]>([]);
  const [shortlistedTriggers, setShortlistedTriggers] = useState<ShortlistedTrigger[]>([]);
  const [dismissedTriggerIds, setDismissedTriggerIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isBriefVisible, setIsBriefVisible] = useState(false);

  const handleBriefSubmit = useCallback(async (submittedBrief: Brief) => {
    setBrief(submittedBrief);
    setIsLoading(true);
    setError(null);
    setStage(Stage.ENGINE);

    try {
      const generatedTriggers = await generateTriggers(submittedBrief);
      const triggersWithIds = generatedTriggers.flatMap(cluster =>
        cluster.prompts.map(prompt => ({
          id: crypto.randomUUID(),
          prompt,
          clusterTitle: cluster.title,
        }))
      );
      setAllTriggers(triggersWithIds);
      setShortlistedTriggers([]);
      setDismissedTriggerIds(new Set());
      setStage(Stage.BOARD);
    } catch (e) {
      const err = e as Error;
      setError(`Failed to generate ideas. ${err.message}. Please try again.`);
      setStage(Stage.BRIEF);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check for pending brainstorm session after checkout
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const paymentStatus = searchParams.get('payment');
      const sessionId = searchParams.get('session_id');

      // Handle successful payment
      if (paymentStatus === 'success' && sessionId) {
        // Clear cart from localStorage
        localStorage.removeItem('cart');

        // Remove payment params from URL without page reload
        const url = new URL(window.location.href);
        url.searchParams.delete('payment');
        url.searchParams.delete('session_id');
        window.history.replaceState({}, '', url);
      }

      const pendingBrainstorm = localStorage.getItem('brainstorm_pending');
      const savedBrief = localStorage.getItem('brainstorm_brief');

      if (pendingBrainstorm === 'true' && savedBrief) {
        try {
          const parsedBrief = JSON.parse(savedBrief);
          setBrief(parsedBrief);

          // Clear the pending flag and auto-submit
          localStorage.removeItem('brainstorm_pending');
          localStorage.removeItem('brainstorm_brief');

          // Auto-submit the brief
          setTimeout(() => {
            handleBriefSubmit(parsedBrief);
          }, 500);
        } catch (e) {
          console.error('Failed to parse saved brief:', e);
          localStorage.removeItem('brainstorm_pending');
          localStorage.removeItem('brainstorm_brief');
        }
      }
    }
  }, [handleBriefSubmit, searchParams]);

  const handleSaveTrigger = useCallback((trigger: Trigger) => {
    setShortlistedTriggers(prev => [...prev, { ...trigger, ideas: '' }]);
  }, []);

  const handleDismissTrigger = useCallback((trigger: Trigger) => {
    setDismissedTriggerIds(prev => new Set(prev).add(trigger.id));
  }, []);

  const handleUnsaveTrigger = useCallback((triggerId: string) => {
    setShortlistedTriggers(prev => prev.filter(t => t.id !== triggerId));
  }, []);

  const boardTriggers = useMemo(() =>
    allTriggers.filter(t =>
      !shortlistedTriggers.some(st => st.id === t.id) && !dismissedTriggerIds.has(t.id)
    ),
    [allTriggers, shortlistedTriggers, dismissedTriggerIds]
  );

  const handleFinishCuration = useCallback(() => {
    if (shortlistedTriggers.length > 0) {
      setStage(Stage.WORKSHOP);
    } else {
      alert("Please shortlist at least one trigger to start the workshop.");
    }
  }, [shortlistedTriggers.length]);

  const handleUpdateIdeas = useCallback((triggerId: string, ideas: string) => {
    setShortlistedTriggers(prev =>
      prev.map(t => (t.id === triggerId ? { ...t, ideas } : t))
    );
  }, []);

  const handleExport = useCallback(() => {
    const headers = ["Prompt", "Ideas", "Cluster", "Brand", "Challenge", "Audience", "Tone", "Context", "Agency Type"];
    const escapeCSV = (str: string) => `"${str.replace(/"/g, '""')}"`;
    const briefData = [
      brief.brandProduct, brief.coreChallenge, brief.targetAudience,
      brief.brandTone, brief.marketContext, brief.agencyType
    ].map(escapeCSV);
    const rows = shortlistedTriggers.map(t =>
      [escapeCSV(t.prompt), escapeCSV(t.ideas), escapeCSV(t.clusterTitle), ...briefData].join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'idea_riot_workshop.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [brief, shortlistedTriggers]);

  const handleRestart = useCallback(() => {
    setStage(Stage.BRIEF);
    setBrief(INITIAL_BRIEF);
    setAllTriggers([]);
    setShortlistedTriggers([]);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleBackToBoard = useCallback(() => setStage(Stage.BOARD), []);

  const stageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const renderStage = () => {
    switch (stage) {
      case Stage.BRIEF:
        return <BriefForm onSubmit={handleBriefSubmit} initialBrief={brief} error={error} />;
      case Stage.ENGINE:
        return <EngineLoading />;
      case Stage.BOARD:
        return <TriggerBoard triggers={boardTriggers} onSave={handleSaveTrigger} onDismiss={handleDismissTrigger} onFinish={handleFinishCuration} />;
      case Stage.WORKSHOP:
        return <Workshop
                 shortlistedTriggers={shortlistedTriggers}
                 onUpdateIdeas={handleUpdateIdeas}
                 onExport={handleExport}
                 onRestart={handleRestart}
                 onBackToBoard={handleBackToBoard}
                 onUnsave={handleUnsaveTrigger}
               />;
      default:
        return <BriefForm onSubmit={handleBriefSubmit} initialBrief={brief} error={error} />;
    }
  };

  return (
    <>
      <div id="magic-cursor">
        <div id="ball"></div>
      </div>

      <BackToTop />
      <BrainstormHeader />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="brainstorm-app">
            {stage !== Stage.BRIEF && (
              <button
                onClick={() => setIsBriefVisible(true)}
                className="fixed top-4 right-4 z-50 bg-slate-700/80 backdrop-blur-sm p-3 rounded-full text-slate-300 hover:text-white hover:bg-slate-600 transition-colors"
                aria-label="View Brief"
                style={{ top: '100px' }}
              >
                <DocumentIcon className="w-6 h-6" />
              </button>
            )}
            <AnimatePresence>
              {isBriefVisible && <BriefViewer brief={brief} onClose={() => setIsBriefVisible(false)} />}
            </AnimatePresence>

            <section className="pt-150 pb-120">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  variants={stageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="container"
                >
                  {renderStage()}
                </motion.div>
              </AnimatePresence>
            </section>
          </main>

          <CreativeAgencyFooter />
        </div>
      </div>
    </>
  );
}

export default function BrainstormPage() {
  return (
    <Suspense fallback={
      <>
        <BrainstormHeader />
        <div className="container">
          <section className="pt-150 pb-120">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Loading Brainstorming Session...</h2>
            </div>
          </section>
        </div>
        <CreativeAgencyFooter />
      </>
    }>
      <BrainstormContent />
    </Suspense>
  );
}
