'use client'

import React, { useMemo } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Trigger } from '@/lib/brainstorm/types';
import { CheckIcon, XMarkIcon, ArrowRightIcon } from './icons';

interface TriggerBoardProps {
  triggers: Trigger[];
  onSave: (trigger: Trigger) => void;
  onDismiss: (trigger: Trigger) => void;
  onFinish: () => void;
}

const TriggerCard: React.FC<{
  trigger: Trigger;
  onSwipe: (direction: 'left' | 'right') => void;
}> = ({ trigger, onSwipe }) => {

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.8, x: 200, opacity: 0, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      className="absolute w-full h-full p-6 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl cursor-grab flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-semibold bg-blue-500/20 text-blue-300 py-1 px-3 rounded-full">{trigger.clusterTitle}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100">{trigger.prompt}</h2>
      </div>
      <div className="flex justify-between items-center text-sm text-slate-500 mt-4">
        <div className="flex items-center space-x-2">
            <XMarkIcon className="w-5 h-5"/>
            <span>Dismiss</span>
        </div>
        <div className="flex items-center space-x-2">
            <span>Save</span>
            <CheckIcon className="w-5 h-5"/>
        </div>
      </div>
    </motion.div>
  );
};

const TriggerBoard: React.FC<TriggerBoardProps> = ({ triggers, onSave, onDismiss, onFinish }) => {

  const handleAction = (action: 'save' | 'dismiss') => {
    if (triggers.length === 0) return;
    const currentTrigger = triggers[triggers.length - 1];
    if (action === 'save') {
      onSave(currentTrigger);
    } else {
      onDismiss(currentTrigger);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    handleAction(direction === 'right' ? 'save' : 'dismiss');
  };

  const reversedTriggers = useMemo(() => [...triggers], [triggers]);

  return (
    <div className="w-full flex flex-col items-center">
      <header className="text-center mb-8 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100">The Board</h1>
        <p className="text-slate-400 mt-2">Curate your triggers. Swipe right to save, left to dismiss.</p>
      </header>

      <div className="relative w-full max-w-lg h-80 mb-8">
        {reversedTriggers.length > 0 ? (
          reversedTriggers.map((trigger) => (
            <TriggerCard
                key={trigger.id}
                trigger={trigger}
                onSwipe={handleSwipe}
            />
          ))
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 border-2 border-dashed border-slate-700 rounded-2xl">
            <p className="text-xl font-semibold text-slate-400">All triggers curated!</p>
            <p className="text-slate-500">Ready for the workshop?</p>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={() => handleAction('dismiss')} disabled={triggers.length === 0} className="p-4 bg-slate-700/50 rounded-full text-red-400 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform hover:scale-110">
            <XMarkIcon className="w-8 h-8"/>
        </button>
        <button onClick={onFinish} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center space-x-2 transition-colors transform hover:scale-105">
            <span>Start Workshop</span>
            <ArrowRightIcon className="w-5 h-5"/>
        </button>
        <button onClick={() => handleAction('save')} disabled={triggers.length === 0} className="p-4 bg-slate-700/50 rounded-full text-green-400 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform hover:scale-110">
            <CheckIcon className="w-8 h-8"/>
        </button>
      </div>
    </div>
  );
};

export default TriggerBoard;
