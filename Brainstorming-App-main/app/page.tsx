'use client'

import React, { useState, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Brief, Stage, Trigger, ShortlistedTrigger } from '../types';
import { INITIAL_BRIEF } from '../constants';
import { generateTriggers } from '../lib/geminiService';
import BriefForm from '../components/BriefForm';
import EngineLoading from '../components/EngineLoading';
import TriggerBoard from '../components/TriggerBoard';
import Workshop from '../components/Workshop';
import BriefViewer from '../components/BriefViewer';
import { DocumentIcon } from '../components/icons';

export default function Home() {
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
    <main className="min-h-screen text-slate-200 flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
      {stage !== Stage.BRIEF && (
        <button
          onClick={() => setIsBriefVisible(true)}
          className="fixed top-4 right-4 z-50 bg-slate-700/80 backdrop-blur-sm p-3 rounded-full text-slate-300 hover:text-white hover:bg-slate-600 transition-colors"
          aria-label="View Brief"
        >
          <DocumentIcon className="w-6 h-6" />
        </button>
      )}
      <AnimatePresence>
        {isBriefVisible && <BriefViewer brief={brief} onClose={() => setIsBriefVisible(false)} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          variants={stageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="w-full max-w-7xl mx-auto"
        >
          {renderStage()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
