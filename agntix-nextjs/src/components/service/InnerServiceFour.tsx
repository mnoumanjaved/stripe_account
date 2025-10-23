import InnerServiceFourItem from './subComponents/InnerServiceFourItem';
import { ServiceShapeIcon } from '@/svg/ServiesIcons';
import servicesData from '@/data/serviceData';
import React from 'react';

const InnerServiceFour = () => {
    return (
        <div className="dgm-service-area dgm-service-radius pt-120 z-index-1">
            <div className="container container-1230">
                <div className="row">
                    <div className="col-xl-7">
                        <div className="dgm-service-title-box service-4-heading z-index-1 mb-70">
                            <span className="tp-section-subtitle subtitle-grey mb-15 text-black tp_fade_anim" data-delay=".3">Services</span>
                            <h4 className="tp-section-title-grotesk text-black tp_fade_anim" data-delay=".5">
                                Growing sales through exceptional
                                <span className="p-relative">
                                    services
                                    <span className="tp-section-title-shape">
                                        <ServiceShapeIcon />
                                    </span>
                                </span>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="dgm-service-wrap dgm-service-white">
                    <div className="row">
                        <div className="col-xl-12">
                            {servicesData.slice(4, 8).map((service) => (
                                <InnerServiceFourItem key={service.id} service={service} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnerServiceFour;