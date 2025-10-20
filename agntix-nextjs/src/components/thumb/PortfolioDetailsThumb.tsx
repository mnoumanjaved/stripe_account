import Image from 'next/image';
import portfolio1 from '../../../public/assets/img/portfolio/portfolio-details-1/portfolio-details-1.jpg';
import portfolio2 from '../../../public/assets/img/portfolio/portfolio-details-1/portfolio-details-2.jpg';
import portfolio3 from '../../../public/assets/img/portfolio/portfolio-details-1/portfolio-details-3.jpg';
import React from 'react';

const PortfolioDetailsThumb = () => {
    return (
        <div className="tp-portfolio-details-1-thumb-ptb pb-140">
            <div className="container container-1830">
                <div className="row gx-20">
                    <div className="col-lg-12">
                        <div className="tp-portfolio-details-1-thumb-1 mb-20">
                            <Image style={{ width: "100%", height: "auto" }} data-speed=".8" src={portfolio1} alt="portfolio image" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="tp-portfolio-details-1-thumb-2 mb-20">
                            <Image style={{ width: "100%", height: "auto" }} data-speed=".8" src={portfolio2} alt="portfolio image" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="tp-portfolio-details-1-thumb-3 mb-20">
                            <Image style={{ width: "100%", height: "auto" }} data-speed=".8" src={portfolio3} alt="portfolio image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsThumb;