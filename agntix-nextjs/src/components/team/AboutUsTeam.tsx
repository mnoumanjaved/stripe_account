import noiseBg from '../../../public/assets/img/home-01/testimonial/noise.png';
import AboutUseTeamCard from './subComponents/AboutUseTeamCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import teamMembersData from '@/data/teamData';
import { Autoplay } from 'swiper/modules';
import React from 'react';

const AboutUsTeam = () => {
    const displayTeamData = teamMembersData.slice(15, 22);

    return (
        <div className="tp-testimonial-area tp-team-bg black-bg-3 p-relative fix" style={{ backgroundImage: `url(${noiseBg.src})` }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <div className="tp-testimonial-title-wrap z-index-3">
                            <div className="tp-testimonial-title-box mb-75 text-center">
                                <h4 className="tp-section-title text-white fs-140">
                                    meet <br /> our team
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tp-team-slider-wrap">
                <Swiper
                    className='tp-team-slider-active slide-transtion'
                    modules={[Autoplay]}
                    loop={true}
                    spaceBetween={30}
                    speed={8000}
                    autoplay={{ delay: 1 }}
                    breakpoints={{
                        '1600': { slidesPerView: 5 },
                        '1400': { slidesPerView: 5 },
                        '1200': { slidesPerView: 4 },
                        '992': { slidesPerView: 4 },
                        '768': { slidesPerView: 3 },
                        '576': { slidesPerView: 1 },
                        '0': { slidesPerView: 1 },
                    }}
                >
                    {displayTeamData.map((member) => (
                        <SwiperSlide key={member.id}>
                            <AboutUseTeamCard member={member} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >
    );
};

export default AboutUsTeam;