import { useMouseImageReveal } from '@/hooks/useRevealOnHover';
import { homeAwardsData } from '@/data/awardsData';
import React from 'react';

const AwardItem = () => {
  const { handleMouseMove } = useMouseImageReveal();

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="tp-award-subtitle-box mb-30">
          <span className="tp-award-subtitle">( Awards! )</span>
        </div>
      </div>
      <div className="tp-award-item-wrap p-relative">
        {homeAwardsData.map((award) => (
          <div
            key={award.id}
            className="tp-award-item tp-award-1-style hover-reveal-item p-relative mb-5"
            onMouseMove={(e) => handleMouseMove(e, '.hover-reveal-item')}
          >
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="tp-award-box-left z-index-3">
                  <span className="tp-award-year">{award.year}</span>
                  <span className="tp-award-text">{award.title}</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="tp-award-box-right z-index-3 d-flex justify-content-between align-items-center">
                  <span className="tp-award-position">{award.position}</span>
                  <span className="tp-award-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="tp-award-reveal-img"
              style={{ backgroundImage: `url(${award.image && award.image.src})` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardItem;