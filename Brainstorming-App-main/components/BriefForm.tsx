'use client'

import React, { useState, useCallback } from 'react';
import { Brief, AgencyType } from '../types';
import { ArrowRightIcon, ChevronDownIcon } from './icons';

interface BriefFormProps {
  onSubmit: (brief: Brief) => void;
  initialBrief: Brief;
  error: string | null;
}

const InputField: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
}> = ({ id, label, value, onChange, required, placeholder, helperText }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{label}</label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors duration-300"
    />
    {helperText && <p className="mt-3 text-sm text-slate-500 leading-relaxed">{helperText}</p>}
  </div>
);

const TextAreaField: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  helperText?: string;
}> = ({ id, label, value, onChange, required, rows = 3, placeholder, helperText }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{label}</label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors duration-300"
    />
    {helperText && <p className="mt-3 text-sm text-slate-500 leading-relaxed">{helperText}</p>}
  </div>
);

const SelectField: React.FC<{ id: string; label: string; value: AgencyType; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; }> = ({ id, label, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{label}</label>
        <div className="relative">
            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors duration-300 appearance-none"
            >
                {Object.values(AgencyType).map(type => (
                    <option key={type} value={type} className="bg-slate-900 text-white">{type}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <ChevronDownIcon className="h-5 w-5" />
            </div>
        </div>
    </div>
);


const BriefForm: React.FC<BriefFormProps> = ({ onSubmit, initialBrief, error }) => {
  const [brief, setBrief] = useState<Brief>(initialBrief);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBrief(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(brief);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-slate-100 tracking-tighter">IDEA RIOT</h1>
        <p className="text-slate-400 mt-4 text-lg max-w-lg mx-auto">Brainstorms that defy safe thinking.</p>
      </header>
      
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-12" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        <InputField 
          id="brandProduct" 
          label="Brand / Product" 
          value={brief.brandProduct} 
          onChange={handleChange} 
          required 
          placeholder="e.g., Tesla Cybertruck, Oatly, Liquid Death, Patagonia, Airbnb Experiences"
          helperText="Be specific. Include product line or service if relevant. The more context, the sharper the triggers."
        />
        <InputField 
          id="coreChallenge" 
          label="Core Challenge" 
          value={brief.coreChallenge} 
          onChange={handleChange} 
          required 
          placeholder="e.g., Breaking into a saturated category, shifting from functional to aspirational, making B2B feel human"
          helperText="What's the ONE thing keeping you up at night? Frame it as a tension, not just a goal."
        />
        <InputField 
          id="targetAudience" 
          label="Target Audience" 
          value={brief.targetAudience} 
          onChange={handleChange} 
          required 
          placeholder="e.g., Burnt-out millennial managers, Gen Z climate activists, suburban parents rediscovering themselves"
          helperText="Go beyond demographics. What do they believe? What are they running from or toward?"
        />
        <InputField 
          id="brandTone" 
          label="Brand Tone" 
          value={brief.brandTone} 
          onChange={handleChange} 
          required 
          placeholder="e.g., Irreverent but informed, warm minimalism, rebellious optimism, technical but never cold"
          helperText="Use adjectives that capture personality, not just style. How should your brand make people feel?"
        />
        <TextAreaField 
          id="marketContext" 
          label="Audience & Market Context" 
          value={brief.marketContext} 
          onChange={handleChange} 
          required 
          rows={5}
          placeholder="e.g., Category dominated by legacy players with boring advertising. Our audience craves authenticity but distrusts 'trying too hard.' They're active on TikTok but skeptical of brand presence there. Economic uncertainty is making them more value-conscious but also craving joy."
          helperText="Share the tensions, contradictions, and cultural undercurrents. What's happening in the world that matters to your audience? What do competitors miss? What unspoken truths define your category?"
        />
        <SelectField id="agencyType" label="Agency Type" value={brief.agencyType} onChange={handleChange} />
        
        <div className="pt-4">
          <a href="http://localhost:3000/checkout" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
            <span>Ignite Ideas</span>
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      </form>
    </div>
  );
};

export default BriefForm;