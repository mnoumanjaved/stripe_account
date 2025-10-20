import serviceThumb from '../../../public/assets/img/service/service-details/service-details-thumb-1.jpg';
import { CheckIconThree } from '@/svg';
import Image from 'next/image';
import React from 'react';

const ServiceOverview = () => {
    return (
        <div className="pp-service-details-overview-ptb pt-140 pb-110">
            <div className="container container-1230">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="pp-service-details-overview-heading">
                            <h4 className="pp-service-details-overview-title tp_fade_anim" data-delay=".3">Service Overview</h4>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="pp-service-details-overview-wrapper">
                            <p>Branding design is the process of creating a unique identity that visually and strategically represents a business. It includes logo design,
                                color schemes, typography, and brand messaging to ensure consistency across all platforms.</p>
                            <h4>Our Approach to Branding</h4>
                            <div className="pp-service-details-overview-list">
                                <ul>
                                    <li><span><CheckIconThree />
                                    </span>Discovery & Research – Understanding your business, audience, <br />
                                        and competition.</li>
                                    <li><span><CheckIconThree /></span>Concept Development – Creating initial branding concepts and <br />
                                        design ideas.</li>
                                    <li><span><CheckIconThree /></span>Refinement & Testing – Perfecting the visuals and ensuring they <br />
                                        resonate with your audience.</li>
                                    <li><span><CheckIconThree /></span>Final Implementation – Delivering all branding assets with a <br />
                                        detailed style guide.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="pp-service-details-overview-thumb text-lg-end">
                            <div className="tp_img_reveal">
                                <Image src={serviceThumb} alt="service thumb" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceOverview;