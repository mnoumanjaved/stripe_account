import { ArrowTwo } from '@/svg';
import Image from 'next/image';
import React from 'react';

// Import award images
import award1 from '../../../public/assets/img/home-06/award/award-1.png';
import award2 from '../../../public/assets/img/home-06/award/award-2.png';
import award3 from '../../../public/assets/img/home-06/award/award-3.png';

const CreativeAgencyAward = ({ spacingCls = "pb-200" }) => {
    // Awards data
    const awards = [
        {
            id: 1,
            image: award1,
            alt: "Award 1",
            title: "3x Site of the Day",
            delay: ".3"
        },
        {
            id: 2,
            image: award2,
            alt: "Award 2",
            title: "Site of the year",
            delay: ".5"
        },
        {
            id: 3,
            image: award3,
            alt: "Award 3",
            title: "2x Site of the Day",
            delay: ".7"
        }
    ];

    return (
        <div className={`studio-award-area ${spacingCls}`}>
            <div className="container container-1230">
                <div className="row">
                    <div className="col-xl-10">
                        <div className="studio-award-title-box mb-65">
                            <h3 className="tp-section-title-clash tp-text-revel-anim">
                                Awards & recognition
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-4 col-lg-4">
                        <div className="studio-award-subtitle-box">
                            <h3 className="tp-section-subtitle-clash color-red mb-0">
                                Our <br /> Achievements
                                <i><ArrowTwo /></i>
                            </h3>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-8">
                        <div className="studio-award-content-wrap">
                            <div className="studio-award-content tp_text_anim">
                                <p>
                                    From 2004, We have harvest more <br />
                                    of a thirties of price, Who are there
                                    guarantee that {`Welet's`} give THE best
                                    has each project.
                                </p>
                            </div>
                            <div className="row gx-55">
                                {awards.map((award) => (
                                    <div className="col-md-4 mb-30" key={award.id}>
                                        <div
                                            className="studio-award-item tp_fade_anim"
                                            data-delay={award.delay}
                                        >
                                            <div className="studio-award-icon">
                                                <Image src={award.image} alt={award.alt} quality={90} />
                                            </div>
                                            <span>{award.title}</span>
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

export default CreativeAgencyAward;