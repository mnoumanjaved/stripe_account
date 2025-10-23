import thumb from '../../../public/assets/img/contact/contact-me/contact-me-thumb.jpg';
import aboutShape from '../../../public/assets/img/home-14/about/about-shape.png';
import shape2 from '../../../public/assets/img/home-14/about/about-shape-2.png';
import { CareerShapeTwo } from '@/svg/HeroShape';
import { ArrowTwentySix } from '@/svg/ArrowIcons';
import Image from 'next/image';
import React from 'react';

const ContactArea = () => {
    return (
        <div className="tp-contact-me-ptb contact-career-shape p-relative z-index-3 pb-105">
            <div className="pp-about-shape">
                <Image data-speed=".8" src={aboutShape} alt="about shape" />
            </div>
            <div className="tp-career-shape-1">
                <span><CareerShapeTwo /></span>
            </div>
            <div className="container container-1230">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-contact-me-heading pb-75 tp_fade_anim" data-delay=".3">
                            <span className="tp-section-subtitle-clash clash-subtitle-pos body-ff mb-40">
                                Contact me
                                <i><ArrowTwentySix /></i>
                            </span>
                            <h3 className="pp-service-details-title">
                                {`Let's`} discuss <br />
                                <Image src={thumb} alt="contact thumb" />your project!
                            </h3>
                        </div>
                        <div className="tp-contact-me-wrap">
                            <div className="pp-about-content tp_text_anim">
                                <p>
                                    {`Let's`} start a conversation! fill out our <br /> contact form and we’ll get back to you <br /> as soon as possible
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pp-service-shape">
                <Image data-speed="1.1" src={shape2} alt="about shape" />
            </div>
        </div>
    );
};

export default ContactArea;