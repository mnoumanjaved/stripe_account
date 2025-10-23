
"use client"
import { brandMarqueeSwiperParams } from '@/constants/swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import React from 'react';

const ServiceFourBrand = () => {
    const brandItems = [
        "Creative agency",
        "Website marketing",
        "Digital marketing",
        "Product marketing",
        "Research marketing",
        "Website marketing",
        "Lifetime Update",
        "Brand identity design",
        "UX/UI design services",
        "Video production",
        "Motion graphics",
        "Copywriting services"
    ];

    return (
        <div className="tp-brand-area pt-160 pb-200">
            {/* First Brand Slider */}
            <div className="tp-brand-wrapper green-regular-bg z-index-1">
                <Swiper
                    {...brandMarqueeSwiperParams}
                    className="tp-brand-active fix"
                >
                    {brandItems.map((item, index) => (
                        <SwiperSlide key={`first-${index}`}>
                            <div className="tp-brand-item">
                                <span className="tp-brand-title">{item}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Second Brand Slider (RTL) */}
            <div className="tp-brand-wrapper tp-brand-style-2" style={{ backgroundColor: "#fff" }}>
                <Swiper
                    {...brandMarqueeSwiperParams}
                    className="tp-brand-active fix"
                    dir="rtl"
                >
                    {brandItems.map((item, index) => (
                        <SwiperSlide key={`second-${index}`}>
                            <div className="tp-brand-item text-color">
                                <span className="tp-brand-title">{item}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ServiceFourBrand;