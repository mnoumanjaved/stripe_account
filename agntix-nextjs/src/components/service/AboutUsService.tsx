
import AboutUsServiceItem from './subComponents/AboutUsServiceItem';
import { ArrowSvg, ButtonBlurFilter } from '@/svg';
import servicesData from '@/data/serviceData';
import Link from 'next/link';
import React from 'react';

const AboutUsService = () => {
    return (
        <div className="creative-service-area pb-70 crative-service-title-style pt-160">
            <div className="container container-1580">
                <div className="creative-service-2-top mb-70">
                    <div className="row align-items-end">
                        <div className="col-xl-3">
                            <div className="creative-blog-subtitle-box">
                                <span className="tp-section-subtitle mb-20 fs-17 pre-circle">Our Services</span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
                            <div className="creative-blog-title-box">
                                <h4 className="tp-section-title fs-44">
                                    How we take your <br /> business to the next level
                                </h4>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-5">
                            <div className="creative-service-top-content">
                                <p>We are a digital marketing agency with expertise, and we’re on a mission to help you take the next step in your business.</p>
                                <Link href="/blog-grid-2-col-light" className="tp-btn-black btn-red-bg pr-15">
                                    <span className="tp-btn-black-filter-blur">
                                        <ButtonBlurFilter filterId="buttonFilter5" />
                                    </span>
                                    <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter5)' }}>
                                        <span className="tp-btn-black-text">See all Articles</span>
                                        <span className="tp-btn-black-circle">
                                            <ArrowSvg />
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="creative-service-wrap">
                    <div className="row">
                        <div className="offset-xl-3 col-xl-9">
                            {servicesData.slice(8, 11).map((service, index) => (
                                <AboutUsServiceItem key={service.id} service={service} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsService;