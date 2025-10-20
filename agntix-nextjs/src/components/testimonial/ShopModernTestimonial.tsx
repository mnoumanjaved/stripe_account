import { TestimonialDT } from '@/types/testimonial-d-t';
import testimonialsData from '@/data/testimonialData';
import { StarIconTwo } from '@/svg';
import Image from 'next/image';
import React from 'react';

const ShopModernTestimonial = () => {
    const displayTestimonial: TestimonialDT[] = testimonialsData.slice(50, 62)

    const renderStars = () => {
        return Array(5).fill(0).map((_, i) => (
            <span key={i}><StarIconTwo color='#CE8065' /></span>
        ));
    };

    return (
        <div className="tp-product-testimonial-ptb pb-100">
            <div className="container container-1750">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-product-testimonial-heading mb-20">
                            <h3 className="tp-product-testimonial-title">CUSTOMER REVIEWS</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className='app-testimonial-wrapper'>
                            <div className="app-testimonial-slider d-flex">
                                {displayTestimonial.map((testimonial) => (
                                    <div key={testimonial.id} className="app-testimonial-item tp-product-testimonial-item">
                                        <div className="app-testimonial-item-star">
                                            {renderStars()}
                                        </div>
                                        <div className="app-testimonial-item-content">
                                            <p>{testimonial.quote}</p>
                                        </div>
                                        <div className="tp-product-testimonial-user">
                                            <div className="tp-product-testimonial-user-thumb">
                                                {testimonial.avatar && <Image style={{ width: "100%", height: "auto" }} src={testimonial.avatar} alt={testimonial.name} />}
                                            </div>
                                            <div className="tp-product-testimonial-user-title">
                                                <h4 className="tp-product-testimonial-user-name">{testimonial.name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopModernTestimonial;