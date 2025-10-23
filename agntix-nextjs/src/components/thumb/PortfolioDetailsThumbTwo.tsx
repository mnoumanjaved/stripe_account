import portfolio1 from '../../../public/assets/img/portfolio/portfolio-details-1/portfolio-details-5.jpg';
import portfolio2 from '../../../public/assets/img/portfolio/portfolio-details-1/portfolio-details-6.jpg';
import Image from 'next/image';
import React from 'react';

const PortfolioDetailsThumbTwo = () => {
    return (
        <div className="tp-portfolio-details-1-thumb-ptb pb-140">
            <div className="container container-1830">
                <div className="row gx-20">
                    <div className="col-lg-6">
                        <div className="tp-portfolio-details-1-thumb-4 mb-20">
                            <Image style={{ width: "100%", height: "auto" }} data-speed=".8" src={portfolio1} alt="portfolio thumb" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="tp-portfolio-details-1-thumb-5 mb-20">
                            <Image style={{ width: "100%", height: "auto" }} data-speed=".8" src={portfolio2} alt="portfolio thumb" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsThumbTwo;