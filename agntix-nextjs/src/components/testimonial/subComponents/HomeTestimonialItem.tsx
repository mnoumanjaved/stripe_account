import { testimonialSliderOptions } from "@/constants/swiper";
import testimonialsData from "@/data/testimonialData";
import React from 'react';

// Import Swiper components and Autoplay module
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const HomeTestimonialItem = () => {
    return (
        <div className="tp-testimonial-slider-wrap z-index-3">
            <Swiper
                className="tp-testimonial-slider-active"
                {...testimonialSliderOptions}
            >
                {testimonialsData.slice(0, 7).map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                        <div className={`tp-testimonial-item ${testimonial.style}`}>
                            <div className="tp-testimonial-text">
                                <p>{testimonial.quote}</p>
                            </div>
                            <div className="tp-testimonial-author d-flex align-items-center">
                                <div className="tp-testimonial-avater">
                                    {testimonial.avatar &&
                                        <Image src={testimonial.avatar} alt={testimonial.name} />}
                                </div>
                                <div className="tp-testimonial-author-info">
                                    <span>{testimonial.name}</span>
                                    <p>{testimonial.position}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeTestimonialItem;