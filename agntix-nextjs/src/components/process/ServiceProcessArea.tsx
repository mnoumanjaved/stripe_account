import serviceThumb from '../../../public/assets/img/service/service-4-thumb-1.png';
import { useVideoModal } from '@/provider/VideoProvider';
import { ServiceShapeIcon } from '@/svg/ServiesIcons';
import { VideoPlayIcon } from '@/svg';
import Image from 'next/image';
import React from 'react';

const ServiceProcessArea = () => {
    const { playVideo } = useVideoModal();

    return (
        <div className="tp-service-4-process-ptb pt-140 pb-140">
            <div className="container container-1230">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="dgm-service-title-box service-4-heading z-index-1 mb-60">
                            <span className="tp-section-subtitle subtitle-grey mb-15 text-black tp_fade_anim" data-delay=".3">Services</span>
                            <h4 className="tp-section-title-grotesk text-black tp_fade_anim" data-delay=".5">
                                We think out of the box <br />
                                and follow the
                                <span className="p-relative">
                                    working
                                    <span className="tp-section-title-shape">
                                        <ServiceShapeIcon />
                                    </span>
                                </span>
                                <br />
                                process
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="tp-service-4-process-wrap">
                            <div className="tp-service-4-process-list">
                                <span>01</span>
                                <p>Thinking <br />
                                    and research</p>
                            </div>
                            <div className="tp-service-4-process-list">
                                <span>02</span>
                                <p>Discovering the <br />
                                    problem</p>
                            </div>
                            <div className="tp-service-4-process-list">
                                <span>03</span>
                                <p>Scratch, design, <br />
                                    and wireframing</p>
                            </div>
                            <div className="tp-service-4-process-list">
                                <span>04</span>
                                <p>Implementation <br />
                                    and solution</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="tp-service-4-process-wrapper pl-70 p-relative">
                            <p className="pl-200 mb-50">Our design system energy comes from a natural source <br />
                                such as wind power, water power, or the heat of the sun. <br />
                                They are more friendly.</p>
                            <div className="tp-service-4-process-thumb fix">
                                <div className="tp_img_reveal">
                                    <Image src={serviceThumb} alt="service thumb" />
                                </div>
                            </div>
                            <div className="tp-service-4-process-video">
                                <button onClick={() => playVideo("VCPGMjCW0is")} className="popup-video dgm-testimonial-playbtn">
                                    <span><VideoPlayIcon /></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceProcessArea;