import awardOne from '../../../public/assets/img/home-01/award/award-1.png';
import awardTwo from '../../../public/assets/img/home-01/award/award-2.png';
import awardThree from '../../../public/assets/img/home-01/award/award-3.png';
import noiseBg from "../../../public/assets/img/home-01/testimonial/noise.png"
import AwardItem from './subComponents/AwardItem';
import Image from 'next/image';
import React from 'react';

const ModernAgencyAward = () => {
    return (
        <div className="tp-award-area tp-award-bg black-bg-3" style={{ backgroundImage: `url(${noiseBg.src})` }}>
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-xl-7">
                        <div className="tp-award-top-wrap mb-160">
                            <div className="row">
                                <div className="col-md-4 mb-30">
                                    <div className="tp-award-img text-center">
                                        <Image style={{ width: "100%", height: "auto" }} src={awardOne} alt="award-image" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-30">
                                    <div className="tp-award-img text-center">
                                        <Image style={{ width: "100%", height: "auto" }} src={awardTwo} alt="award-image" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-30">
                                    <div className="tp-award-img text-center">
                                        <Image style={{ width: "100%", height: "auto" }} src={awardThree} alt="award-image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Award Item */}
                <AwardItem />
            </div>
        </div>
    );
};

export default ModernAgencyAward;