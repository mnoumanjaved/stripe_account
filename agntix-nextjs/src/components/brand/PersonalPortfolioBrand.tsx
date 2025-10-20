import { brandMarqueeSwiperParams } from '@/constants/swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BrandSparkIcon } from '@/svg/BrandIcon';

interface BrandItem {
    value: string;
    label: string;
}

const PersonalPortfolioBrand = () => {
    const brandItems: BrandItem[] = [
        { value: '86', label: 'Satisfied Clients' },
        { value: '24', label: 'Projects Finished' },
        { value: '95%', label: 'Years of Experience' },
        { value: '86', label: 'Client Retention Rate' },
        { value: '86', label: 'Satisfied Clients' },
        { value: '24', label: 'Projects Finished' },
        { value: '95%', label: 'Years of Experience' },
        { value: '86', label: 'Client Retention Rate' },
        { value: '92%', label: 'Years of Experience' },
        { value: '85', label: 'Client Retention Rate' },
        { value: '76', label: 'Satisfied Clients' },
        { value: '90%', label: 'Projects Finished' },
    ];

    return (
        <div className="pp-brand-area ar-brand-style">
            <div className="tp-brand-wrapper z-index-1">
                <Swiper
                    className="tp-brand-active"
                    {...brandMarqueeSwiperParams}
                >
                    {brandItems.map((item, index) => (
                        <SwiperSlide key={index} className="slide-transtion">
                            <div className="pp-brand-item">
                                <span className="pp-brand-title">
                                    <i>{item.value} /</i>{item.label}
                                </span>
                                <span className="pp-brand-icon">
                                    <BrandSparkIcon />
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default PersonalPortfolioBrand;