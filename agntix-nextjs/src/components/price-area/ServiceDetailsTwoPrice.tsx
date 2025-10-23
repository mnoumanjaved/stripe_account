import ServiceDetailsPriceItem from './subComponents/ServiceDetailsPriceItem';
import { ArrowTwenty } from '@/svg/ArrowIcons';
import pricePlans from '@/data/priceData';
import React from 'react';

const ServiceDetailsTwoPrice = () => {
  //display pricing data
  const displayPricingData = pricePlans.slice(12, 15);

  return (
    <div className="tp-service-5-price-ptb pt-160 pb-140">
      <div className="container container-1230">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-service-5-price-heading service-details d-flex align-items-start pb-70 tp_fade_anim">
              <div className="ar-about-us-4-title-box d-flex align-items-center mb-20">
                <span className="tp-section-subtitle pre">pricing plans</span>
                <div className="ar-about-us-4-icon">
                  <ArrowTwenty/>
                </div>
              </div>
              <h3 className="tp-career-title fs-100">
                Profitable <br />
                pricing plans
              </h3>
            </div>
          </div>
        </div>
        
        {displayPricingData.map((item) => (
          <ServiceDetailsPriceItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailsTwoPrice;