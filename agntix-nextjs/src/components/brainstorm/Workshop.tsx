'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ShortlistedTrigger } from '@/lib/brainstorm/types';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon, ExportIcon, RestartIcon, DocumentIcon, TrashIcon } from './icons';
import { AnimatePresence, motion } from 'framer-motion';

const Timer: React.FC = () => {
    const [time, setTime] = useState(5 * 60);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isActive && time > 0) {
            intervalRef.current = window.setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (!isActive || time === 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (time === 0) setIsActive(false);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, time]);

    const handleStartPause = () => setIsActive(!isActive);
    const handleReset = () => {
        setIsActive(false);
        setTime(5 * 60);
    };

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="flex items-center space-x-3 text-slate-300">
            <span className="text-xl font-mono">{formatTime(time)}</span>
            <button onClick={handleStartPause} className="p-1 text-slate-400 hover:text-white transition">
                {isActive ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
            </button>
            <button onClick={handleReset} className="p-1 text-slate-400 hover:text-white transition">
                <RestartIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

const Workshop: React.FC<{
  shortlistedTriggers: ShortlistedTrigger[];
  onUpdateIdeas: (triggerId: string, ideas: string) => void;
  onExport: () => void;
  onRestart: () => void;
  onBackToBoard: () => void;
  onUnsave: (triggerId: string) => void;
}> = ({ shortlistedTriggers, onUpdateIdeas, onExport, onRestart, onBackToBoard, onUnsave }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [ideas, setIdeas] = useState('');

  const currentTrigger = shortlistedTriggers[currentIndex];

  useEffect(() => {
    if (currentIndex >= shortlistedTriggers.length && shortlistedTriggers.length > 0) {
        setCurrentIndex(shortlistedTriggers.length - 1);
    }
  }, [shortlistedTriggers, currentIndex]);

  useEffect(() => {
    if (currentTrigger) {
        setIdeas(currentTrigger.ideas);
    } else if (shortlistedTriggers.length === 0) {
        setIdeas('');
    }
  }, [currentTrigger, shortlistedTriggers.length]);

  const handleSave = useCallback(() => {
    if (currentTrigger) {
        onUpdateIdeas(currentTrigger.id, ideas);
    }
  }, [currentTrigger, ideas, onUpdateIdeas]);

  const navigate = (newDirection: number) => {
    if (currentTrigger) onUpdateIdeas(currentTrigger.id, ideas);
    setDirection(newDirection);
    setCurrentIndex(prev => {
        const nextIndex = prev + newDirection;
        if (nextIndex < 0) return shortlistedTriggers.length - 1;
        if (nextIndex >= shortlistedTriggers.length) return 0;
        return nextIndex;
    });
  };

  const handleUnsave = () => {
    if (currentTrigger) {
        onUnsave(currentTrigger.id);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction === 0 ? '0%' : (direction > 0 ? '100%' : '-100%'),
      opacity: 0, scale: 0.8,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0, scale: 0.8,
    }),
  };

  if (shortlistedTriggers.length === 0) {
    return (
        <div className="text-center flex flex-col items-center justify-center min-h-[80vh]">
            <h2 className="text-2xl font-bold text-slate-300">Your workshop is empty.</h2>
            <p className="text-slate-400 mt-2">Go back to the board to select some triggers.</p>
            <button onClick={onBackToBoard} className="mt-6 flex items-center space-x-2 text-white font-semibold transition-colors py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700">
                <ChevronLeftIcon className="w-5 h-5"/>
                <span>Back to Board</span>
            </button>
        </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col min-h-[80vh]">
        <div className="mb-6 flex justify-between items-center">
             <button
                onClick={onBackToBoard}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors py-2 px-4 rounded-md bg-slate-700/50 hover:bg-slate-700"
            >
                <ChevronLeftIcon className="w-5 h-5"/>
                <span>Back to Board</span>
            </button>
        </div>
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-lg flex flex-col">
                <div className="flex-grow relative overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex} custom={direction} variants={slideVariants}
                            initial="enter" animate="center" exit="exit"
                            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
                            className="absolute inset-0 flex items-center justify-center p-4"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-100">{currentTrigger.prompt}</h2>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="flex justify-between items-center pt-6 mt-6 border-t border-slate-700/50">
                    <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors py-2 px-4 rounded-md bg-slate-700/50 hover:bg-slate-700">
                        <ChevronLeftIcon className="w-5 h-5"/>
                        <span>Back</span>
                    </button>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-slate-400">
                            {currentIndex + 1} / {shortlistedTriggers.length}
                        </span>
                         <button onClick={handleUnsave} title="Unsave Trigger" className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-full hover:bg-red-500/10">
                            <TrashIcon className="w-5 h-5"/>
                        </button>
                    </div>
                     <button onClick={() => navigate(1)} className="flex items-center space-x-2 text-white font-semibold transition-colors py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700">
                        <span>Next</span>
                        <ChevronRightIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>

            <div className="flex flex-col bg-slate-800/50 p-8 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-100">Ideas</h2>
                    <Timer />
                </div>
                <textarea
                    id="ideas" value={ideas} onChange={(e) => setIdeas(e.target.value)}
                    placeholder="One idea per line..."
                    className="w-full flex-grow bg-slate-800 border border-slate-700 rounded-lg p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                />
                <div className="flex items-center space-x-4 mt-6">
                    <button onClick={handleSave} className="flex-1 flex items-center justify-center space-x-2 text-slate-200 font-semibold transition-colors py-3 px-4 rounded-md bg-slate-700 hover:bg-slate-600">
                        <DocumentIcon className="w-5 h-5"/>
                        <span>Save Ideas</span>
                    </button>
                    <button onClick={onExport} className="flex-1 flex items-center justify-center space-x-2 text-white font-semibold transition-colors py-3 px-4 rounded-md bg-blue-600 hover:bg-blue-700">
                        <ExportIcon className="w-5 h-5"/>
                        <span>Export All</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Workshop;
