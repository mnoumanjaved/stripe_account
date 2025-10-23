import testiLogo from "../../../public/assets/img/home-01/testimonial/testi-logo.png";
import TestimonialItemFour from "./subComponents/TestimonialItemFour";
import { StarIconThree } from '@/svg';
import Image from "next/image";
import React from 'react';

const DesignAgencyTestimonial = () => {
    return (
        <div className="design-testimonial-area pt-140 pb-200 title-box">
            <div className="container container-1680">
                <div className="design-testimonial-title-wrap mb-70">
                    <div className="row align-items-end">
                        <div className="col-lg-6">
                            <div className="design-testimonial-title-box">
                                <h4 className="tp-section-title-dirtyline">
                                    <span className="tp-text-right-scroll tp_text_invert_2">7o+</span><br />
                                    <span className="tp_text_invert_2">Review</span>
                                </h4>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="design-testimonial-right d-flex justify-content-start justify-content-lg-end">
                                <div className="tp-testimonial-ratting-box d-flex justify-content-center">
                                    <div className="tp-testimonial-ratting d-inline-flex align-items-center">
                                        <Image src={testiLogo} alt="testimonial-logo" />
                                        <div className="tp-testimonial-ratting-info">
                                            <div className="tp-testimonial-ratting-icon">
                                                <span>4.9/5</span>
                                                <i> <StarIconThree /></i>
                                                <i> <StarIconThree /></i>
                                                <i> <StarIconThree /></i>
                                                <i> <StarIconThree /></i>
                                                <i> <StarIconThree /></i>
                                            </div>
                                            <p>Based on 24 reviews on Clutch</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* testimonial item */}
                <TestimonialItemFour />
            </div>
        </div>
    );
};

export default DesignAgencyTestimonial;