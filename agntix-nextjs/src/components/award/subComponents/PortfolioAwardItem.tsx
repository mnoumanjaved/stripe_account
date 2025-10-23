


import { useMouseImageReveal } from '@/hooks/useRevealOnHover';
import { awardDT } from '@/types/award-d-t';
import React from 'react';

const PortfolioAwardItem = ({ year, recognition, platform, project, image, delay = '0' }: awardDT) => {
    const { handleMouseMove } = useMouseImageReveal();
    return (
        <div onMouseMove={(e) => handleMouseMove(e, '.hover-reveal-item')} className="tp-award-item hover-reveal-item p-relative tp_fade_anim" data-delay={delay}>
            <div className="row align-items-center">
                <div className="col-lg-8 col-md-6">
                    <div className="tp-award-box-left z-index-3">
                        <span className="tp-award-year">{year}</span>
                        <span className="tp-award-text">{recognition}</span>
                        <span className="tp-award-year">{platform}</span>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="tp-award-box-right z-index-3 d-flex justify-content-between align-items-center">
                        <span className="tp-award-position">{project}</span>
                        <span className="tp-award-link">Link</span>
                    </div>
                </div>
            </div>
            <div className="tp-award-reveal-img" style={{ backgroundImage: `url(${image && image.src})` }}></div>
        </div>
    );
};

export default PortfolioAwardItem;