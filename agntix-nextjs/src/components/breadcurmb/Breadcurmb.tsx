import aboutShape from '../../../public/assets/img/about-us/about-us-4/about-us-4-shape-1.png';
import aboutBg from '../../../public/assets/img/about-us/about-us-4/about-us-4-bg.png';
import { ArrowTwentyThree } from '@/svg/ArrowIcons';
import Image from 'next/image';
import React from 'react';

const Breadcurmb = () => {
    return (
        <div className="tp-breadcrumb-area tp-breadcrumb-ptb" data-background={aboutBg.src}>
            <div className="container container-1430">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="tp-portfolio-inner-box pb-100">
                            <div className="tp-portfolio-heading pb-30 d-flex p-relative tp_fade_anim">
                                <span className="tp-section-subtitle pre orange-color tp_fade_anim mr-95">Portfolio{" "}
                                    <ArrowTwentyThree />
                                </span>

                                <h3 className="tp-blog-title fs-100 tp_fade_anim">We Make <Image src={aboutShape} alt="about shape" /> <br />
                                    Digital Beautiful</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Breadcurmb;