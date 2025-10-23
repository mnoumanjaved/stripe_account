import { brandMarqueeSwiperParams } from '@/constants/swiper';
import { portfolioBrandSlideData } from '@/data/brandData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BrandSparkIcon } from '@/svg/BrandIcon';
import React from 'react';

const PersonalPortfolioBrandTwo = () => {
    return (
        <div className="pp-brand-area ar-brand-style" style={{ backgroundColor: "#0E0F11" }}>
            <div className="tp-brand-wrapper pp-text-slider-wrapper z-index-1">
                <Swiper
                    className='tp-brand-active slide-transtion'
                    {...brandMarqueeSwiperParams}
                >
                    {portfolioBrandSlideData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="pp-brand-item">
                                <span className="pp-brand-title">{item.title}</span>
                                <span className="pp-brand-icon">
                                    <BrandSparkIcon fill={item.iconFill} />
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default PersonalPortfolioBrandTwo;