import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowTwentyOne } from '@/svg/ArrowIcons';
import { servicesDT } from '@/types/service-d-t';
import servicesData from '@/data/serviceData';
import Link from 'next/link';
import React from 'react';

const ServiceSolution = () => {

    const ServiceCard = ({ service }: { service: servicesDT }) => (
        <div className="swiper-slide">
            <div className="tp-service-4-solution-item mb-30">
                <div className="tp-service-4-solution-item-icon">
                    <span>{service.svgIcon && <service.svgIcon />}</span>
                </div>
                <div className="tp-service-4-solution-item-content">
                    <h4 className="tp-service-4-solution-item-title">
                        <Link className="tp-line-black" href={service.link}>
                            {service.title}
                        </Link>
                    </h4>
                    <p>{service.description}</p>
                </div>
                <div className="tp-service-4-solution-item-btn">
                    <Link className="tp-line-black" href={service.link}>
                        View Details <span><ArrowTwentyOne /></span>
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <section className="tp-service-4-solution-area pt-135 pb-140">
            <div className="container container-1320">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="tp-service-4-solution-subtitle pb-50 tp_fade_anim">
                            <p>Our Smart Solutions</p>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="tp-service-4-solution-heading pb-100 tp_fade_anim">
                            <h3 className="tp-service-4-solution-title">
                                From branding to funding, we <br /> provide the tools & strategies <br /> startups need to succeed in a <br /> competitive market.
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="tp-service-4-solution-slider">
                        <Swiper
                            className='tp-service-4-solution-active swiper'
                            modules={[Autoplay, Pagination]}
                            loop={true}
                            autoplay={false}
                            spaceBetween={30}
                            pagination={{
                                el: ".tp-service-4-dot",
                                clickable: true,
                            }}
                            breakpoints={{
                                '1600': { slidesPerView: 3 },
                                '1400': { slidesPerView: 3 },
                                '1200': { slidesPerView: 2 },
                                '992': { slidesPerView: 2 },
                                '768': { slidesPerView: 1.5 },
                                '576': { slidesPerView: 1 },
                                '0': { slidesPerView: 1 }
                            }}
                        >
                            {servicesData.slice(46, 51).map((service) => (
                                <SwiperSlide key={service.id}>
                                    <ServiceCard key={service.id} service={service} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="tp-service-4-dot text-center"></div>
                </div>
            </div>
        </section >
    );
};

export default ServiceSolution;