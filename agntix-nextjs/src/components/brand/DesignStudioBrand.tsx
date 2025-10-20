"use client";
import abouticon1 from "../../../public/assets/img/about-us/about-us/brand/icon-1.png";
import abouticon2 from "../../../public/assets/img/about-us/about-us/brand/icon-2.png";
import abouticon3 from "../../../public/assets/img/about-us/about-us/brand/icon-3.png";
import abouticon4 from "../../../public/assets/img/about-us/about-us/brand/icon-4.png";
import abouticon5 from "../../../public/assets/img/about-us/about-us/brand/icon-5.png";
import Image, { StaticImageData } from 'next/image';
import React from 'react';

const DesignStudioBrand = () => {
    // Brand logo data
    const brandLogos = [abouticon1, abouticon2, abouticon3, abouticon4, abouticon5];

    // Double the logos for seamless animation
    const movingBrandLogos = [...brandLogos, ...brandLogos.slice(0, 2)];

    return (
        <div className="des-brand-area pb-140">
            <div className="container container-1510">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="des-brand-title-box mb-40">
                            <h3 className="tp-section-title-mango mb-0">Collaborators</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="des-brand-moving-wrap">
                {/* Top moving brand row */}
                <MovingBrandRow logos={movingBrandLogos} className="des-brand-moving-top moving-text pb-10" />

                {/* Bottom moving brand row */}
                <MovingBrandRow logos={movingBrandLogos} className="des-brand-moving-bottom moving-text" />
            </div>
        </div>
    );
};

// Extracted brand row component for reusability
const MovingBrandRow = ({ logos, className }: { logos: StaticImageData[], className: string }) => (
    <div className={className}>
        <div className="des-brand-item wrapper-text black-style d-flex align-items-center">
            {logos.map((logo, index) => (
                <div key={`${index}-${logo.src}`} className="des-brand-item-inner">
                    <Image
                        src={logo}
                        alt="brand-logo"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
            ))}
        </div>
    </div>
);

export default DesignStudioBrand;