import PersonalPortfolioItemCard from './subComponents/PersonalPortfolioItemCard';
import testimonialsData from '@/data/testimonialData';
import { ArrowTwo } from '@/svg';
import React from 'react';

// Import Swiper components and Autoplay module
import { TESTIMONIAL_SWIPER_PARAMS } from '@/constants/swiper';
import { Swiper, SwiperSlide } from "swiper/react";

const PortfolioTestimonial = () => {

    return (
        <div className="pp-testimonial-area pp-testimonial-ptb pb-160">
            <div className="container container-1430">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="pp-testimonial-heading mb-50">
                            <span className="tp-section-subtitle-clash clash-subtitle-pos body-ff">
                                Testimonials
                                <i><ArrowTwo /></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pp-testimonial-slider-wrapper">
                <div className="design-testimonial-slide-wrap">
                    <Swiper
                        className='design-testimonial-active'
                        {...TESTIMONIAL_SWIPER_PARAMS}
                    >
                        {testimonialsData.slice(44, 50).map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <PersonalPortfolioItemCard  {...testimonial} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default PortfolioTestimonial;