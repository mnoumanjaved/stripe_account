import CreativeAgencyMain from '@/pages/homes/creative-agency/CreativeAgencyMain';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Brainstorm.ai - AI-Powered Creative Brainstorming",
    description: "Transform your creative brief into 30-40 provocative questions. Break through blocks with Google Gemini AI.",
};

const page = () => {
    return (
        <CreativeAgencyMain />
    );
};

export default page;