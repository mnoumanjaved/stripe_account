import AnimatedCounter from '../counter/AnimatedCounter';
import { ArrowTwo } from '@/svg';
import React from 'react';

const workItems = [
    { end: 120, text: "Increase in conversions" },
    { end: 140, text: "Increase in website traffic" },
    { end: 80, text: "Average daily signups" },
    { end: 130, text: "Increase in conversions" },
];

const PortfolioDetailsWork = () => {
    return (
        <div className="tp-pd-1-work-ptb pb-130">
            <div className="container container-1230">
                <div className="tp-pd-1-work-top pb-70">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tp-pd-1-work-heading pb-60 tp_fade_anim" data-delay=".3">
                                <h2 className="tp-pd-1-work-title">Work <br />
                                    overview</h2>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="tp-pd-1-work-heading tp_fade_anim" data-delay=".5">
                                <span className="tp-pd-1-about-title">OUR <br />
                                    APPROACH <ArrowTwo />
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="tp-pd-1-work-content pl-20 tp_fade_anim" data-delay=".5">
                                <p>Our journey has been marked by countless successful <br />
                                    projects that not only achieved but surpassed our {`clients'`} <br />
                                    goals, reinforcing their trust in us as a leading <br />
                                    innovator in the digital.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {workItems.map((item, index) => (
                        <div key={index} className="col-lg-6">
                            <div className="tp-pd-1-work-item mb-30">
                                <h3 className="tp-pd-1-work-item-title">
                                    <span><AnimatedCounter min={0} max={item.end} />%</span>
                                </h3>
                                <div className="tp-pd-1-work-item-text">
                                    <span>{item.text}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsWork;