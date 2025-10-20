import bradcumBg from '../../../public/assets/img/blog/blog-masonry/blog-bradcum-bg.png';
import shape from '../../../public/assets/img/about-us/about-us-4/about-us-4-shape-1.png';
import { ArrowTwentyThree } from '@/svg/ArrowIcons';
import React from 'react';
import Image from 'next/image';

const BreadcurmbTwo = () => {
    return (
        <div className="tp-breadcrumb-area tp-breadcrumb-ptb" style={{ backgroundImage: `url(${bradcumBg.src})` }}>
            <div className="container container-1430">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="tp-portfolio-inner-box pb-100">
                            <div className="tp-portfolio-heading pb-30 d-flex p-relative tp_fade_anim">
                                <span className="tp-section-subtitle pre orange-color tp_fade_anim mr-95">Portfolio {" "} <ArrowTwentyThree /></span>
                                <h3 className="tp-blog-title fs-100 tp_fade_anim">We Make <Image src={shape} alt="shape" /> <br /> Digital Beautiful</h3>
                            </div>
                            <div className="tp-portfolio-inner-tab-wrap">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All Projects</button>
                                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Marketing</button>
                                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Agency</button>
                                        <button className="nav-link" id="nav-four-tab" data-bs-toggle="tab" data-bs-target="#nav-four" type="button" role="tab" aria-controls="nav-four" aria-selected="false">Branding</button>
                                        <button className="nav-link" id="nav-five-tab" data-bs-toggle="tab" data-bs-target="#nav-five" type="button" role="tab" aria-controls="nav-five" aria-selected="false">Design</button>
                                        <button className="nav-link" id="nav-six-tab" data-bs-toggle="tab" data-bs-target="#nav-six" type="button" role="tab" aria-controls="nav-six" aria-selected="false">Development</button>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreadcurmbTwo;