"use client"
import { A11y, Autoplay, Navigation, Scrollbar } from "swiper/modules";
import testimonialsData from "@/data/testimonialData";
import { Swiper, SwiperSlide } from "swiper/react";
import { QuoteIconTwo, StarIconTwo } from "@/svg";
import Image from "next/image";
import React from 'react';

const TestimonialItemThree = () => {
    return (
        <div className="creative-testimonial-slider-wrap">
            <Swiper
                className="creative-testimonial-active fix"
                modules={[Navigation, Scrollbar, A11y, Autoplay]}
                slidesPerView={3}
                loop={true}
                autoplay={false}
                spaceBetween={30}
                speed={1000}
                navigation={{
                    prevEl: '.creative-testimonial-prev',
                    nextEl: '.creative-testimonial-next',
                }}
                scrollbar={{
                    el: ".tp-scrollbar",
                }}
                breakpoints={{
                    1600: { slidesPerView: 3 },
                    1400: { slidesPerView: 3 },
                    1200: { slidesPerView: 3 },
                    992: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    576: { slidesPerView: 1 },
                    0: { slidesPerView: 1 },
                }}
            >
                {testimonialsData.slice(7, 11).map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                        <div className="creative-testimonial-item">
                            <div className="creative-testimonial-avater-wrap d-flex align-items-center justify-content-between">
                                <div className="creative-testimonial-avater-box d-inline-flex align-items-center">
                                    <div className="creative-testimonial-avater">
                                        {testimonial.avatar && <Image src={testimonial.avatar} width={80}
                                            height={80} alt={testimonial.name} />}
                                    </div>
                                    <div className="creative-testimonial-avater-info">
                                        <h4>{testimonial.name}</h4>
                                        <span>{testimonial.position}</span>
                                    </div>
                                </div>
                                <div className="creative-testimonial-star">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i}>
                                            <StarIconTwo color="currentColor" />{" "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="creative-testimonial-text">
                                <p>
                                    <span><QuoteIconTwo /></span>
                                    {testimonial.quote}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="tp-scrollbar"></div>
        </div>
    );
};

export default TestimonialItemThree;