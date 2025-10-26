// import PortfolioDetailsGallery from '@/pages/portfolios/portfolio-details-gallery/PortfolioDetailsGallery';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Agntix - Portfolio Details Gallery Light",
};

const page = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>404</h1>
                <p style={{ fontSize: '18px', color: '#666' }}>This page has been disabled.</p>
            </div>
        </div>
    );
    // return (
    //     <PortfolioDetailsGallery />
    // );
};

export default page;



