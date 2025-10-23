import thumbBg from '../../../../public/assets/img/home-13/cta/cta-thumb-bg.png';
import giftThumb from '../../../../public/assets/img/home-13/cta/cta-thumb.gif';
import { ArrowEleven } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CRCTASection = () => {

    // CTA Shapes Component
    const CTAShapes = () => (
        <div className="cr-cta-shape">
            {[...Array(15)].map((_, i) => (
                <span key={i} className={`shape-${i + 1}`}></span>
            ))}
        </div>
    );
    return (
            <div className="cr-cta-ptb p-relative pt-120 pb-100">
                <div className="cr-cta-bg">
                    <Image style={{width:"100%", height:"auto"}} src={thumbBg} alt="background" quality={100}/>
                </div>
                <CTAShapes />
                <div className="container container-1230">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cr-cta-content text-center">
                                <div className="cr-cta-img p-relative mb-20">
                                    <Image
                                        src={giftThumb}
                                        alt="gift thumbnail"
                                        width={120}
                                        height={120}
                                    />
                                </div>
                                <h4 className="tp-section-title-onest fs-50 tp-text-revel-anim">
                                    Unlock your full trading <br /> potential with industry-leading tools.
                                </h4>
                                <div className="tp_text_anim">
                                    <p className="cr-cta-text">
                                        Trade, invest, and manage your cryptocurrency portfolio with precision and ease
                                    </p>
                                </div>
                                <div className="cr-cta-btn tp_fade_anim" data-delay=".7" data-fade-from="top" data-ease="bounce">
                                    <Link href="/service-3-light" className="tp-btn-white-border">
                                        Find out more <span><ArrowEleven /></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default CRCTASection;