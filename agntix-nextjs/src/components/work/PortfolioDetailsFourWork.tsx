import React from 'react';
import PortfolioDetailsFourFunfact from '../funfact/PortfolioDetailsFourFunfact';

const PortfolioDetailsFourWork = () => {
    return (
        <div className="tp-pd-1-work-ptb pb-130">
            <div className="container container-1230">
                <div className="tp-pd-1-work-top pb-70">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tp-pd-1-work-heading title-box pb-60">
                                <h2 className="tp-pd-1-work-title ff-clash"><span className="tp-text-right-scroll">Work </span><br />
                                    <span className="tp-text-left-scroll">overview</span>
                                </h2>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="tp-pd-1-work-heading">
                                <span className="tp-pd-1-about-title">OUR <br />
                                    APPROACH <svg xmlns="http://www.w3.org/2000/svg" width="102" height="9" viewBox="0 0 102 9" fill="none">
                                        <path d="M98 7.91996L101.5 4.43813L98 0.956299M1 3.99989H101V4.99989H1V3.99989Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="tp-pd-1-work-content pl-20">
                                <p>Our journey has been marked by countless successful <br />
                                    projects that not only achieved but surpassed our {`clients'`} <br />
                                    goals, reinforcing their trust in us as a leading <br />
                                    innovator in the digital.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* counter area */}
                <PortfolioDetailsFourFunfact />
            </div>
        </div>
    );
};

export default PortfolioDetailsFourWork;