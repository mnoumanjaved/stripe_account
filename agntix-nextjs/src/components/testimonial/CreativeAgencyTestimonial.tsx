import testimonialsData from '@/data/testimonialData';
import { ArrowTwo, StarIconFour } from '@/svg';
import React from 'react';

// Import Swiper components and Autoplay module
import { TESTIMONIAL_SWIPER_PARAMS } from '@/constants/swiper';
import { Swiper, SwiperSlide } from "swiper/react";

const CreativeAgencyTestimonial = () => {

    // Render star ratings
    const renderStars = (count: number) => {
        return Array(count).fill(0).map((_, i) => (
            <span key={i}>
                <StarIconFour />{" "}
            </span>
        ));
    };

    return (
        <div className="design-testimonial-area pb-200">
            <div className="container container-1830">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="des-testtimonial-title-box mb-40">
                            <h3 className="tp-section-subtitle-clash color-red mb-0">
                                testimonials
                                <i><ArrowTwo /></i>
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="design-testimonial-slide-wrap">
                    <Swiper className='design-testimonial-active'
                        {...TESTIMONIAL_SWIPER_PARAMS}
                    >
                        {testimonialsData.slice(16, 21).map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="design-testimonial-item">
                                    <div className="design-testimonial-author">
                                        <h4>{testimonial.name}</h4>
                                        <span>{testimonial.position}</span>
                                    </div>

                                    <div className="design-testimonial-review d-flex align-items-end">
                                        <h4>{testimonial.rating?.toFixed(1)}</h4>
                                        <div className="design-testimonial-review-icon">
                                            {renderStars(5)}
                                        </div>
                                    </div>

                                    <div className="design-testimonial-text">
                                        <p>{`"${testimonial.quote}"`}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default CreativeAgencyTestimonial;