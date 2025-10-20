
import CreativeAgencyServiceItem from './subComponents/CreativeAgencyServiceItem';
import {ArrowTwo } from '@/svg';
import React from 'react';

const CreativeAgencyService = () => {
    return (
        <div className="studio-service-area pb-200">
            <div className="container container-1830">
                <div className="studio-service-wrap">
                    <div className="row">
                        <div className="col-xl-9">
                            <div className="studio-service-title-box mb-90">
                                <span className="tp-section-subtitle-clash clash-subtitle-pos">
                                    Our <br /> Features
                                    <i><ArrowTwo /></i>
                                </span>
                                <h3 className="tp-section-title-clash tp-text-revel-anim">
                                    <span className="clash-subtitle-space-1">Powerful</span><br />Brainstorming Features
                                </h3>
                            </div>
                        </div>
                        {/* Service section */}
                        <CreativeAgencyServiceItem />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeAgencyService;