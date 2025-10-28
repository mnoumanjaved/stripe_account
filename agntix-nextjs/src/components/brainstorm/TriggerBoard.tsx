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
      initial={{ scale: 0.95, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, x: 200, opacity: 0, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      className="absolute w-full h-full p-8 md:p-10 rounded-3xl cursor-grab flex flex-col justify-between"
      style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e5e7eb'
      }}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
            <span className="text-sm font-semibold bg-blue-500/20 text-blue-300 py-2 px-4 rounded-full">{trigger.clusterTitle}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 leading-tight">{trigger.prompt}</h2>
      </div>
      <div className="flex justify-between items-center text-sm text-slate-400 mt-6 pt-6" style={{ borderTop: '1px solid #e5e7eb' }}>
        <div className="flex items-center space-x-2 text-slate-500">
            <XMarkIcon className="w-5 h-5"/>
            <span>Dismiss</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-500">
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
    <div className="w-full flex flex-col items-center px-4">
      <header className="text-center mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100 mb-3">The Board</h1>
        <p className="text-slate-400 text-base md:text-lg">Curate your triggers. Swipe right to save, left to dismiss.</p>
      </header>

      <div className="relative w-full max-w-2xl h-96 md:h-[450px] mb-12">
        {reversedTriggers.length > 0 ? (
          reversedTriggers.map((trigger) => (
            <TriggerCard
                key={trigger.id}
                trigger={trigger}
                onSwipe={handleSwipe}
            />
          ))
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl" style={{ backgroundColor: '#ffffff', border: '2px dashed #cbd5e1' }}>
            <p className="text-2xl font-bold text-slate-400 mb-2">All triggers curated!</p>
            <p className="text-slate-500 text-lg">Ready for the workshop?</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center space-x-6">
        <button
          onClick={() => handleAction('dismiss')}
          disabled={triggers.length === 0}
          className="p-5 bg-slate-700/50 rounded-full text-red-400 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110 active:scale-95"
          aria-label="Dismiss trigger"
        >
            <XMarkIcon className="w-7 h-7"/>
        </button>
        <button
          onClick={onFinish}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl flex items-center space-x-3 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
            <span className="text-lg">Start Workshop</span>
            <ArrowRightIcon className="w-6 h-6"/>
        </button>
        <button
          onClick={() => handleAction('save')}
          disabled={triggers.length === 0}
          className="p-5 bg-slate-700/50 rounded-full text-green-400 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110 active:scale-95"
          aria-label="Save trigger"
        >
            <CheckIcon className="w-7 h-7"/>
        </button>
      </div>
    </div>
  );
};

export default TriggerBoard;
