'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOADING_MESSAGES } from '@/lib/brainstorm/constants';

const EngineLoading: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % LOADING_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
        className="w-24 h-24 md:w-32 md:h-32 mb-8"
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path d="M50 0V15" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }} />
            <motion.path d="M50 85V100" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} />
            <motion.path d="M100 50H85" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
            <motion.path d="M15 50H0" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
            <motion.path d="M85.3553 14.6447L74.7487 25.2513" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
            <motion.path d="M25.2513 74.7487L14.6447 85.3553" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
            <motion.path d="M85.3553 85.3553L74.7487 74.7487" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
            <motion.path d="M25.2513 25.2513L14.6447 14.6447" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#38bdf8', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity:1}} />
                </linearGradient>
            </defs>
        </svg>
      </motion.div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-4">Firing up the engine...</h2>
      <div className="h-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-blue-400"
          >
            {LOADING_MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EngineLoading;
