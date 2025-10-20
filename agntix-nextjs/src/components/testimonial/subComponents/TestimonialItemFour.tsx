import testimonialsData from '@/data/testimonialData';
import { StarIconFour } from '@/svg';
import React from 'react';

// Import Swiper components and Autoplay module
import { TESTIMONIAL_SWIPER_PARAMS } from '@/constants/swiper';
import { Swiper, SwiperSlide } from "swiper/react";

const TestimonialItemFour = () => {

    return (
        <div className="design-testimonial-slide-wrap">
            <Swiper
                className='design-testimonial-active'
                {...TESTIMONIAL_SWIPER_PARAMS}
            >
                {testimonialsData.slice(11, 16).map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="design-testimonial-item">
                            <div className="design-testimonial-author">
                                <h4>{testimonial.name}</h4>
                                <span>{testimonial.position}</span>
                            </div>
                            <div className="design-testimonial-review d-flex align-items-end">
                                <h4>{testimonial.rating}</h4>
                                <div className="design-testimonial-review-icon">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}><StarIconFour /></span>
                                    ))}
                                </div>
                            </div>
                            <div className="design-testimonial-text">
                                <p>{testimonial.quote}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    );
};

export default TestimonialItemFour;