import { brandMarqueeSwiperParams } from '@/constants/swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';

const AboutUsBrand: React.FC = () => {
    // Array of slides data 
    const slides = Array(6).fill({
        title: "About Us",
        className: "ar-about-us-4-text-title"
    });

    return (
        <section className="ar-about-us-4-text-area">
            {/* <div className="container"> */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ar-about-us-4-text-warp title-black-color">
                            <div className='swiper-container tp-brand-active'>
                                <div className='swiper-wrapper slide-transtion'>
                                    <Swiper
                                        {...brandMarqueeSwiperParams}
                                    >
                                        {slides.map((slide, index) => (
                                            <SwiperSlide key={`about-us-slide-${index}`}>
                                                <h2 className={slide.className}>
                                                    {slide.title}
                                                </h2>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            {/* </div> */}
        </section>
    );
};

export default AboutUsBrand;