import noiseBg from "../../../public/assets/img/home-01/testimonial/noise.png"
import AwardItem from './subComponents/AwardItem';
import React from 'react';

const AboutUsAward = () => {
    return (
        <div className="tp-award-area tp-award-bg black-bg-3" style={{ backgroundImage: `url(${noiseBg.src})` }}>
            <div className="container container-1230">
                {/* Award Item */}
                <AwardItem />
            </div>
        </div>
    );
};

export default AboutUsAward;