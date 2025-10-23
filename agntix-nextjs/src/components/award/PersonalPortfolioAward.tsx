import shape from '../../../public/assets/img/home-09/price/shape-2.png';
import PortfolioAwardItem from './subComponents/PortfolioAwardItem';
import { portfolioAwardsData } from '@/data/awardsData';
import { ArrowTwo } from '@/svg';
import Image from 'next/image';
import React from 'react';

interface DesignStudioTeamProps {
    wrapClass?: string;
    spacingCls?: string;
    bgClass?: string
}

const PersonalPortfolioAward: React.FC<DesignStudioTeamProps> = ({
    wrapClass = "pp-award-area pp-award-ptb",
    spacingCls = "pt-160 pb-160",
    bgClass = ""
}) => {
    const AwardHeader = () => (
        <div className="tp-award-item pp-award-header p-relative mb-5 tp_fade_anim">
            <div className="row align-items-center">
                <div className="col-lg-8 col-md-6">
                    <div className="tp-award-box-left z-index-3">
                        <span className="tp-award-year tp-award-text-2">year</span>
                        <span className="tp-award-text tp-award-text-2">Recognition</span>
                        <span className="tp-award-text-2">platform</span>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="tp-award-box-right z-index-3 d-flex justify-content-between align-items-center">
                        <span className="tp-award-text-2">Project</span>
                        <span className="tp-award-icon tp-award-text-2">Link</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`${wrapClass} ${spacingCls}`} style={{ backgroundColor: bgClass }} >
            <div className='crp-price-shape-2 d-none d-xl-block'>
                <Image src={shape} alt='image' />
            </div>
            <div className="container container-1430">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="pp-award-left tp_fade_anim" data-delay=".3">
                            <span className="tp-section-subtitle-clash clash-subtitle-pos body-ff">
                                Award <i><ArrowTwo /></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="pp-about-heading pb-55">
                            <h3 className="tp-section-title-teko fs-120 tp_fade_anim" data-delay=".5">
                                Awards & <br /> Recognitions
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="pp-award-wrapper">
                            <div className="tp-award-item-wrap p-relative">
                                <AwardHeader />
                                {portfolioAwardsData.map((award) => (
                                    <PortfolioAwardItem key={award.id} {...award} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalPortfolioAward;