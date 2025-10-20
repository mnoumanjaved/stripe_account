import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import React from 'react';

// image import
import thumb2 from '../../../public/assets/img/portfolio/portfolio-details-2/portfolio-details-thumb-2.jpg';
import thumb3 from '../../../public/assets/img/portfolio/portfolio-details-2/portfolio-details-thumb-3.jpg';
import thumb4 from '../../../public/assets/img/portfolio/portfolio-details-2/portfolio-details-thumb-4.jpg';

const PortfolioDetailsThumbSlider = () => {
    // data array
    const sliderData = [thumb2, thumb3, thumb4, thumb2, thumb3];

    return (
        <div className="tp-pd-2-slider-ptb pb-140">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-pd-2-slider-wrapper">
                            <div className="tp-pd-2-active swiper">
                                <Swiper
                                    modules={[Pagination]}
                                    loop={true}
                                    spaceBetween={20}
                                    speed={1000}
                                    pagination={{
                                        el: ".tp-pd-2-dot",
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '1600': { slidesPerView: 3 },
                                        '1400': { slidesPerView: 3 },
                                        '1200': { slidesPerView: 3 },
                                        '992': { slidesPerView: 2 },
                                        '768': { slidesPerView: 2 },
                                        '576': { slidesPerView: 1 },
                                        '0': { slidesPerView: 1 }
                                    }}
                                >
                                    {sliderData.map((img, i) => (
                                        <SwiperSlide key={i}>
                                            <div className="tp-pd-2-slider-thumb">
                                                <Image
                                                    style={{ width: "100%", height: "auto" }}
                                                    src={img}
                                                    alt={`portfolio-thumb-${i + 1}`}
                                                    className="w-100"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="tp-pd-2-dot text-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PortfolioDetailsThumbSlider;
