"use client"
import Image from 'next/image';
import React from 'react';
import brand1 from "../../../public/assets/img/home-03/brand/brand-1.png";
import brand2 from "../../../public/assets/img/home-03/brand/brand-2.png";
import brand3 from "../../../public/assets/img/home-03/brand/brand-3.png";
import brand4 from "../../../public/assets/img/home-03/brand/brand-4.png";
import brand5 from "../../../public/assets/img/home-03/brand/brand-5.png";
import brand6 from "../../../public/assets/img/home-03/brand/brand-6.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const DigitalMarketingBrandTwo = () => {
    const brands = [
        { id: 1, image: brand1 },
        { id: 2, image: brand2 },
        { id: 3, image: brand3 },
        { id: 4, image: brand4 },
        { id: 5, image: brand5 },
        { id: 6, image: brand6 },
        { id: 7, image: brand2 },
    ];

    return (
        <div className="dgm-brand-area fix">
            <div className="dgm-brand-wrapper">
                <div className="dgm-brand-active">
                    <Swiper
                        slidesPerView={6}
                        loop={true}
                        autoplay={true}
                        spaceBetween={0}
                        speed={1000}
                        breakpoints={{
                            '1600': { slidesPerView: 6 },
                            '1400': { slidesPerView: 5 },
                            '1200': { slidesPerView: 4 },
                            '992': { slidesPerView: 4 },
                            '768': { slidesPerView: 3 },
                            '576': { slidesPerView: 3 },
                            '0': { slidesPerView: 2 },
                        }}
                        modules={[Autoplay]}
                    >
                        {brands.map((brand) => (
                            <SwiperSlide key={brand.id}>
                                <div className="dgm-brand-item">
                                    <Image src={brand.image} alt={`brand-${brand.id}`} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div >
    );
};
export default DigitalMarketingBrandTwo;