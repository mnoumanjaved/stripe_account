'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Brief, AgencyType } from '@/lib/brainstorm/types';
import { XMarkIcon } from './icons';

interface BriefViewerProps {
  brief: Brief;
  onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value: string | AgencyType }> = ({ label, value }) => (
    <div>
        <h3 className="text-sm font-semibold text-blue-400 mb-1">{label}</h3>
        <p className="text-slate-300 whitespace-pre-wrap">{value}</p>
    </div>
);

const BriefViewer: React.FC<BriefViewerProps> = ({ brief, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-slate-800/80 border border-slate-700 rounded-xl w-full max-w-2xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-100">Project Brief</h2>
                <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="space-y-6">
                <DetailItem label="Brand / Product" value={brief.brandProduct} />
                <DetailItem label="Core Challenge" value={brief.coreChallenge} />
                <DetailItem label="Target Audience" value={brief.targetAudience} />
                <DetailItem label="Brand Tone" value={brief.brandTone} />
                <DetailItem label="Audience & Market Context" value={brief.marketContext} />
                <DetailItem label="Agency Type" value={brief.agencyType} />
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BriefViewer;
