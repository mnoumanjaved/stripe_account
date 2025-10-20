import React from 'react';
// Import Swiper components and Autoplay module
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const CreativeAgencyStep = () => {
    // Slide data array
    const slides = [
        {
            id: 1,
            number: '001',
            title: 'Fill Your<br />Creative Brief',
            description: 'Share your brand name, core challenge, target audience, and brand tone. Our dark mode interface with clean typography guides you through a simple yet strategic questionnaire that captures what makes your project unique.'
        },
        {
            id: 2,
            number: '002',
            title: 'AI Generates<br />30-40 Questions',
            description: 'Google Gemini AI processes your brief in seconds, creating provocative questions organized in thematic clusters. Get thought-starters like "What if your brand became illegal?" or "Partner with your biggest competitor?" - designed to break conventional thinking.'
        },
        {
            id: 3,
            number: '003',
            title: 'Swipe Right<br />to Save',
            description: 'Browse trigger cards in a Tinder-style interface. Swipe right on questions that spark inspiration, left on ones that don\'t resonate. Build your personalized deck of 10-15 creative challenges perfect for your brainstorming workshop.'
        },
        {
            id: 4,
            number: '004',
           title: '5-Minute<br />Deep Dives',
            description: 'Launch workshop timer mode and tackle one trigger at a time. Set 5-minute countdowns for focused ideation. Type freely in our distraction-free interface, navigate between saved questions, and capture every wild idea before it slips away.'
        },
    ];

    return (
        <div className="studio-step-area pt-100 pb-195">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="studio-about-title-box text-center mb-80">
                            <h3 className="tp-section-title-clash tp-text-revel-anim">How Brainstorm.ai Works</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="studio-step-wrap">
                            <Swiper
                                className='studio-step-slider-active'
                                modules={[Autoplay]}
                                speed={1000}
                                loop={true}
                                autoplay={true}
                                spaceBetween={20}
                                breakpoints={{
                                    '1600': { slidesPerView: 3 },
                                    '1400': { slidesPerView: 3 },
                                    '1200': { slidesPerView: 2 },
                                    '992': { slidesPerView: 2 },
                                    '768': { slidesPerView: 1 },
                                    '576': { slidesPerView: 1 },
                                    '0': { slidesPerView: 1 },
                                }}
                            >
                                {slides.map((slide) => (
                                    <SwiperSlide key={slide.id}>
                                        <div className="studio-step-item text-center">
                                            <span style={{ fontSize: '16px' }}>[ {slide.number} ]</span>
                                            <h4
                                                className="studio-step-title"
                                                style={{ fontSize: '28px', marginBottom: '20px' }}
                                                dangerouslySetInnerHTML={{ __html: slide.title }}
                                            />
                                            <p style={{ fontSize: '16px', lineHeight: '1.7' }}>{slide.description}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CreativeAgencyStep;