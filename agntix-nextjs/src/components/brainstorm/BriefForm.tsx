'use client'

import React, { useState, useCallback } from 'react';
import { Brief, AgencyType } from '@/lib/brainstorm/types';

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
  <div className="mb-30">
    <label htmlFor={id} className="form-label text-uppercase fw-bold text-black mb-15">{label}</label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="form-control"
    />
    {helperText && <p className="mt-10 text-muted small">{helperText}</p>}
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
  <div className="mb-30">
    <label htmlFor={id} className="form-label text-uppercase fw-bold text-black mb-15">{label}</label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      placeholder={placeholder}
      className="form-control"
    />
    {helperText && <p className="mt-10 text-muted small">{helperText}</p>}
  </div>
);

const SelectField: React.FC<{ id: string; label: string; value: AgencyType; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; }> = ({ id, label, value, onChange }) => (
    <div className="mb-30">
        <label htmlFor={id} className="form-label text-uppercase fw-bold text-black mb-15">{label}</label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="form-select"
        >
            {Object.values(AgencyType).map(type => (
                <option key={type} value={type}>{type}</option>
            ))}
        </select>
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
    // Store brief data in localStorage for after checkout
    if (typeof window !== 'undefined') {
      localStorage.setItem('brainstorm_brief', JSON.stringify(brief));
      localStorage.setItem('brainstorm_pending', 'true');
    }
    // Redirect to checkout
    window.location.href = '/checkout';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="text-center mb-60">
        <h1 className="tp-section-title-2 tp-char-animation-2 text-black mb-20">
          AI-Powered Creative Brainstorming
        </h1>
        <p className="text-black text-lg max-w-2xl mx-auto fw-bold">
          Transform your creative brief into 30-40 thought-provoking triggers.
          Break through creative blocks with AI-generated provocative questions that inspire breakthrough thinking.
        </p>
      </header>

      {error && (
        <div className="alert alert-danger mb-30" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
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

        <div className="pt-30 text-center">
          <button type="submit" className="tp-btn-red">
            <span>Start Brainstorming</span>
            <i className="fa-regular fa-arrow-right ml-10"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BriefForm;
