import thumb1 from '../../../public/assets/img/portfolio/portfolio-details-4/portfolio-details-thumb-3.jpg';
import thumb2 from '../../../public/assets/img/portfolio/portfolio-details-4/portfolio-details-thumb-4.jpg';
import thumb3 from '../../../public/assets/img/portfolio/portfolio-details-4/portfolio-details-thumb-5.jpg';
import Image from 'next/image';
import React from 'react';

const PortfolioDetailsFourThumb = () => {
    return (
        <div className="tp-pd-4-thumb-ptb img-box pb-120">
            <div className="container container-1630">
                <div className="row gx-0">
                    <div className="col-lg-12">
                        <div className="tp-pd-4-thumb-wrap fix mb-20">
                            <div className="tp-pd-4-thumb-item text-center tp-top-bottom-scroll">
                                <Image style={{ width: "100%", height: "auto" }} src={thumb1} alt="thumb" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gx-20">
                    <div className="col-lg-5">
                        <div className="tp-pd-4-thumb-box mb-20">
                            <Image data-speed=".8" style={{ width: "100%", height: "auto" }} src={thumb2} alt="thumb" />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="tp-pd-4-thumb-box mb-20">
                            <Image data-speed=".8" style={{ width: "100%", height: "auto" }} src={thumb3} alt="thumb" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsFourThumb;