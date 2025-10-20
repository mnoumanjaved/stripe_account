import CreativeAgencyServiceItem from './subComponents/CreativeAgencyServiceItem';
import React from 'react';

const CreativeAboutService = () => {
    return (
        <div className="studio-service-area pt-60 pb-200">
            <div className="container container-1830">
                <div className="studio-service-wrap">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="studio-award-title-box mb-65">
                                <h3 className="tp-section-title-clash tp-text-revel-anim">Awards & recognition</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="studio-award-subtitle-box mb-50">
                                <h3 className="tp-section-subtitle-clash color-red mb-0">
                                    Our <br /> Achievements
                                    <i>
                                        <svg width="102" height="9" viewBox="0 0 102 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M98 8L101.5 4.5L98 1M1 4H101V5H1V4Z" stroke="#FF535B" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </i>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <CreativeAgencyServiceItem />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeAboutService;