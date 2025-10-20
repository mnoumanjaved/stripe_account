import port1 from '../../../public/assets/img/portfolio/portfolio-details-3/port-7.jpg';
import port2 from '../../../public/assets/img/portfolio/portfolio-details-3/port-8.jpg';
import port3 from '../../../public/assets/img/portfolio/portfolio-details-3/port-9.jpg';
import Image from 'next/image';
import React from 'react';

const PortfolioDetailsThreeGalleryTwo = () => {
    return (
        <div className="tp-pd-3-gallery-area">
            <div className="container-fluid">
                <div className="row gx-20">
                    <div className="col-lg-6">
                        <div className="tp-pd-3-gallery-img medium-img mb-20">
                            <Image data-speed=".8" style={{ width: "100%", height: "auto" }} src={port1} alt="port 1" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="tp-pd-3-gallery-img medium-img mb-20">
                            <Image data-speed="1.1" style={{ width: "100%", height: "auto" }} src={port2} alt="port 2" />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="tp-pd-3-gallery-img height mb-20">
                            <Image data-speed=".8" style={{ width: "100%", height: "auto" }} src={port3} alt="port 3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsThreeGalleryTwo;