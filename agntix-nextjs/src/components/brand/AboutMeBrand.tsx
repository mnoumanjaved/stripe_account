import handLeft from '../../../public/assets/img/about-me/about-me-hand-left.png';
import handRight from '../../../public/assets/img/about-me/about-me-hand-right.png';
import { brandMarqueeSwiperParams } from '@/constants/swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BrandStarIcon } from '@/svg/StarIcons';
import Image from 'next/image';
import React from 'react';

interface BrandItem {
    title: string;
    value: string;
}

const AboutMeBrand: React.FC = () => {
    const brandItems: BrandItem[] = [
        { value: '86', title: 'Satisfied Clients' },
        { value: '24', title: 'Projects Finished' },
        { value: '95%', title: 'Years of Experience' },
        { value: '86', title: 'Client Retention Rate' },
        { value: '86', title: 'Satisfied Clients' },
        { value: '24', title: 'Projects Finished' },
        { value: '95%', title: 'Years of Experience' },
        { value: '86', title: 'Client Retention Rate' },
        { value: '86', title: 'Satisfied Clients' },
    ];

    return (
        <div className="pp-brand-area ar-brand-style z-index-4" style={{ backgroundColor: "#FFF669" }}>
            <div className="pp-about-me-shape">
                <div className="shape-left">
                    <Image src={handLeft} alt="Left hand decoration"/>
                </div>
                <div className="shape-right">
                    <Image src={handRight} alt="Right hand decoration"/>
                </div>
            </div>

            <div className="tp-brand-wrapper pp-about-me-brand-wrap z-index-1">
                <Swiper
                    className="tp-brand-active slide-transtion"
                    {...brandMarqueeSwiperParams}
                >
                    {brandItems.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="pp-brand-item pp-about-me-brand">
                                <span className="pp-brand-title">
                                    <i>{item.value} /</i>{item.title}
                                </span>
                                <span className="pp-brand-icon">
                                    <BrandStarIcon />
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default AboutMeBrand;