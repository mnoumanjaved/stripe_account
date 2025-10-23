"use client"
import { benefitsData } from '@/data/benifitData';
import { ArrowTwenty } from '@/svg/ArrowIcons';
import React from 'react';

const CareerBenefits = () => {
 
  return (
    <section className="tp-benefit-ptb pt-140 pb-160">
      <div className="container container-1230">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-benefit-heading mb-85">
              <div className="ar-about-us-4-title-box tp_fade_anim d-flex align-items-center mb-15">
                <span className="tp-section-subtitle pre">Benefits</span>
                <div className="ar-about-us-4-icon">
                  <ArrowTwenty />
                </div>
              </div>
              <h3 className="tp-section-title lts tp_fade_anim">Our Benefits</h3>
            </div>
          </div>
        </div>
        <div className="tp-benefit-box">
          <div className="row gx-0">
            {benefitsData.map((benefit) => (
              <div key={benefit.id} className="col-lg-3 col-md-6">
                <div className={`tp-benefit-item ${
                  benefit.hasBorderBottom ? 'tp-benefit-borber-bottom' : ''
                } ${
                  benefit.hasBorderRight ? 'br' : ''
                }`}>
                  <div className="tp-benefit-item-icon pb-30">
                    <span>{benefit.icon && <benefit.icon/>}</span>
                  </div>
                  <h4 className="tp-benefit-item-title" dangerouslySetInnerHTML={{ __html: benefit.title }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerBenefits;