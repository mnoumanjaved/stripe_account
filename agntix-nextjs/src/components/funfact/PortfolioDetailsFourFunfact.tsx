import AnimatedCounter from '../counter/AnimatedCounter';
import React from 'react';

const PortfolioDetailsFourFunfact = () => {
    const funFacts = [
        { value: 120, label: "Increase in conversions" },
        { value: 140, label: "Increase in website traffic" },
        { value: 80, label: "Average daily signups" },
        { value: 130, label: "Increase in conversions" },
    ];

    // Split into two columns
    const leftColumn = funFacts.slice(0, 2);
    const rightColumn = funFacts.slice(2, 4);

    const renderFunFact = (fact: { value: number; label: string }, index: number) => (
        <div className="tp-pd-1-work-item mb-30" key={index}>
            <h3 className="tp-pd-1-work-item-title">
                <span><AnimatedCounter min={0} max={fact.value}/>%</span>
            </h3>
            <div className="tp-pd-1-work-item-text">
                <span>{fact.label}</span>
            </div>
        </div>
    );

    return (
        <div className="row">
            <div className="col-lg-6">
                {leftColumn.map(renderFunFact)}
            </div>
            <div className="col-lg-6">
                {rightColumn.map(renderFunFact)}
            </div>
        </div>
    );
};

export default PortfolioDetailsFourFunfact;
