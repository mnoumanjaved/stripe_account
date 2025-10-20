import { brandMarqueeSwiperParams } from '@/constants/swiper';
import { portfolioTextSlideData } from '@/data/brandData';
import { Swiper, SwiperSlide } from "swiper/react";
import Image from 'next/image';
import React from 'react';

const PersonalPortfolioTextSlider = () => {
    return (
        <div className="pp-text-slider-area ar-brand-style" style={{ backgroundColor: "#0E0F11" }}>
            <div className="tp-brand-wrapper z-index-1">=
                <Swiper
                    className='tp-brand-active slide-transtion'
                    {...brandMarqueeSwiperParams}
                >
                    {portfolioTextSlideData.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="pp-text-slider-item">
                                <span className="pp-text-slider-title">{slide.title}</span>
                                <span className="pp-text-slider-svg">
                                    {slide.icon && <Image src={slide.icon} alt="image" />}
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default PersonalPortfolioTextSlider;